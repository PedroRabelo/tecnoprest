import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateOrderDto } from 'src/client/routes-api/orders/create-order.dto';
import { readFile, utils } from 'xlsx';
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Post('upload-sheet')
  @UseInterceptors(FileInterceptor('file', { dest: '/tmp/' }))
  async uploadDeliveriesSheet(@UploadedFile() file: Express.Multer.File) {
    const readOpts = {
      cellText: false,
      cellDates: true,
    };

    const jsonOpts = {
      defval: '',
      blankrows: true,
      raw: true,
      rawNumber: true,
      dateNF: 'd"/"m"/"yyyy',
    };

    const wb = readFile(file.path, readOpts);

    const json: CreateOrderDto[] = utils.sheet_to_json(
      wb.Sheets[wb.SheetNames[0]],
      jsonOpts,
    );

    return this.deliveriesService.createDeliveriesOrders(json);
  }

  @Post()
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveriesService.create(createDeliveryDto);
  }

  @Get()
  findAll() {
    return this.deliveriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ) {
    return this.deliveriesService.update(+id, updateDeliveryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveriesService.remove(+id);
  }
}
