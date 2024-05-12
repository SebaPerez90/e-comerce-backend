import {
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserWithoutPassword } from './types/userWithoutPassword.type';
import * as data from '../../utils/mock-users.json';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    await this.seedUser();
  }

  async getAllUsers(
    page: number,
    limit: number,
  ): Promise<UserWithoutPassword[]> {
    const [users] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    if (users.length === 0)
      throw new NotFoundException('users list is still empty');

    const filteredUsers = users.map(({ password, ...userData }) => userData);
    return filteredUsers;
  }

  async getUser(userID: string): Promise<UserWithoutPassword> {
    const foundUser: User | undefined = await this.userRepository.findOne({
      where: { id: userID },
      relations: { orders: true },
    });
    if (!foundUser) throw new NotFoundException('user not found or not exist');

    const { password, ...filteredUser } = foundUser;
    return filteredUser;
  }

  async updateUser(userData: UpdateUserDto, userID: string) {
    const foundUser = await this.userRepository.findOne({
      where: { id: userID },
    });
    if (!foundUser) throw new NotFoundException('user not found or not exist');

    const updatedUser = this.userRepository.merge(foundUser, userData);
    await this.userRepository.save(updatedUser);
    return { message: 'User Update Successfully', updatedUser };
  }

  async deleteUser(userID: string) {
    const foundUser = await this.userRepository.findOne({
      where: { id: userID },
    });
    if (!foundUser) throw new NotFoundException('user not found or not exist');

    await this.userRepository.remove(foundUser);
    return { userID: userID, message: 'User Delete Successfully!' };
  }

  private async seedUser() {
    data?.map(async (element) => {
      const user = new User();
      const hashedPassword = await bcrypt.hash(element.password, 10);
      user.name = element.name;
      user.email = element.email;
      user.password = hashedPassword;
      user.address = element.address;
      user.phone = element.phone;
      user.country = element.country;
      user.city = element.city;

      await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(user)
        .orUpdate(
          ['name', 'email', 'password', 'address', 'phone', 'country', 'city'],
          ['email'],
        )
        .execute();
    });
  }
}
