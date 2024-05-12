import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { DatabaseModule } from 'src/database/database.module';
import { productProviders } from 'src/database/providers/product.providers';
import { categoryProviders } from 'src/database/providers/category.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [...productProviders, ...categoryProviders, ProductsService],
})
export class ProductsModule {}
