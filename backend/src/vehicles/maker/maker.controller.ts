import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Page } from 'src/page/page.dto';
import { VehicleMakeEntity } from './entities/maker.entity';
import { MakerService } from './maker.service';

@Controller('makers')
@ApiTags('vehicles-make')
@ApiExtraModels(Page)
@ApiBearerAuth()
export class MakerController {
  constructor(private readonly makerService: MakerService) {}

  @Get()
  @ApiOkResponse({ type: [VehicleMakeEntity] })
  async findAll() {
    const makers = await this.makerService.findAll();
    return makers.map((make) => new VehicleMakeEntity(make));
  }

  @Get(':id')
  @ApiOkResponse({ type: VehicleMakeEntity })
  findOne(@Param('id') id: string) {
    return this.makerService.findOne(id);
  }
}
