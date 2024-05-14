import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { MoreThan, Repository } from 'typeorm';
import { Product } from '../../database/entities/product.entity';
import * as data from '../../utils/mock-data.json';
import { Category } from 'src/database/entities/caterory.entity';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { PostProductDto } from './dto/postProduct.dto';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: Repository<Product>,
    @Inject('CATEGORY_REPOSITORY')
    private readonly categoryRepository: Repository<Category>,
    private readonly categoryService: CategoriesService,
  ) {}

  async onModuleInit() {
    this.categoryService.seedCategories;
    setTimeout(() => {
      this.seedProducts();
    }, 1000);
  }
  async getAllProducts(page: number, limit: number): Promise<Product[]> {
    const [products] = await this.productRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: { stock: MoreThan(0) },
      relations: ['category'],
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

  async postProduct(productData: PostProductDto) {
    const foundProduct = await this.productRepository.findOne({
      where: { name: productData.name },
    });

    if (foundProduct) throw new BadRequestException('product already exist');

    return await this.productRepository.save(productData);
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

    return {
      message:
        'The values of products names are unique and already exist in the products table',
    };
  }
}
