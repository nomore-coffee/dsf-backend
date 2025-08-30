import { 
  Controller, 
  Post, 
  Get, 
  Put, 
  Delete, 
  Param, 
  Body, 
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  BadRequestException,
  Query,
  Req,
} from '@nestjs/common';
import { MaterialService } from "src/material/services/material.service";
import { User, UserRole } from 'src/users/schemas/user.schema';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { TimetableService } from 'src/timetable/services/timetable.service';
import { NoticeService } from 'src/notice/services/notice.service';
import { UserService } from 'src/users/services/user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
@ApiTags("delete")
@Controller('delete')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DeleteController {
    constructor(
        readonly materialService: MaterialService , 
        readonly timetableService: TimetableService,
        readonly noticeService: NoticeService,
        readonly userService: UserService
    ) {}
    @Post()
      @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.TEACHER)
      @ApiBearerAuth('JWT-auth')
      delete(
        @Body() body: any,
      ) {
            if(body.module == 'material'){
                return this.materialService.delete(body.id);
            }
            if(body.module == 'timetable'){
                return this.timetableService.delete(body.id) ;
            }
            if(body.module =='notice'){
                return this.noticeService.delete(body.id) ;
            }
            if(body.module == 'user'){
                return this.userService.deactivateUser(body.id) ;
            }
      }
}