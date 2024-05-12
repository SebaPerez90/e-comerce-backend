import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'files',
})
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fieldName: string;
  /**
   * -Name of the form field where the file was uploaded
   *
   * @example "profilePicture"
   */

  @Column()
  mimeType: string;
  /**
   * -MIME type of the file
   *
   * @example "image/jpeg"
   */

  @Column({ type: 'bytea' })
  data: Buffer;
  /**
   * -Binary data of the file. This should be a Base64 encoded string.
   *
   * @example "'SGVsbG8sIFdvcmxkIQ=='""
   */
}
