import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Page } from 'src/page/page.dto';
import { CategoryService } from './category.service';
import { VehicleCategoryEntity } from './entities/category.entity';

@Controller('vehicle-categories')
@ApiTags('vehicle-categories')
@ApiExtraModels(Page)
@ApiBearerAuth()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOkResponse({ type: [VehicleCategoryEntity] })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: VehicleCategoryEntity })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }
}
