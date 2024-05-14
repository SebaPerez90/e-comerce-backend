import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class PostProductDto {
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
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(50)
  @IsString()
  name: string;

  /**
   * -Must be a string with a minimum of 10 characters and a maximum of 80
   *
   * -It cant be empty
   *
   *@example "The best phone ever exist in the world!"
   *
   */
  @IsString()
  @MinLength(10)
  @MaxLength(80)
  @IsString()
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
  @IsNotEmpty()
  @IsNumber()
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
  @IsNotEmpty()
  @IsNumber()
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
  @IsOptional()
  @IsString()
  imgUrl: string;
}
