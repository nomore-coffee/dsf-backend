import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Material } from '../schemas/material.schema';
import { CreateMaterialDto, UpdateMaterialDto } from '../dtos/material.dto';

@Injectable()
export class MaterialService {
  constructor(
    @InjectModel(Material.name) private materialModel: Model<Material>,
  ) {}

  async create(createDto: CreateMaterialDto): Promise<Material> {
    return this.materialModel.create(createDto);
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
    const res = await this.materialModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Material not found');
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
}
