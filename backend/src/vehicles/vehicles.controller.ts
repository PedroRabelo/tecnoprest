import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentTenant } from 'src/auth/decorators/current-tenant.decorator';
import { ApiPageResponse } from 'src/page/api-page-response.decorator';
import { ConnectionArgs } from 'src/page/connection-args.dto';
import { Page } from 'src/page/page.dto';
import { TrackersService } from 'src/trackers/trackers.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleEntity } from './entities/vehicle.entity';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
@ApiTags('vehicles')
@ApiExtraModels(Page)
@ApiBearerAuth()
export class VehiclesController {
  constructor(
    private readonly vehiclesService: VehiclesService,
    private readonly trackerService: TrackersService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: VehicleEntity })
  async create(
    @CurrentTenant() tenant: string,
    @Body() createVehicleDto: CreateVehicleDto,
  ) {
    return new VehicleEntity(
      await this.vehiclesService.create(createVehicleDto, tenant),
    );
  }

  @Get()
  @ApiPageResponse(VehicleEntity)
  async findAllByTenant(
    @Query() connectionArgs: ConnectionArgs,
    @CurrentTenant() tenant: string,
  ) {
    return await this.vehiclesService.findAllByTenant(tenant, connectionArgs);
  }

  @Get(':licensePlate')
  @ApiOkResponse({ type: [VehicleEntity] })
  async findOneByLicensePlate(@Param('licensePlate') licensePlate: string) {
    return new VehicleEntity(
      await this.vehiclesService.findOneByLicensePlate(licensePlate),
    );
  }

  @Get('get/:id')
  @ApiOkResponse({ type: [VehicleEntity] })
  async findOneById(@Param('id') id: string) {
    return new VehicleEntity(await this.vehiclesService.findOneById(id));
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: VehicleEntity })
  async update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return await this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: VehicleEntity })
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(id);
  }

  @Get(':id/trackers')
  @ApiOkResponse({ type: [VehicleEntity] })
  async findVehicleTrackers(@Param('id') id: string) {
    return await this.trackerService.findVehicleTrackers(id);
  }
}
