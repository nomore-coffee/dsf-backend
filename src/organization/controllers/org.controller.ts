import { Controller, Post, Get, Put, Patch, Param, Body, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { OrgService } from '../services/org.service';
import { CreateOrgDto } from '../dtos/create-org.dto';
import { UpdateOrgDto } from '../dtos/update-org.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/schemas/user.schema';

@ApiTags('Organization')
@Controller('orgs')
export class OrgController {
  constructor(private readonly orgService: OrgService ) {}

  @Post('setup')
  @ApiOperation({ summary: 'Create organization setup (initial setup without auth)' })
  @ApiBody({ type: CreateOrgDto })
  @ApiResponse({ status: 201, description: 'Organization created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid data' })
  createSetup(@Body() dto: CreateOrgDto) {
      return this.orgService.create(dto);
  }

  @Post()
  @UseGuards(JwtAuthGuard , RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create organization (authenticated)' })
  @ApiBody({ type: CreateOrgDto })
  @ApiResponse({ status: 201, description: 'Organization created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  create(@Body() dto: CreateOrgDto) {
      return this.orgService.create(dto);
  }

  @Get('super-admin/all')
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all organizations (SUPER_ADMIN only)' })
  @ApiQuery({ name: 'sort', required: false, description: 'Sort by creation date: asc or desc', example: 'desc' })
  @ApiResponse({ status: 200, description: 'Organizations retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - SUPER_ADMIN access required' })
  getAllOrgsSuperAdmin(@Query('sort') sort: string) {
    // sort can be 'asc' or 'desc' for creation date
    return this.orgService.getAllOrgSortedByDate(sort);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get organization by ID' })
  @ApiParam({ name: 'id', description: 'Organization ID', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Organization retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  getById(@Param('id') id: string) {
    return this.orgService.findById(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all organizations (ADMIN only)' })
  @ApiResponse({ status: 200, description: 'Organizations retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - ADMIN access required' })
  getAllOrg() {
    return this.orgService.getAllOrg();
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update organization' })
  @ApiParam({ name: 'id', description: 'Organization ID', example: '507f1f77bcf86cd799439011' })
  @ApiBody({ type: UpdateOrgDto })
  @ApiResponse({ status: 200, description: 'Organization updated successfully' })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  update(@Param('id') id: string, @Body() dto: UpdateOrgDto) {
    return this.orgService.update(id, dto);
  }

  @Patch(':id/activate')
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Activate organization' })
  @ApiParam({ name: 'id', description: 'Organization ID', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Organization activated successfully' })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  activate(@Param('id') id: string) {
    return this.orgService.activate(id);
  }

  @Patch(':id/deactivate')
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Deactivate organization' })
  @ApiParam({ name: 'id', description: 'Organization ID', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Organization deactivated successfully' })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  deactivate(@Param('id') id: string) {
    return this.orgService.deactivate(id);
  }
}
