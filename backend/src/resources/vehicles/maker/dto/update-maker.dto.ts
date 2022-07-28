import { PartialType } from '@nestjs/swagger';
import { CreateMakerDto } from './create-maker.dto';

export class UpdateMakerDto extends PartialType(CreateMakerDto) {}
