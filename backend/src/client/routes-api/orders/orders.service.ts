import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(private readonly httpService: HttpService) {}

  listAll(): Observable<AxiosResponse<[]>> {
    return this.httpService
      .get('http://localhost:9090/pedidos')
      .pipe(map((response) => response.data));
  }
}
