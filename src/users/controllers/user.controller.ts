import { Body, Controller, Param, Patch, Post, UseGuards, Get, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserRole } from '../schemas/user.schema';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard , RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  async createUser(@Body() dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(id, dto);
  }

  @Patch(':id/activate')
  @Roles(UserRole.ADMIN)
  activateUser(@Param('id') id: string) {
    return this.userService.activateUser(id);
  }

  @Patch(':id/deactivate')
  @Roles(UserRole.ADMIN)
  deactivateUser(@Param('id') id: string) {
    return this.userService.deactivateUser(id);
  }

  @Get('super-admin/all')
  @Roles(UserRole.SUPER_ADMIN)
  getAllUsersSuperAdmin(@Query('sortByOrg') sortByOrg: string) {
    // sortByOrg can be 'asc' or 'desc'
    return this.userService.getAllUsersSortedByOrg(sortByOrg);
  }

  @Get('test/all')
  async getAllUsersTest() {
    return this.userService.getAllUsersSortedByOrg('asc');
  }
}
