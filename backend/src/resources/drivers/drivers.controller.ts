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
import { ApiPageResponse } from 'src/page/api-page-response.decorator';
import { ConnectionArgs } from 'src/page/connection-args.dto';
import { Page } from 'src/page/page.dto';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { DriverEntity } from './entities/driver.entity';

@Controller('drivers')
@ApiTags('drivers')
@ApiExtraModels(Page)
@ApiBearerAuth()
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  @ApiCreatedResponse({ type: DriverEntity })
  async create(@Body() createDriverDto: CreateDriverDto) {
    return new DriverEntity(await this.driversService.create(createDriverDto));
  }

  @Get()
  @ApiOkResponse({ type: [DriverEntity] })
  async findAll() {
    const drivers = await this.driversService.findAll();
    return drivers.map((driver) => new DriverEntity(driver));
  }

  @Get('page')
  @ApiPageResponse(DriverEntity)
  async findPage(@Query() connectionArgs: ConnectionArgs) {
    return this.driversService.findPage(connectionArgs);
  }

  @Get(':id')
  @ApiOkResponse({ type: [DriverEntity] })
  async findOne(@Param('id') id: string) {
    return new DriverEntity(await this.driversService.findOne(id));
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: DriverEntity })
  async update(
    @Param('id') id: string,
    @Body() updateDriverDto: UpdateDriverDto,
  ) {
    return await this.driversService.update(id, updateDriverDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: DriverEntity })
  remove(@Param('id') id: string) {
    return this.driversService.remove(id);
  }
}
