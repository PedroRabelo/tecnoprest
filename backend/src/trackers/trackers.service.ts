import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ConflictError } from 'src/common/errors/types/ConflictError';
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

  async updateTrackerVehicle(
    vehicleId: string,
    createTrackerDto: CreateTrackerDto,
  ) {
    const where: Prisma.TrackerWhereUniqueInput = {
      trackNumber_technology: {
        technology: createTrackerDto.technology,
        trackNumber: createTrackerDto.technology,
      },
    };

    const trackerExist = await this.prisma.tracker.findUnique({ where });

    if (trackerExist) {
      if (trackerExist.vehicleId && trackerExist.vehicleId !== vehicleId) {
        throw new ConflictError('Já existe um veículo para este rastreador');
      }
    }

    return await this.prisma.tracker.upsert({
      where: where,
      create: { ...createTrackerDto, vehicleId },
      update: { vehicleId },
    });
  }
}
