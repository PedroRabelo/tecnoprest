import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from 'src/client/routes-api/orders/create-order.dto';
import { OrdersService } from 'src/client/routes-api/orders/orders.service';
import { DatabaseError } from 'src/common/errors/types/DatabaseError';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class DeliveriesService {
  constructor(
    private prisma: PrismaService,
    private readonly ordersService: OrdersService,
  ) {}

  async createDeliveryOrders(orders: CreateOrderDto[]) {
    const response = await this.ordersService.createOrders(orders);

    if (response === 201) {
      // TODO Salvar os dados na tabela de delivery
    } else {
      new DatabaseError('Ocorreu um erro na comunicação com a api de rotas');
    }

    return response;
  }

  create(createDeliveryDto: CreateDeliveryDto, tenantId: string) {
    return this.prisma.delivery.create({
      data: {
        tenantId,
        ...createDeliveryDto,
      },
    });
  }

  findAll(tenantId: string) {
    return this.prisma.delivery.findMany({
      where: { tenantId },
    });
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
