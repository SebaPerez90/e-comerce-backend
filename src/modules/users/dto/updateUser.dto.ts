import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  /**
   *
   * -Must be a string with a minimum of 3 characters and a maximum of 80
   *
   * -It can be just a first name or you can also include your last name.
   *
   *@example "Pepe"
   */
  @IsOptional()
  @IsString()
  name: string;

  /**
   * -Must be a valid email address
   *
   * -The email is unique. An address for a registered user
   *
   *@example "pepe@gmail.com"
   */
  @IsOptional()
  @IsString()
  email: string;

  /**
   * -Must contains one of these special characters !@#$%^&_*
   *
   * -Must be a string with a minimum of 8 characters and a maximum of 15
   *
   * -Consider using a strong password
   *
   * -Remember to properly save your password
   *
   *@example "*Pass_sT0n5"
   */
  @IsOptional()
  @IsString()
  password: string;

  /**
   * -Consider using a valid phone number
   *
   *@example "1132880924"
   */
  @IsOptional()
  @IsNumber()
  phone: number;

  /**
   * -Must be a string with a minimum of 4 characters and a maximum of 20
   *
   *@example
   */
  @IsOptional()
  @IsString()
  country: string;

  /**
   * -Must be a string with a minimum of 3 characters and a maximum of 80
   *
   * -Must be a valid address location
   *
   *@example "adrres 01"
   */
  @IsOptional()
  @IsString()
  address: string;

  /**
   * -Must be a string with a minimum of 4 characters and a maximum of 20
   *
   *@example "Buenos Aires"
   */
  @IsOptional()
  @IsString()
  city: string;
}
