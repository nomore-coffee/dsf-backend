// notice.controller.ts
import { Controller, Post, Get, NotFoundException, Query, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { NoticeService } from '../services/notice.service';
import { CreateNoticeDto } from '../dtos/create-notice.dto';
import { UpdateNoticeDto } from '../dtos/update-notice.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/role.enum';

@ApiTags('Notice')
@Controller('notices')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NoticeController {
    constructor(private readonly noticeService: NoticeService) { }

    @Get()
    @Roles(UserRole.ADMIN, UserRole.PARENT, UserRole.STUDENT, UserRole.TEACHER)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Get all notices' })
    @ApiResponse({ status: 200, description: 'Notices retrieved successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
    async findAll() {
        return this.noticeService.findAll();
    }

    // GET /notices/:id – fetch one
    @Get('/filter')
    @Roles(UserRole.ADMIN, UserRole.PARENT, UserRole.STUDENT, UserRole.TEACHER)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Filter notices by various criteria' })
    @ApiQuery({ name: 'id', required: false, description: 'Notice ID', example: '507f1f77bcf86cd799439011' })
    @ApiQuery({ name: 'forClass', required: false, description: 'Class number', example: 10 })
    @ApiQuery({ name: 'noticeType', required: false, description: 'Notice type: exam, sport, holiday, extra', example: 'sport' })
    @ApiQuery({ name: 'userID', required: false, description: 'User ID', example: '507f1f77bcf86cd799439012' })
    @ApiResponse({ status: 200, description: 'Filtered notices retrieved successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
    async findByFilter(
        @Query('id') id?: string,
        @Query('forClass') forClass?: number,
        @Query('noticeType') noticeType?: string,
        @Query('userID') userID?: string,
    ) {
        return this.noticeService.findByFilter({ id, forClass, noticeType, userID });
    }

    @Post()
    @Roles(UserRole.ADMIN, UserRole.TEACHER)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Create new notice' })
    @ApiBody({ type: CreateNoticeDto })
    @ApiResponse({ status: 201, description: 'Notice created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request - Invalid data' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - ADMIN/TEACHER access required' })
    create(@Body() createNoticeDto: CreateNoticeDto) {
        return this.noticeService.create(createNoticeDto);
    }

    @Put(':id')
    @Roles(UserRole.ADMIN, UserRole.TEACHER)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Update notice' })
    @ApiParam({ name: 'id', description: 'Notice ID', example: '507f1f77bcf86cd799439011' })
    @ApiBody({ type: UpdateNoticeDto })
    @ApiResponse({ status: 200, description: 'Notice updated successfully' })
    @ApiResponse({ status: 404, description: 'Notice not found' })
    update(@Param('id') id: string, @Body() updateNoticeDto: UpdateNoticeDto) {
        return this.noticeService.update(id, updateNoticeDto);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN, UserRole.TEACHER)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Delete notice' })
    @ApiParam({ name: 'id', description: 'Notice ID', example: '507f1f77bcf86cd799439011' })
    @ApiResponse({ status: 200, description: 'Notice deleted successfully' })
    @ApiResponse({ status: 404, description: 'Notice not found' })
    delete(@Param('id') id: string) {
        return this.noticeService.delete(id);
    }
}
