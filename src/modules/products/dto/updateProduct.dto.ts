import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateProductDto {
  /**
   *
   * -Must be a string with a minimum of 3 characters and a maximum of 50
   *
   * -Name must be unique.
   *
   *@example "Nokia 110"
   */
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(50)
  @IsString()
  name: string;

  /**
   * -Must be a string with a minimum of 10 characters and a maximum of 80
   *
   *@example "the best phone ever exist"
   */
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(80)
  description: string;

  /**
   * -Must be a number
   *
   *  -Can be a float number
   *
   *@example "299.99"
   */
  @IsNotEmpty()
  @IsNumber()
  price: number;

  /**
   * -must be an integer
   *
   * -It cannot be a float number
   *
   *@example "20"
   */
  @IsNotEmpty()
  @IsNumber()
  stock: number;
  /**
   * -can be optional parameter
   *
   * -If it is empty, by default an image will be assigned.
   *
   *@example "https://www.netambulo.com/storage/2011/12/404-not-found-gatito.jpg"
   */
  @IsOptional()
  @IsString()
  imgUrl: string;
}
