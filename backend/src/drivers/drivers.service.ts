import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ConnectionArgs } from 'src/page/connection-args.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { DriverEntity } from './entities/driver.entity';

@Injectable()
export class DriversService {
  constructor(private prisma: PrismaService) {}

  create(createDriverDto: CreateDriverDto) {
    const data: Prisma.DriverUncheckedCreateInput = {
      driverLicenseDate: new Date(createDriverDto.driverLicenseDate),
      driverLicenseExpires: new Date(createDriverDto.driverLicenseExpires),
      ...createDriverDto,
    };
    console.log(data);

    return this.prisma.driver.create({ data });
  }

  findAll() {
    return this.prisma.driver.findMany({ where: { active: true } });
  }

  findPage(connectionArgs: ConnectionArgs) {
    const where: Prisma.DriverWhereInput = { active: true };

    return findManyCursorConnection(
      (args) => {
        return this.prisma.driver.findMany({ ...args, where: where });
      },
      () => this.prisma.driver.count({ where: where }),
      connectionArgs,
      {
        recordToEdge: (record) => ({
          node: new DriverEntity(record),
        }),
      },
    );
  }

  findOne(id: string) {
    return this.prisma.driver.findUnique({ where: { id: id } });
  }

  findInactives() {
    return this.prisma.driver.findMany({ where: { active: false } });
  }

  update(id: string, updateDriverDto: UpdateDriverDto) {
    return this.prisma.driver.update({
      where: { id: id },
      data: updateDriverDto,
    });
  }

  remove(id: string) {
    return this.prisma.driver.delete({ where: { id: id } });
  }
}
