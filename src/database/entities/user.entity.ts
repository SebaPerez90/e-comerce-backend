import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Role } from 'src/enums/roles.enum';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * -Must be unique
   *
   * -Must be 50 character maximum
   *
   * -It cant be empty
   *
   * @example "Sebastian Perez"
   */
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  /**
   * -Must be unique
   *
   * -Must be 50 character maximum
   *
   * -It cant be empty
   *
   * -Must be a valid email address
   *
   * @example "sebastian.perez.jobs@gmail.com"
   */
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;

  /**
   * -Must contains one of these special characters !@#$%^&_*
   *
   * -Must be a string with a maximum of 100 characters
   *
   * -It cant be empty
   *
   *@example "*Pass_sT0n5"
   */
  @Column({ length: 100, nullable: false })
  password: string;

  /**
   * -It cant be empty
   *
   * -Must be a integer
   *
   * @example 1134950604
   */
  @Column({ type: 'int', nullable: false })
  phone: number;

  /**
   *
   * -Must be a string with a minimum of 4 characters and a maximum of 20
   *
   * -It is optional property
   *
   * -Cannot be country abbreviations
   *
   * @example "Argentina"
   */
  @Column({ type: 'varchar', length: 20 })
  country?: string | undefined;

  /**
   *
   * -Must be a string with a minimum of 6 characters and a maximum of 20
   *
   * -It is optional property
   *
   * @example "avenida siempre viva 123"
   */
  @Column({ type: 'varchar', length: 50 })
  address?: string;

  /**
   *
   * -Must be a string with a minimum of 4 characters and a maximum of 20
   *
   * -It is optional property
   *
   * @example "Buenos Aires"
   */
  @Column({ type: 'varchar', length: 50 })
  city?: string | undefined;

  /**
   * -This property must be empty
   *
   * -This value is given by default
   *
   * -Only the owner is capable of changing roles
   *
   * @example "default: "USER""
   */
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role[];

  /**
   * -One to Many relation with Orders Table
   *
   */
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
