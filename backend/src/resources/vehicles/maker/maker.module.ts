import { Module } from '@nestjs/common';
import { MakerService } from './maker.service';
import { MakerController } from './maker.controller';

@Module({
  controllers: [MakerController],
  providers: [MakerService]
})
export class MakerModule {}
