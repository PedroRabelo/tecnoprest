import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ConflictError } from 'src/common/errors/types/ConflictError';
import { ConnectionArgs } from 'src/page/connection-args.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehiclePageEntity } from './entities/vehicle-page.entity';
import { VehicleEntity } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async create(createVehicleDto: CreateVehicleDto, tenant: string) {
    const vehicleExist = await this.prisma.vehicle.findUnique({
      where: {
        licensePlate: createVehicleDto.licensePlate,
      },
    });

    if (vehicleExist) {
      const vehicleAdded = await this.prisma.vehicleTenant.findFirst({
        where: { vehicleId: vehicleExist.id },
      });

      if (vehicleAdded) {
        throw new ConflictError('Veículo já está cadastrado');
      } else {
        return await this.prisma.vehicleTenant.create({
          data: {
            tenantId: tenant,
            vehicleId: vehicleExist.id,
          },
        });
      }
    }

    return await this.prisma.vehicle.create({
      data: {
        ...createVehicleDto,
        tenants: {
          create: [
            {
              tenant: {
                connect: { id: tenant },
              },
            },
          ],
        },
      },
    });
  }

  findAllByTenant(tenant: string, connectionArgs: ConnectionArgs) {
    const where: Prisma.VehicleWhereInput = {
      tenants: {
        some: { tenantId: tenant },
      },
    };

    return findManyCursorConnection(
      (args) => {
        return this.prisma.vehicle.findMany({
          ...args,
          where: where,
          select: {
            id: true,
            licensePlate: true,
            active: true,
            make: {
              select: {
                name: true,
              },
            },
            model: {
              select: {
                name: true,
              },
            },
          },
        });
      },
      () => this.prisma.vehicle.count({ where: where }),
      connectionArgs,
      {
        recordToEdge: (record) => ({
          node: new VehiclePageEntity(record),
        }),
      },
    );
  }

  findOneByLicensePlate(licensePlate: string) {
    return this.prisma.vehicle.findUnique({ where: { licensePlate } });
  }

  update(id: string, updateVehicleDto: UpdateVehicleDto) {
    return this.prisma.vehicle.update({
      where: { id: id },
      data: updateVehicleDto,
    });
  }

  remove(id: string) {
    return this.prisma.vehicle.delete({ where: { id: id } });
  }

  findVehicleTrackers(id: string) {
    return this.prisma.vehicle.findMany({
      where: {
        id,
      },
      select: {
        licensePlate: true,
        trackers: {
          select: {
            id: true,
            trackNumber: true,
            technology: true,
          },
        },
      },
    });
  }
}
