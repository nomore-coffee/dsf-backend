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
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { MaterialService } from '../services/material.service';
import { CreateMaterialDto, UpdateMaterialDto, UploadMaterialDto } from '../dtos/material.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/schemas/user.schema';
import { FileUploadInterceptor } from '../interceptors/file-upload.interceptor';

@ApiTags('Material')
@Controller('materials')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create material (metadata only)' })
  @ApiBody({ type: CreateMaterialDto })
  @ApiResponse({ status: 201, description: 'Material created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - ADMIN/TEACHER access required' })
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
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Upload material with file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Material file (PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, Images, Videos, Audio)',
        },
        orgID: { type: 'string', example: '507f1f77bcf86cd799439011' },
        userID: { type: 'string', example: '507f1f77bcf86cd799439012' },
        forClass: { type: 'number', example: 10 },
        materialTitle: { type: 'string', example: 'Maths Chapter 1' },
        materialSubject: { type: 'string', example: 'math' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Material uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid file or data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - ADMIN/TEACHER access required' })
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
      throw new BadRequestException(`File type ${file.mimetype} is not allowed`);
    }
    
    // Create material DTO from form data
    const materialDto: CreateMaterialDto = {
      orgID: uploadDto.orgID,
      userID: uploadDto.userID,
      forClass: parseInt(uploadDto.forClass),
      materialTitle: uploadDto.materialTitle,
      materialSubject: uploadDto.materialSubject,
    };
    
    // Upload to S3 and create material
    return this.materialService.uploadMaterial(materialDto, file);
  }

  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all materials' })
  @ApiResponse({ status: 200, description: 'Materials retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.materialService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get material by ID' })
  @ApiParam({ name: 'id', description: 'Material ID', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Material retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Material not found' })
  findById(@Param('id') id: string) {
    return this.materialService.findById(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update material' })
  @ApiParam({ name: 'id', description: 'Material ID', example: '507f1f77bcf86cd799439011' })
  @ApiBody({ type: UpdateMaterialDto })
  @ApiResponse({ status: 200, description: 'Material updated successfully' })
  @ApiResponse({ status: 404, description: 'Material not found' })
  update(@Param('id') id: string, @Body() dto: UpdateMaterialDto) {
    return this.materialService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete material' })
  @ApiParam({ name: 'id', description: 'Material ID', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Material deleted successfully' })
  @ApiResponse({ status: 404, description: 'Material not found' })
  delete(@Param('id') id: string) {
    return this.materialService.delete(id);
  }

  @Get('user/:userID')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get materials by user' })
  @ApiParam({ name: 'userID', description: 'User ID', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Materials retrieved successfully' })
  findByUser(@Param('userID') userID: string) {
    return this.materialService.findByUser(userID);
  }

  @Get('org/:orgID')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get materials by organization' })
  @ApiParam({ name: 'orgID', description: 'Organization ID', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Materials retrieved successfully' })
  findByOrg(@Param('orgID') orgID: string) {
    return this.materialService.findByOrg(orgID);
  }

  @Get('class/:forClass')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get materials by class' })
  @ApiParam({ name: 'forClass', description: 'Class number', example: 10 })
  @ApiResponse({ status: 200, description: 'Materials retrieved successfully' })
  findByClass(@Param('forClass') forClass: number) {
    return this.materialService.findByClass(Number(forClass));
  }

  @Get('subject/:materialSubject')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get materials by subject' })
  @ApiParam({ name: 'materialSubject', description: 'Subject name', example: 'math' })
  @ApiResponse({ status: 200, description: 'Materials retrieved successfully' })
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
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all materials (SUPER_ADMIN only)' })
  @ApiQuery({ name: 'sortByOrg', required: false, description: 'Sort by organizationId: asc or desc', example: 'asc' })
  @ApiResponse({ status: 200, description: 'Materials retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - SUPER_ADMIN access required' })
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
  @ApiOperation({ summary: 'Test file upload (debug endpoint)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Test file upload',
        },
        orgID: { type: 'string', example: '507f1f77bcf86cd799439011' },
        userID: { type: 'string', example: '507f1f77bcf86cd799439012' },
        forClass: { type: 'number', example: 10 },
        materialTitle: { type: 'string', example: 'Test Material' },
        materialSubject: { type: 'string', example: 'math' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Test upload successful' })
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
