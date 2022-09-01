import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from 'src/client/routes-api/orders/create-order.dto';
import { OrdersService } from 'src/client/routes-api/orders/orders.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class DeliveriesService {
  constructor(private readonly ordersService: OrdersService) {}

  createDeliveriesOrders(orders: CreateOrderDto[]) {
    const response = this.ordersService.createOrders(orders);

    return response;
  }

  create(createDeliveryDto: CreateDeliveryDto) {
    return 'This action adds a new delivery';
  }

  findAll() {
    return `This action returns all deliveries`;
  }

  findOne(id: number) {
    return `This action returns a #${id} delivery`;
  }

  update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    return `This action updates a #${id} delivery`;
  }

  remove(id: number) {
    return `This action removes a #${id} delivery`;
  }
}
