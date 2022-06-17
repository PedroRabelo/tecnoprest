import { Injectable } from '@nestjs/common';
import { CreateMakerDto } from './dto/create-maker.dto';
import { UpdateMakerDto } from './dto/update-maker.dto';

@Injectable()
export class MakerService {
  create(createMakerDto: CreateMakerDto) {
    return 'This action adds a new maker';
  }

  findAll() {
    return `This action returns all maker`;
  }

  findOne(id: number) {
    return `This action returns a #${id} maker`;
  }

  update(id: number, updateMakerDto: UpdateMakerDto) {
    return `This action updates a #${id} maker`;
  }

  remove(id: number) {
    return `This action removes a #${id} maker`;
  }
}
