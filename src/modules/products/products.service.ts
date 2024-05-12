import {
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from '../../database/entities/product.entity';
import * as data from '../../utils/mock-data.json';
import { Category } from 'src/database/entities/caterory.entity';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: Repository<Product>,
    @Inject('CATEGORY_REPOSITORY')
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async onModuleInit() {
    await this.seedProducts();
  }
  async getAllProducts(page: number, limit: number): Promise<Product[]> {
    const [products] = await this.productRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    if (products.length === 0)
      throw new NotFoundException('products list is still empty');
    return products;
  }

  async getProduct(productID: string): Promise<Product> {
    const product: Product | undefined = await this.productRepository.findOne({
      where: { id: productID },
    });

    if (!product) throw new NotFoundException('product not found or not exist');
    return product;
  }

  async updateProduct(productData: UpdateProductDto, productID: string) {
    const foundProduct = await this.productRepository.findOne({
      where: { id: productID },
    });
    if (!foundProduct)
      throw new NotFoundException('product not found or not exist');

    const updatedProduct = this.productRepository.merge(
      foundProduct,
      productData,
    );
    await this.productRepository.save(updatedProduct);

    return { message: 'Product Update Successfully', updatedProduct };
  }

  async deleteProduct(productID: string) {
    const product = await this.productRepository.findOne({
      where: { id: productID },
    });

    if (!product) throw new NotFoundException('product not found or not exist');
    await this.productRepository.remove(product);
    return { productID: productID, message: 'Product Deleted Succesfully!' };
  }

  async seedProducts() {
    const categories: Category[] = await this.categoryRepository.find();
    data?.map(async (element) => {
      const category = categories.find(
        (category) => category.name === element.category,
      );
      const product = new Product();
      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.stock = element.stock;
      product.imgUrl = element.imgUrl;
      product.category = category;

      await this.productRepository
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values(product)
        .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
        .execute();
    });
  }
}
