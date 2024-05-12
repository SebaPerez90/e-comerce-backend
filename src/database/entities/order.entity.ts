import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetail } from './orderDetail.entity';
import { User } from './user.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * -It cant be empty
   *
   * -This value is given by default automatically
   *
   * @example "date: "09/2024 21:00hs""
   */
  @Column({ type: 'varchar', nullable: false })
  date: string;

  /**
   * -One To One relation with OrderDetails Table
   *
   */
  @OneToOne(() => OrderDetail)
  @JoinColumn({ name: 'orderDetail_ID' })
  orderDetail: OrderDetail;

  /**
   * -Many To One relation with Users Table
   *
   */
  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
