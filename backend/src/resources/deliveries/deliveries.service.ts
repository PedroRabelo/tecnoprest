import { Injectable } from '@nestjs/common';
import { OrdersService } from 'src/client/routes-api/orders/orders.service';
import { convertCsvToJson } from 'src/common/utils/convertCsvToJson';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class DeliveriesService {
  constructor(private readonly ordersService: OrdersService) {}

  createDeliveriesOrders(csvFile: string) {
    const orders = convertCsvToJson(csvFile);

    const response = this.ordersService.createOrders(JSON.parse(orders));

    return orders;
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
