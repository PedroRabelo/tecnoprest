import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrackersService } from './trackers.service';
import { CreateTrackerDto } from './dto/create-tracker.dto';
import { UpdateTrackerDto } from './dto/update-tracker.dto';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TrackerEntity } from './entities/tracker.entity';

@Controller('trackers')
@ApiTags('trackers')
@ApiBearerAuth()
export class TrackersController {
  constructor(private readonly trackersService: TrackersService) {}

  @Post()
  create(@Body() createTrackerDto: CreateTrackerDto) {
    return this.trackersService.create(createTrackerDto);
  }

  @Get()
  findAll() {
    return this.trackersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrackerDto: UpdateTrackerDto) {
    return this.trackersService.update(+id, updateTrackerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackersService.remove(+id);
  }

  @Post('/vehicle/:vehicleId')
  @ApiOkResponse({ type: [TrackerEntity] })
  async addVehicleTracker(
    @Param('vehicleId') vehicleId: string,
    @Body() createTrackerDto: CreateTrackerDto,
  ) {
    return await this.trackersService.updateTrackerVehicle(
      vehicleId,
      createTrackerDto,
    );
  }
}
