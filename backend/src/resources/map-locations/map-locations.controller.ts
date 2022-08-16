import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentTenant } from 'src/auth/decorators/current-tenant.decorator';
import { Page } from 'src/page/page.dto';
import { CreateMapLocationDto } from './dto/create-map-location.dto';
import { UpdateMapLocationDto } from './dto/update-map-location.dto';
import { MapLocationEntity } from './entities/map-location.entity';
import { MapLocationsService } from './map-locations.service';

@Controller('map-locations')
@ApiTags('map-locations')
@ApiExtraModels(Page)
@ApiBearerAuth()
export class MapLocationsController {
  constructor(private readonly mapLocationsService: MapLocationsService) { }

  @Post()
  @ApiCreatedResponse({ type: MapLocationEntity })
  async create(
    @CurrentTenant() tenantId: string,
    @Body() createMapLocationDto: CreateMapLocationDto,
  ) {
    return await this.mapLocationsService.create(
      createMapLocationDto,
      tenantId,
    );
  }

  @Get('routes')
  @ApiOkResponse({ type: [MapLocationEntity] })
  async findAllRoutesActive(@CurrentTenant() tenantId: string) {
    return await this.mapLocationsService.findAllRoutesActive(tenantId);
  }

  @Get()
  @ApiOkResponse({ type: [MapLocationEntity] })
  async findAll(@CurrentTenant() tenantId: string) {
    return await this.mapLocationsService.findAll(tenantId);
  }

  @Get(':id')
  @ApiOkResponse({ type: MapLocationEntity })
  async findOne(@Param('id') id: string) {
    return await this.mapLocationsService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: MapLocationEntity })
  async update(
    @Param('id') id: string,
    @Body() updateMapLocationDto: UpdateMapLocationDto,
  ) {
    return await this.mapLocationsService.update(id, updateMapLocationDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: MapLocationEntity })
  async remove(@Param('id') id: string) {
    return await this.mapLocationsService.remove(id);
  }
}
