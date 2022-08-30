import { Module } from '@nestjs/common';
import { OrdersService } from 'src/client/routes-api/orders/orders.service';
import { RoutesApiModule } from 'src/client/routes-api/routes-api.module';
import { DeliveriesController } from './deliveries.controller';
import { DeliveriesService } from './deliveries.service';

@Module({
  imports: [RoutesApiModule],
  controllers: [DeliveriesController],
  providers: [DeliveriesService, OrdersService],
})
export class DeliveriesModule {}
