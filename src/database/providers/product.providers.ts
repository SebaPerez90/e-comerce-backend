import { Product } from 'src/database/entities/product.entity';
import { DataSource } from 'typeorm';

export const productProviders = [
  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (datasourceProviders: DataSource) =>
      datasourceProviders.getRepository(Product),
    inject: ['DATA_SOURCE'],
  },
];
