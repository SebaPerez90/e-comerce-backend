import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class AddOrderDto {
  /**
   * -"userID" must be a valid UUID format
   *
   * -Remember, this is just an example. First, you need to login with your credentials and input your personal ID account.
   *
   * Check that the ID corresponds to your account, otherwise you will not be able to complete your order
   *
   * @example "c34923b3-5af9-477f-b94a-3f6946499db8"
   */
  @IsUUID()
  @IsNotEmpty()
  userID: string;

  /**
   * -"productsID" must be an array.
   *
   * -"productsID" must be a valid UUID format
   *
   * -Should any of these IDs not have a valid UUID format, you won't be able to proceed with your order
   *
   * @example ["6a35af70-4252-46bd-93bd-c0bac5937026", "6876fb8b-d171-43bb-bc7d-ee05e8191f26"]
   */
  @IsArray()
  @IsNotEmpty()
  productsID: string[];
}
