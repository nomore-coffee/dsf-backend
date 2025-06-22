// notice.controller.ts
import { Controller, Post, Get, NotFoundException, Query, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { NoticeService } from '../services/notice.service';
import { CreateNoticeDto } from '../dtos/create-notice.dto';
import { UpdateNoticeDto } from '../dtos/update-notice.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/role.enum';

@Controller('notices')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NoticeController {
    constructor(private readonly noticeService: NoticeService) { }

    @Get()
    @Roles(UserRole.ADMIN, UserRole.PARENT, UserRole.STUDENT, UserRole.TEACHER)
    async findAll() {
        return this.noticeService.findAll();
    }

    // GET /notices/:id – fetch one
    @Get('/filter')
    @Roles(UserRole.ADMIN, UserRole.PARENT, UserRole.STUDENT, UserRole.TEACHER)
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
    create(@Body() createNoticeDto: CreateNoticeDto) {
        return this.noticeService.create(createNoticeDto);
    }

    @Put(':id')
    @Roles(UserRole.ADMIN, UserRole.TEACHER)
    update(@Param('id') id: string, @Body() updateNoticeDto: UpdateNoticeDto) {
        return this.noticeService.update(id, updateNoticeDto);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN, UserRole.TEACHER)
    delete(@Param('id') id: string) {
        return this.noticeService.delete(id);
    }

}
