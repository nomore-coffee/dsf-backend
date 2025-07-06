import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Material } from '../schemas/material.schema';
import { CreateMaterialDto, UpdateMaterialDto, UploadMaterialDto } from '../dtos/material.dto';
import { S3Service } from './s3.service';

@Injectable()
export class MaterialService {
  constructor(
    @InjectModel(Material.name) private materialModel: Model<Material>,
    private s3Service: S3Service,
  ) {}

  async create(createDto: CreateMaterialDto): Promise<Material> {
    return this.materialModel.create(createDto);
  }

  async uploadMaterial(
    uploadDto: UploadMaterialDto,
    file: Express.Multer.File,
  ): Promise<Material> {
    try {
      // Generate S3 key for the file
      const key = this.s3Service.generateKey(
        file.originalname,
        uploadDto.orgID,
        uploadDto.userID,
      );

      // Upload file to S3
      const materialUrl = await this.s3Service.uploadFile(file, key);

      // Create material record
      const materialData = {
        ...uploadDto,
        materialUrl,
        orgID: new Types.ObjectId(uploadDto.orgID),
        userID: new Types.ObjectId(uploadDto.userID),
      };

      const material = new this.materialModel(materialData);
      return await material.save();
    } catch (error) {
      throw new BadRequestException(`Failed to upload material: ${error.message}`);
    }
  }

  async findAll(): Promise<Material[]> {
    return this.materialModel.find().exec();
  }

  async findById(id: string): Promise<Material> {
    const material = await this.materialModel.findById(id).exec();
    if (!material) throw new NotFoundException('Material not found');
    return material;
  }

  async update(id: string, updateDto: UpdateMaterialDto): Promise<Material> {
    const updated = await this.materialModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    if (!updated) throw new NotFoundException('Material not found');
    return updated;
  }

  async delete(id: string): Promise<void> {
    const material = await this.materialModel.findById(id).exec();
    if (!material) throw new NotFoundException('Material not found');

    // Extract key from material URL
    const url = new URL(material.materialUrl);
    const key = url.pathname.substring(1); // Remove leading slash

    // Delete file from S3
    try {
      await this.s3Service.deleteFile(key);
    } catch (error) {
      console.error('Failed to delete file from S3:', error);
    }

    // Delete material record
    await this.materialModel.findByIdAndDelete(id).exec();
  }

  async findByUser(userID: string): Promise<Material[]> {
    return this.materialModel.find({ userID }).exec();
  }

  async findByOrg(orgID: string): Promise<Material[]> {
    return this.materialModel.find({ orgID }).exec();
  }

  async findByClass(forClass: number): Promise<Material[]> {
    return this.materialModel.find({ forClass }).exec();
  }

  async findBySubject(materialSubject: string): Promise<Material[]> {
    return this.materialModel.find({ materialSubject }).exec();
  }

  async findByOrgAndClass(orgID: string, forClass: number): Promise<Material[]> {
    return this.materialModel.find({ orgID, forClass }).exec();
  }

  async findByOrgAndSubject(orgID: string, materialSubject: string): Promise<Material[]> {
    return this.materialModel.find({ orgID, materialSubject }).exec();
  }

  async getAllMaterialsSortedByOrg(sortByOrg: string = 'asc'): Promise<Material[]> {
    const sortOrder = sortByOrg === 'desc' ? -1 : 1;
    return this.materialModel.find().sort({ orgID: sortOrder }).exec();
  }
}
