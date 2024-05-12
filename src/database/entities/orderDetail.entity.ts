import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity({ name: 'order_details' })
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * -It cant be empty
   *
   * -Must be a number
   *
   * -Can be a float number
   *
   * @example 399.99
   */
  @Column({ type: 'float', nullable: false })
  price: number;

  /**
   * -One to One relation with Orders Table
   *
   */
  @OneToOne(() => Order)
  @JoinColumn({ name: 'order_ID' })
  order: Order;

  /**
   * -Many to Many relation with Products Table
   *
   */
  @ManyToMany(() => Product)
  @JoinTable({ name: 'order_details_products' })
  product: Product[];
}
