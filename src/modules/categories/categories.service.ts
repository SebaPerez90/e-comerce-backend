import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/database/entities/caterory.entity';
import { Repository } from 'typeorm';
import * as data from '../../utils/mock-data.json';
import { AddCategoryDto } from './dto/addCategory.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // async onModuleInit() {
  //   await this.seedCategories();
  // }

  async seedCategories() {
    data.map(async (element) => {
      await this.categoryRepository
        .createQueryBuilder()
        .insert()
        .into(Category)
        .values({ name: element.category })
        .orIgnore()
        .execute();
    });
    return {
      message:
        'The values of category names are unique and already exist in the categories table',
    };
  }

  async addCategories(data: AddCategoryDto) {
    const category: Category = await this.categoryRepository.save(data);
    return category;
  }

  async getCategories(): Promise<Category[]> {
    const categories: Category[] = await this.categoryRepository.find();

    if (categories.length === 0)
      throw new NotFoundException('categories list is still empty');

    return categories;
  }
}
