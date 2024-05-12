import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/roles.enum';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Roles(Role.ADMIN, Role.USER)
  async getAllUsers(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    if (page && limit) return await this.userService.getAllUsers(page, limit);
    return await this.userService.getAllUsers(1, 100);
  }

  @Get(':id')
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.USER)
  async getUser(@Param('id', ParseUUIDPipe) userID: string) {
    const foundUser = await this.userService.getUser(userID);
    return foundUser;
  }

  @Post('profile/images')
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  async uploadProfilePic(@UploadedFile() file: Express.Multer.File) {
    return await this.cloudinaryService.uploadImage(file);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Body() userData: UpdateUserDto,
    @Param('id', ParseUUIDPipe) userID: string,
  ) {
    return await this.userService.updateUser(userData, userID);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  async deleteUser(@Param('id', ParseUUIDPipe) userID: string) {
    return await this.userService.deleteUser(userID);
  }
}
