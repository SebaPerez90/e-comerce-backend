import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateProductDto } from './dto/updateProduct.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  @Public()
  async getProduct(@Query('page') page: number, @Query('limit') limit: number) {
    if (page && limit)
      return await this.productService.getAllProducts(page, limit);

    return await this.productService.getAllProducts(1, 100);
  }

  //? There is no need to run this route because the products
  //? are automatically preloaded when the server up
  @Get('seeder')
  @Roles(Role.ADMIN, Role.USER)
  async seedProducts() {
    return await this.productService.seedProducts();
  }

  @Get('/:id')
  @Public()
  async getAllProducts(@Param('id', ParseUUIDPipe) productID: string) {
    return this.productService.getProduct(productID);
  }
  @Put(':id')
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  async updateProduct(
    @Body() productData: UpdateProductDto,
    @Param('id', ParseUUIDPipe) productID: string,
  ) {
    return await this.productService.updateProduct(productData, productID);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  async deleteProduct(@Param('id', ParseUUIDPipe) productID: string) {
    return await this.productService.deleteProduct(productID);
  }
}
