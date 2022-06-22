import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMapLocationDto } from './dto/create-map-location.dto';
import { UpdateMapLocationDto } from './dto/update-map-location.dto';

@Injectable()
export class MapLocationsService {
  constructor(private prisma: PrismaService) {}

  create(createMapLocationDto: CreateMapLocationDto, tenantId: string) {
    return this.prisma.tenantMapLocation.create({
      data: {
        tenantId,
        ...createMapLocationDto,
      },
    });
  }

  findAll(tenantId: string) {
    return this.prisma.tenantMapLocation.findMany({
      where: { tenantId },
    });
  }

  findOne(id: string) {
    return this.prisma.tenantMapLocation.findUnique({ where: { id } });
  }

  update(id: string, updateMapLocationDto: UpdateMapLocationDto) {
    return this.prisma.tenantMapLocation.update({
      where: { id: id },
      data: updateMapLocationDto,
    });
  }

  remove(id: string) {
    return this.prisma.tenantMapLocation.delete({ where: { id: id } });
  }
}
