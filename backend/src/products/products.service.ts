import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ConnectionArgs } from 'src/page/connection-args.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({ data: createProductDto });
  }

  findAll() {
    return this.prisma.product.findMany({ where: { published: true } });
  }

  findPage(connectionArgs: ConnectionArgs) {
    const where: Prisma.ProductWhereInput = { published: true };

    return findManyCursorConnection(
      (args) => {
        return this.prisma.product.findMany({ ...args, where: where });
      },
      () => this.prisma.product.count({ where: where }),
      connectionArgs,
      {
        recordToEdge: (record) => ({
          node: new ProductEntity(record),
        }),
      },
    );
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({ where: { id: id } });
  }

  findDrafts() {
    return this.prisma.product.findMany({ where: { published: false } });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id: id },
      data: updateProductDto,
    });
  }

  remove(id: string) {
    return this.prisma.product.delete({ where: { id: id } });
  }
}
