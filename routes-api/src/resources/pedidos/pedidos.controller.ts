import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { PedidosService } from './pedidos.service';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.create(createPedidoDto);
  }

  @Get()
  findAll() {
    return this.pedidosService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidosService.remove(+id);
  }
}
