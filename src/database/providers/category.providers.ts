import { DataSource } from 'typeorm';
import { Category } from '../entities/caterory.entity';

export const categoryProviders = [
  {
    provide: 'CATEGORY_REPOSITORY',
    useFactory: (datasourceProviders: DataSource) =>
      datasourceProviders.getRepository(Category),
    inject: ['DATA_SOURCE'],
  },
];
