import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Org } from '../schemas/org.schema';
import { CreateOrgDto } from '../dtos/create-org.dto';
import { UpdateOrgDto } from '../dtos/update-org.dto';
import { UserService } from 'src/users/services/user.service';
import { CreateUserDto } from 'src/users/dtos/user.dto';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class OrgService {
  constructor(
    @InjectModel(Org.name) private orgModel: Model<Org>,
    private userService: UserService
  ) {}

  async create(dto: CreateOrgDto): Promise<Org> {
    // First, create the user (organization owner)
    const createUserDto: CreateUserDto = {
      userName: dto.ownerName,
      userEmail: dto.ownerEmail,
      userPassword: dto.ownerPassword,
      userClass: dto.ownerClass,
      role: dto.ownerRole,
      orgID: new Types.ObjectId(), // Temporary ID, will be updated
    };

    const createdUser = await this.userService.createUser(createUserDto);

    // Then, create the organization with the user as owner
    const orgData = {
      orgName: dto.orgName,
      orgEmail: dto.orgEmail,
      orgPassword: dto.orgPassword,
      orgOwner: new Types.ObjectId(createdUser.id),
      isActive: dto.isActive ?? true,
    };

    const createdOrg = new this.orgModel(orgData);
    const savedOrg = await createdOrg.save();

    // Finally, update the user with the organization ID
    await this.userService.updateUser(createdUser.id, {
      orgID: new Types.ObjectId(savedOrg.id),
    });

    return savedOrg;
  }

  async getAllOrg():Promise<Org[]>{
    const orgList = await this.orgModel.find();
    return orgList
  }

  async getAllOrgSortedByDate(sort: string = 'desc'): Promise<Org[]> {
    const sortOrder = sort === 'asc' ? 1 : -1;
    return this.orgModel.find().sort({ createdAt: sortOrder }).exec();
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
