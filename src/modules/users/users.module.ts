import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/database/providers/user.providers';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryConfig } from 'src/database/config/cloudinary.config';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    ...userProviders,
    UsersService,
    CloudinaryService,
    CloudinaryConfig,
  ],
})
export class UsersModule {}
