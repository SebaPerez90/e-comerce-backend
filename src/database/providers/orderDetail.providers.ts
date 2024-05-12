import { DataSource } from 'typeorm';
import { OrderDetail } from '../entities/orderDetail.entity';

export const orderDetailsProviders = [
  {
    provide: 'ORDERDETAILS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(OrderDetail),
    inject: ['DATA_SOURCE'],
  },
];
