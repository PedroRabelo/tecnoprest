import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.vehicleCategory.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.vehicleCategory.findUnique({ where: { id } });
  }
}
