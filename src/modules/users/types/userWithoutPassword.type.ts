import { User } from 'src/database/entities/user.entity';

export type UserWithoutPassword = Omit<User, 'password'>;
