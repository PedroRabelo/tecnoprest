import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Page } from 'src/page/page.dto';
import { VehicleModelEntity } from './entities/model.entity';
import { ModelService } from './model.service';

@Controller('vehicle-models')
@ApiTags('vehicle-models')
@ApiExtraModels(Page)
@ApiBearerAuth()
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Get('/maker/:makerId')
  @ApiOkResponse({ type: [VehicleModelEntity] })
  findAllByMaker(@Param('makerId') makerId: string) {
    return this.modelService.findAllByMaker(makerId);
  }

  @Get(':id')
  @ApiOkResponse({ type: VehicleModelEntity })
  findOne(@Param('id') id: string) {
    return this.modelService.findOne(id);
  }
}
