import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Org } from '../schemas/org.schema';
import { CreateOrgDto } from '../dtos/create-org.dto';
import { UpdateOrgDto } from '../dtos/update-org.dto';

@Injectable()
export class OrgService {
  constructor(@InjectModel(Org.name) private orgModel: Model<Org>) {}

  async create(dto: CreateOrgDto): Promise<Org> {
    const created = new this.orgModel(dto);
    return created.save();
  }

  async getAllOrg():Promise<Org[]>{
    const orgList = await this.orgModel.find();
    return orgList
  }

  async findById(id: string): Promise<Org> {
    const org = await this.orgModel.findById(id).populate('orgOwner');
    if (!org) throw new NotFoundException('Organization not found');
    return org;
  }

  async update(id: string, dto: UpdateOrgDto): Promise<Org> {
    const updated = await this.orgModel.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) throw new NotFoundException('Organization not found');
    return updated;
  }

  async activate(id: string): Promise<Org> {
    return this.update(id, { isActive: true });
  }

  async deactivate(id: string): Promise<Org> {
    return this.update(id, { isActive: false });
  }
}
