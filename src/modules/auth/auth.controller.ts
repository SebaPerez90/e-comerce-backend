import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  HttpCode,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginUserDto } from './dto/loginUser.dto';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { Public } from 'src/decorators/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminAccessDto } from '../users/dto/admin.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private credentials: LoginUserDto = { email: '', password: '' };
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @Public()
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  async signIn(@Body() userData: LoginUserDto) {
    const foundUser = await this.authService.signIn(userData);
    return foundUser;
  }

  @Post('signup')
  @Public()
  @ApiOperation({
    summary:
      'Additionally to the requirement. Login was added when registering, for a better user experience',
  })
  @UsePipes(new ValidationPipe())
  async signUp(@Body() userData: CreateUserDto) {
    const userWithoutPassword = await this.authService.signUp(userData);
    const { password, email } = userData;
    this.credentials.email = email;
    this.credentials.password = password;

    const logStatus = await this.authService.signIn(this.credentials);
    return { 'User Data': userWithoutPassword, 'Log Status': logStatus };
  }

  @Put('admin-sesion')
  @ApiOperation({
    summary:
      'There is no need to run this route because the products are automatically preloaded when the server is up.',
  })
  @Public()
  @UsePipes(new ValidationPipe())
  async adminSesion(@Body() adminData: AdminAccessDto) {
    return await this.authService.adminSesion(adminData);
  }
}
