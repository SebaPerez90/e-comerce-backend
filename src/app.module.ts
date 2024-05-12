import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MorganMiddleware } from './middlewares/morgan.middleware';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';
import { FileUploadModule } from './modules/files/file_upload.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { PopulateUserMiddleware } from './middlewares/populateUser.middleware';
import { userProviders } from './database/providers/user.providers';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    OrdersModule,
    FileUploadModule,
    DatabaseModule,
  ],
  providers: [
    ...userProviders,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganMiddleware, PopulateUserMiddleware).forRoutes('*');
  }
}
