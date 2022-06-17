import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MakerService } from './maker.service';
import { CreateMakerDto } from './dto/create-maker.dto';
import { UpdateMakerDto } from './dto/update-maker.dto';

@Controller('maker')
export class MakerController {
  constructor(private readonly makerService: MakerService) {}

  @Post()
  create(@Body() createMakerDto: CreateMakerDto) {
    return this.makerService.create(createMakerDto);
  }

  @Get()
  findAll() {
    return this.makerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.makerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMakerDto: UpdateMakerDto) {
    return this.makerService.update(+id, updateMakerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.makerService.remove(+id);
  }
}
