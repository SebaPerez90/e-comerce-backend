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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/roles.enum';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { PostProductDto } from './dto/postProduct.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Public()
  async getAllProducts(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    if (page && limit)
      return await this.productService.getAllProducts(page, limit);

    return await this.productService.getAllProducts(1, 100);
  }

  @Get('seeder')
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({
    summary:
      'There is no need to run this route because some products are automatically preloaded when the server up',
  })
  async seedProducts() {
    return await this.productService.seedProducts();
  }

  @Get('/:id')
  @Public()
  async getProduct(@Param('id', ParseUUIDPipe) productID: string) {
    return this.productService.getProduct(productID);
  }

  @Post()
  @ApiBearerAuth()
  @Roles(Role.USER)
  @UsePipes(new ValidationPipe())
  async postProduct(@Body() productData: PostProductDto) {
    const product = await this.productService.postProduct(productData);
    return { message: 'product created successfully', product };
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
