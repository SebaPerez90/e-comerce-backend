import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AddCategoryDto {
  /**
   * -Must be a string with a minimum of 4 characters and a maximum of 10
   * -Cateries name must be unique
   *
   *@example earphones
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(10)
  name: string;
}
