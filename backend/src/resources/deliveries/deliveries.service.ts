import { Injectable } from '@nestjs/common';
import { OrdersService } from 'src/client/routes-api/orders/orders.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class DeliveriesService {
  constructor(private readonly ordersService: OrdersService) {}

  createDeliveriesOrders(csvFile: string) {
    const orders = csvFile.split('\n');

    const csvToJsonResult = [];

    const headers = orders[0].split(',');

    for (let i = 1; i < orders.length - 1; i++) {
      /* Empty object to store result in key value pair */
      const jsonObject = {};
      /* Store the current array element */
      const currentArrayString = orders[i];
      let string = '';

      let quoteFlag = 0;
      for (let character of currentArrayString) {
        if (character === '"' && quoteFlag === 0) {
          quoteFlag = 1;
        } else if (character === '"' && quoteFlag == 1) quoteFlag = 0;
        if (character === ',' && quoteFlag === 0) character = '|';
        if (character !== '"') string += character;
      }

      let jsonProperties = string.split('|');

      for (let j in headers) {
        if (jsonProperties[j].includes(',')) {
          jsonObject[headers[j]] = jsonProperties[j]
            .split(',')
            .map((item) => item.trim());
        } else jsonObject[headers[j]] = jsonProperties[j];
      }

      /* Push the genearted JSON object to resultant array */
      csvToJsonResult.push(jsonObject);
    }
    /* Convert the final array to JSON */
    return JSON.stringify(csvToJsonResult);
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
