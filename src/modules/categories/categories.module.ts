import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { DatabaseModule } from 'src/database/database.module';
import { categoryProviders } from 'src/database/providers/category.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoriesController],
  providers: [...categoryProviders, CategoriesService],
})
export class CategoriesModule {}
