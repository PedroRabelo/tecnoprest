import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { Pedido } from './entities/pedido.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
  ) {}

  create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const pedido = new Pedido();
    Object.assign(pedido, createPedidoDto);

    return this.pedidoRepository.save(pedido);
  }

  findAll(): Promise<Pedido[]> {
    return this.pedidoRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.pedidoRepository.delete(id);
  }
}
