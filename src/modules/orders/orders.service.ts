import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Order } from 'src/database/entities/order.entity';
import { OrderDetail } from 'src/database/entities/orderDetail.entity';
import { Product } from 'src/database/entities/product.entity';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { AddOrderDto } from './dto/addOrder.dto';

@Injectable()
export class OrdersService {
  private prices: number[] = [];
  private totalPrice: number;

  // prettier-ignore
  constructor(
    @Inject('ORDER_REPOSITORY') private ordersRepository: Repository<Order>,
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    @Inject('PRODUCT_REPOSITORY') private productRepository: Repository<Product>,
    @Inject('ORDERDETAILS_REPOSITORY') private detailsRepository: Repository<OrderDetail>,
  ) {}

  async addOrder(orderData: AddOrderDto) {
    const user: User = await this.userRepository.findOne({
      where: { id: orderData.userID },
      relations: { orders: true },
    });
    if (!user) throw new NotFoundException('user not found or not exist');

    const promises: Promise<void>[] = orderData.productsID.map(
      async (element) => {
        const products: Product[] = await this.productRepository.find({
          where: { id: element },
        });
        this.stockController(products[0]);
        this.sumAllPrices(products[0]);
      },
    );

    try {
      const order = new Order();
      order.date = this.purchaseDateTime();
      order.user = user;
      const newOrder = await this.ordersRepository.save(order);

      const orderDetails = new OrderDetail();
      orderDetails.order = newOrder;
      orderDetails.price = this.totalPrice;
      const newDetail = await this.detailsRepository.save(orderDetails);

      order.orderDetail = newDetail;
      await this.ordersRepository.save(order);

      await Promise.all(promises);
      const result = await this.ordersRepository.findOne({
        where: { id: order.id },
        relations: ['orderDetail'],
      });

      user.orders.push(order);
      await this.userRepository.save(user);

      return { order: result };
    } catch (error) {
      if (error)
        throw new BadRequestException('Please check the ID´s to the products');
    }
  }

  async getOrder(orderID: string) {
    const order = await this.ordersRepository.findOne({
      where: { id: orderID },
      relations: { orderDetail: { product: true } },
    });

    if (!order) throw new NotFoundException('order not found or not exist');
    return order;
  }

  async getallOrders() {
    const orders: Order[] | undefined = await this.ordersRepository.find();
    if (orders.length === 0)
      throw new NotFoundException('order list is still empty');

    return orders;
  }

  private purchaseDateTime(): string {
    const date = new Date();
    const currentDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    const hours = `${date.getHours()}:${date.getMinutes()}`;

    return `${currentDate} ${hours}hs`;
  }
  private sumAllPrices(product: Product): void {
    if (!product) return;
    const price = product.price;
    const priceRounded = Math.round(price);
    this.prices.push(priceRounded);

    const addition = this.prices.reduce(
      (total, currentPrice) => total + currentPrice,
    );
    const priceToCustomer = (addition - 0.01).toFixed(2);
    this.totalPrice = Number(priceToCustomer);
  }

  private async stockController(product: Product) {
    if (!product) return;
    const stock = product.stock;
    if (stock === 0) {
      return;
    } else {
      product.stock = stock - 1;
      await this.productRepository.save(product);
    }
  }
}
