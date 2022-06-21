import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { CategoryModule } from './category/category.module';
import { MakerModule } from './maker/maker.module';
import { ModelModule } from './models/model.module';
import { TrackersModule } from 'src/trackers/trackers.module';

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService],
  imports: [CategoryModule, MakerModule, ModelModule, TrackersModule],
})
export class VehiclesModule {}
