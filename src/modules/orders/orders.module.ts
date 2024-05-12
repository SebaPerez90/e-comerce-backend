import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersProviders } from 'src/database/providers/order.providers';
import { userProviders } from 'src/database/providers/user.providers';
import { productProviders } from 'src/database/providers/product.providers';
import { orderDetailsProviders } from 'src/database/providers/orderDetail.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [OrdersController],
  providers: [
    ...orderDetailsProviders,
    ...productProviders,
    ...userProviders,
    ...OrdersProviders,
    OrdersService,
  ],
})
export class OrdersModule {}
