import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders/orders.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  exports: [HttpModule],
  providers: [OrdersService],
})
export class RoutesApiModule {}
