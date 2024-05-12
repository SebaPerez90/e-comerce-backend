import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/loginUser.dto';
import { CreateUserDto } from '../users/dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserWithoutPassword } from '../users/types/userWithoutPassword.type';
import { AdminAccessDto } from '../users/dto/admin.dto';
import { Role } from 'src/enums/roles.enum';

export interface ICredentials {
  password: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async signUp(userData: CreateUserDto): Promise<Partial<User>> {
    const checkUser: User[] = await this.userRepository.find({
      where: { email: userData.email },
    });
    if (checkUser.length) throw new NotFoundException('user already exist');

    const newUser: User = this.userRepository.create(userData);
    const { password, email } = newUser;

    if (!password || !email)
      throw new BadRequestException('valid email and password are required');

    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.password = hashedPassword;

    await this.userRepository.save(newUser);
    const user: UserWithoutPassword = await this.userService.getUser(
      newUser.id,
    );

    const { orders, ...userFiltered } = user;
    return userFiltered;
  }

  async signIn(userData: LoginUserDto) {
    const user: User[] = await this.userRepository.find({
      where: { email: userData.email },
    });
    if (user.length === 0) throw new NotFoundException('user not exist');

    const foundUser: User | undefined = await this.userRepository.findOne({
      where: { email: userData.email },
    });

    const confirmPassword = await bcrypt.compare(
      userData.password,
      foundUser.password,
    );

    if (confirmPassword === false)
      throw new BadRequestException('Incorrect Credentials');

    const payload = { password: foundUser.password, email: foundUser.email };
    const token = await this.jwtService.signAsync(payload);
    return {
      message: 'User Loged!',
      token: token,
      expires_in: process.env.JWT_EXPIRES_IN === '1d' ? '24hs' : null,
    };
  }

  async adminSesion(adminData: AdminAccessDto) {
    if (
      adminData.email === 'sebastianalbertoperez90@example.com' &&
      adminData.password === '5*y_3l_4dm1n'
    ) {
      const logStatus = await this.signIn(adminData);
      await this.userRepository.update(
        { email: adminData.email },
        { role: [Role.ADMIN] },
      );

      logStatus.message = 'Admin session logged';
      return logStatus;
    } else {
      throw new UnauthorizedException('only an admin user cant acccess');
    }
  }
}
