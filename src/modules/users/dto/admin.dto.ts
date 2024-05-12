import { IsString } from 'class-validator';

export class AdminAccessDto {
  /**
   * -This endpoint only allows the admin email
   *
   * -If you want to test all features of the API, make sure to login with these credentials.
   *
   *@example "sebastianalbertoperez90@example.com"
   */
  @IsString()
  email: 'sebastianalbertoperez90@example.com';

  /**
   * -This endpoint only allows the admin password
   *
   * -If you want to test all features of the API, make sure to login with these credentials.
   *
   *@example "5*y_3l_4dm1n"
   */
  @IsString()
  password: '5*y_3l_4dm1n';
}
