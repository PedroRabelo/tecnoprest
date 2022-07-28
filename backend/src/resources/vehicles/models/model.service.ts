import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ModelService {
  constructor(private prisma: PrismaService) {}

  findAllByMaker(makeId: string) {
    return this.prisma.vehicleModel.findMany({
      where: {
        makeId,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.vehicleModel.findUnique({ where: { id } });
  }
}
