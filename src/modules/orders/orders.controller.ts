import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AddOrderDto } from './dto/addOrder.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/enums/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { ErrorsInterceptor } from 'src/interceptors/custom.interceptor';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.USER)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(ErrorsInterceptor)
  async addOrder(@Body() orderData: AddOrderDto) {
    return await this.orderService.addOrder(orderData);
  }

  @Get()
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  async getallOrders() {
    return await this.orderService.getallOrders();
  }
  @Get(':id')
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.USER)
  async getOrder(@Param('id', ParseUUIDPipe) userID: string) {
    const order = await this.orderService.getOrder(userID);
    return order;
  }
}
