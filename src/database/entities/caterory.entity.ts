import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * -Must be unique
   *
   * -Must be 50 character maximum
   *
   * -It cant be empty
   *
   * @example "audio"
   */
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  /**
   * -One to many relation with Products Table
   *
   */
  @OneToMany(() => Product, (product) => product.category)
  product: Product[];
}
