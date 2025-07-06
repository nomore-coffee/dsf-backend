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
import { FileInterceptor } from '@nestjs/platform-express';
import { MaterialService } from '../services/material.service';
import { CreateMaterialDto, UpdateMaterialDto, UploadMaterialDto } from '../dtos/material.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/schemas/user.schema';
import { FileUploadInterceptor } from '../interceptors/file-upload.interceptor';

@Controller('materials')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  create(@Body() dto: CreateMaterialDto) {
    return this.materialService.create(dto);
  }

  @Post('upload')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @UseInterceptors(FileInterceptor('file', {
    storage: undefined, // Use memory storage
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
  }))
  async uploadMaterial(
    @Body() uploadDto: any,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    console.log('=== UPLOAD DEBUG ===');
    console.log('Request headers:', req.headers);
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Upload DTO:', JSON.stringify(uploadDto, null, 2));
    console.log('File:', file ? {
      fieldname: file.fieldname,
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      size: file.size,
      buffer: file.buffer ? `Buffer present (${file.buffer.length} bytes)` : 'No buffer'
    } : 'No file');
    console.log('===================');
    
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    
    // Basic file validation
    if (file.size > 10 * 1024 * 1024) {
      throw new BadRequestException('File size exceeds 10MB limit');
    }
    
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'image/jpeg',
      'image/png',
      'image/gif',
      'video/mp4',
      'video/avi',
      'video/mov',
      'audio/mpeg',
      'audio/wav',
    ];
    
    console.log('File mimetype:', file.mimetype);
    console.log('File originalname:', file.originalname);
    
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(`File type ${file.mimetype} is not allowed. Allowed types: ${allowedMimeTypes.join(', ')}`);
    }
    
    // Validate the upload DTO
    const validatedDto = {
      orgID: uploadDto.orgID,
      userID: uploadDto.userID,
      forClass: parseInt(uploadDto.forClass),
      materialTitle: uploadDto.materialTitle,
      materialSubject: uploadDto.materialSubject,
    };
    
    console.log('Validated DTO:', JSON.stringify(validatedDto, null, 2));
    
    return this.materialService.uploadMaterial(validatedDto, file);
  }

  @Get()
  findAll() {
    return this.materialService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.materialService.findById(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  update(@Param('id') id: string, @Body() dto: UpdateMaterialDto) {
    return this.materialService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  delete(@Param('id') id: string) {
    return this.materialService.delete(id);
  }

  @Get('user/:userID')
  findByUser(@Param('userID') userID: string) {
    return this.materialService.findByUser(userID);
  }

  @Get('org/:orgID')
  findByOrg(@Param('orgID') orgID: string) {
    return this.materialService.findByOrg(orgID);
  }

  @Get('class/:forClass')
  findByClass(@Param('forClass') forClass: number) {
    return this.materialService.findByClass(Number(forClass));
  }

  @Get('subject/:materialSubject')
  findBySubject(@Param('materialSubject') materialSubject: string) {
    return this.materialService.findBySubject(materialSubject);
  }

  @Get('org/:orgID/class/:forClass')
  findByOrgAndClass(
    @Param('orgID') orgID: string,
    @Param('forClass') forClass: number,
  ) {
    return this.materialService.findByOrgAndClass(orgID, Number(forClass));
  }

  @Get('org/:orgID/subject/:materialSubject')
  findByOrgAndSubject(
    @Param('orgID') orgID: string,
    @Param('materialSubject') materialSubject: string,
  ) {
    return this.materialService.findByOrgAndSubject(orgID, materialSubject);
  }

  @Get('super-admin/all')
  @Roles(UserRole.SUPER_ADMIN)
  getAllMaterialsSuperAdmin(@Query('sortByOrg') sortByOrg: string) {
    // sortByOrg can be 'asc' or 'desc'
    return this.materialService.getAllMaterialsSortedByOrg(sortByOrg);
  }

  // Test endpoint for debugging file upload (no auth required)
  @Post('test-upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: undefined, // Use memory storage
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
  }))
  async testUpload(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    console.log('=== TEST UPLOAD DEBUG ===');
    console.log('Request headers:', req.headers);
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Body:', JSON.stringify(body, null, 2));
    console.log('File:', file ? {
      fieldname: file.fieldname,
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      size: file.size,
      buffer: file.buffer ? `Buffer present (${file.buffer.length} bytes)` : 'No buffer'
    } : 'No file');
    console.log('========================');
    
    return {
      success: true,
      body,
      file: file ? {
        fieldname: file.fieldname,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size
      } : null
    };
  }
}
