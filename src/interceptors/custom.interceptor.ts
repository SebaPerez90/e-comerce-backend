import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isUUID } from 'class-validator';
import { AddOrderDto } from 'src/modules/orders/dto/addOrder.dto';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request.method === 'POST') {
      const orderData: AddOrderDto = request.body;

      if (!Array.isArray(orderData.productsID)) {
        return throwError(
          () => new BadRequestException('productsID must be an array'),
        );
      }

      for (let i = 0; i < orderData.productsID.length; i++) {
        const response = isUUID(orderData.productsID[i]);
        if (!response)
          return throwError(
            () =>
              new BadRequestException('productsID must be an array of UUID´s'),
          );
      }
    }

    return next
      .handle()
      .pipe(
        catchError((err) =>
          throwError(() => new BadGatewayException(err.message)),
        ),
      );
  }
}
