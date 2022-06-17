import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTrackerDto } from './dto/create-tracker.dto';
import { UpdateTrackerDto } from './dto/update-tracker.dto';

@Injectable()
export class TrackersService {
  constructor(private prisma: PrismaService) {}

  create(createTrackerDto: CreateTrackerDto) {
    return 'This action adds a new tracker';
  }

  findAll() {
    return `This action returns all trackers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tracker`;
  }

  update(id: number, updateTrackerDto: UpdateTrackerDto) {
    return `This action updates a #${id} tracker`;
  }

  remove(id: number) {
    return `This action removes a #${id} tracker`;
  }
}
