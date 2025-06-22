import { Controller, Post, Get, Put, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { OrgService } from '../services/org.service';
import { CreateOrgDto } from '../dtos/create-org.dto';
import { UpdateOrgDto } from '../dtos/update-org.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/schemas/user.schema';

@Controller('orgs')
@UseGuards(JwtAuthGuard , RolesGuard)
export class OrgController {
  constructor(private readonly orgService: OrgService) {}

  @Post()
  create(@Body() dto: CreateOrgDto) {
    return this.orgService.create(dto);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  getById(@Param('id') id: string) {
    return this.orgService.findById(id);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  getAllOrg() {
    return this.orgService.getAllOrg();
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateOrgDto) {
    return this.orgService.update(id, dto);
  }

  @Patch(':id/activate')
  @Roles(UserRole.ADMIN)
  activate(@Param('id') id: string) {
    return this.orgService.activate(id);
  }

  @Patch(':id/deactivate')
  @Roles(UserRole.ADMIN)
  deactivate(@Param('id') id: string) {
    return this.orgService.deactivate(id);
  }
}
