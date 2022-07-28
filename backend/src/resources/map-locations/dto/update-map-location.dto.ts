import { PartialType } from '@nestjs/swagger';
import { CreateMapLocationDto } from './create-map-location.dto';

export class UpdateMapLocationDto extends PartialType(CreateMapLocationDto) {}
