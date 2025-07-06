import { Controller, Post, Get, Put, Patch, Param, Body, UseGuards, Query } from '@nestjs/common';
import { OrgService } from '../services/org.service';
import { CreateOrgDto } from '../dtos/create-org.dto';
import { UpdateOrgDto } from '../dtos/update-org.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/schemas/user.schema';

@Controller('orgs')
export class OrgController {
  constructor(private readonly orgService: OrgService ) {}

  @Post('setup')
  createSetup(@Body() dto: CreateOrgDto) {
      return this.orgService.create(dto);
  }

  @Post()
  @UseGuards(JwtAuthGuard , RolesGuard)
  create(@Body() dto: CreateOrgDto) {
      return this.orgService.create(dto);
  }

  @Get('super-admin/all')
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  getAllOrgsSuperAdmin(@Query('sort') sort: string) {
    // sort can be 'asc' or 'desc' for creation date
    return this.orgService.getAllOrgSortedByDate(sort);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles(UserRole.ADMIN)
  getById(@Param('id') id: string) {
    return this.orgService.findById(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles(UserRole.ADMIN)
  getAllOrg() {
    return this.orgService.getAllOrg();
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateOrgDto) {
    return this.orgService.update(id, dto);
  }

  @Patch(':id/activate')
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles(UserRole.ADMIN)
  activate(@Param('id') id: string) {
    return this.orgService.activate(id);
  }

  @Patch(':id/deactivate')
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles(UserRole.ADMIN)
  deactivate(@Param('id') id: string) {
    return this.orgService.deactivate(id);
  }
}
