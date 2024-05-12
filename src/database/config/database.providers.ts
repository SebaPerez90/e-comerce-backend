import { DataSource } from 'typeorm';
import {
  DATABASE,
  HOST,
  PASSWORD,
  PORT,
  PROVIDE,
  TYPE,
  USERNAME,
} from './database.envs';

export const databaseProviders = [
  {
    provide: PROVIDE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: HOST,
        port: PORT,
        username: USERNAME,
        password: PASSWORD,
        database: DATABASE,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        dropSchema: true,
        logging: ['error'],
      });

      return dataSource.initialize();
    },
  },
];
