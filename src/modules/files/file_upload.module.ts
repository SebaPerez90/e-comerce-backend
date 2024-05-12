import { Module } from '@nestjs/common';
import { FileUploadController } from './file_upload.controller';
import { FileUploadService } from './file_upload.service';
import { DatabaseModule } from 'src/database/database.module';
import { fileProviders } from 'src/database/providers/file.providers';
import { CloudinaryService } from '../users/cloudinary.service';
import { CloudinaryConfig } from 'src/database/config/cloudinary.config';
import { productProviders } from 'src/database/providers/product.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [FileUploadController],
  providers: [
    ...productProviders,
    ...fileProviders,
    FileUploadService,
    CloudinaryService,
    CloudinaryConfig,
  ],
})
export class FileUploadModule {}
