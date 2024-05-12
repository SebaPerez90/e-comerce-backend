import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './caterory.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * -Must be unique
   *
   * -Must be 50 character maximum
   *
   * -It cant be empty
   *
   * @example "Nokia 1100"
   *
   */
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  /**
   * -Must be a string with a minimum of 10 characters and a maximum of 80
   *
   * -It cant be empty
   *
   *@example "The best phone ever exist in the world!"
   *
   */
  @Column({ type: 'varchar', nullable: false, length: 80 })
  description: string;

  /**
   * -It cant be empty
   *
   * -Must be a number
   *
   * -Can be a float number
   *
   * @example 399.99
   *
   */
  @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
  price: number;

  /**
   * -It cant be empty
   *
   * -Must be a integer
   *
   * -Cannot be a float number
   *
   * @example 10
   */
  @Column({ type: 'int', nullable: false })
  stock: number;

  /**
   *
   * -This property must be empty
   *
   * -This value is given by default
   *
   * -It will then be modified by the cloundinary service
   *
   * @example "default: 'https://www.netambulo.com/storage/2011/12/404-not-found-gatito.jpg'"
   */
  @Column({
    type: 'text',
    default:
      'https://www.netambulo.com/storage/2011/12/404-not-found-gatito.jpg',
  })
  imgUrl: string;

  /**
   * -Many To One relation with Category Table
   *
   */
  @ManyToOne(() => Category, (category) => category.product)
  category: Category;
}
