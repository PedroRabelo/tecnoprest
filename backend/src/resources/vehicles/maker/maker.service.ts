import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MakerService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.vehicleMake.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.vehicleMake.findUnique({ where: { id } });
  }
}
