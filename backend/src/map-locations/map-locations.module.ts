import { Module } from '@nestjs/common';
import { MapLocationsService } from './map-locations.service';
import { MapLocationsController } from './map-locations.controller';

@Module({
  controllers: [MapLocationsController],
  providers: [MapLocationsService]
})
export class MapLocationsModule {}
