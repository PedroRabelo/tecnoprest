import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ConnectionArgs } from 'src/page/connection-args.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { TenantEntity } from './entities/tenant.entity';

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}

  create(createTenantDto: CreateTenantDto) {
    return this.prisma.tenant.create({ data: createTenantDto });
  }

  findAll() {
    return this.prisma.tenant.findMany({ where: { ativo: true } });
  }

  findPage(connectionArgs: ConnectionArgs) {
    const where: Prisma.TenantWhereInput = { ativo: true };

    return findManyCursorConnection(
      (args) => {
        return this.prisma.tenant.findMany({ ...args, where: where });
      },
      () => this.prisma.tenant.count({ where: where }),
      connectionArgs,
      {
        recordToEdge: (record) => ({
          node: new TenantEntity(record),
        }),
      },
    );
  }

  findOne(id: string) {
    return this.prisma.tenant.findUnique({ where: { id: id } });
  }

  findInactives() {
    return this.prisma.tenant.findMany({ where: { ativo: false } });
  }

  update(id: string, updateTenantDto: UpdateTenantDto) {
    return this.prisma.tenant.update({
      where: { id: id },
      data: updateTenantDto,
    });
  }

  remove(id: string) {
    return this.prisma.tenant.delete({ where: { id: id } });
  }

  findBySlug(slug: string) {
    return this.prisma.tenant.findUnique({ where: { slug } });
  }
}
