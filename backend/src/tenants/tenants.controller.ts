import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Page } from 'src/page/page.dto';
import { TenantEntity } from './entities/tenant.entity';
import { ApiPageResponse } from 'src/page/api-page-response.decorator';
import { ConnectionArgs } from 'src/page/connection-args.dto';

@Controller('tenants')
@ApiTags('tenants')
@ApiExtraModels(Page)
@ApiBearerAuth()
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  @ApiCreatedResponse({ type: TenantEntity })
  async create(@Body() createTenantDto: CreateTenantDto) {
    return new TenantEntity(await this.tenantsService.create(createTenantDto));
  }

  @Get()
  @ApiOkResponse({ type: [TenantEntity] })
  async findAll() {
    const tenants = await this.tenantsService.findAll();
    return tenants.map((tenant) => new TenantEntity(tenant));
  }

  @Get('inactives')
  @ApiOkResponse({ type: [TenantEntity] })
  async findInactives() {
    const inactives = await this.tenantsService.findInactives();
    return inactives.map((product) => new TenantEntity(product));
  }

  @Get('page')
  @ApiPageResponse(TenantEntity)
  async findPage(@Query() connectionArgs: ConnectionArgs) {
    return this.tenantsService.findPage(connectionArgs);
  }

  @Get(':id')
  @ApiOkResponse({ type: [TenantEntity] })
  async findOne(@Param('id') id: string) {
    return new TenantEntity(await this.tenantsService.findOne(id));
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: TenantEntity })
  async update(
    @Param('id') id: string,
    @Body() updateTenantDto: UpdateTenantDto,
  ) {
    return await this.tenantsService.update(id, updateTenantDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TenantEntity })
  remove(@Param('id') id: string) {
    return this.tenantsService.remove(id);
  }
}
