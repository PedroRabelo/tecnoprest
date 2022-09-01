import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { CreateOrderDto } from './create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly httpService: HttpService) {}

  listAll(): Observable<AxiosResponse<[]>> {
    return this.httpService
      .get(`${process.env.ROUTES_API_URL}/pedidos`)
      .pipe(map((response) => response.data));
  }

  createOrders(orders: CreateOrderDto[]): Observable<AxiosResponse<void>> {
    return this.httpService
      .post(`${process.env.ROUTES_API_URL}/pedidos`, orders)
      .pipe(map((response) => response.data));
  }
}
