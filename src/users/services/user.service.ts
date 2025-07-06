import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

 async createUser(dto: CreateUserDto): Promise<User> {
  try {
    const existing = await this.userModel.findOne({ userEmail: dto.userEmail });
    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    const user = new this.userModel(dto);
    return await user.save();
  } catch (error) {
    if (error.name === 'ValidationError' || 'ConflictException') {
      throw new BadRequestException(error.message);
    }

    console.error('Create User Error:', error);

    throw new InternalServerErrorException('Failed to create user');
  }
}

  async updateUser(userId: string, dto: UpdateUserDto): Promise<User> {
  try {
    if (dto.userPassword) {
      const salt = await bcrypt.genSalt(10);
      dto.userPassword = await bcrypt.hash(dto.userPassword, salt);
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(userId, dto, { new: true });
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  } catch (error) {
    console.error('Update User Error:', error);

    if (error.name === 'CastError') {
      throw new BadRequestException('Invalid user ID format');
    }

    throw new InternalServerErrorException('Failed to update user');
  }
}

async activateUser(userId: string): Promise<User> {
  try {
    const user = await this.userModel.findByIdAndUpdate(userId, { isActive: true }, { new: true });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  } catch (error) {
    console.error('Activate User Error:', error);

    if (error.name === 'CastError') {
      throw new BadRequestException('Invalid user ID format');
    }

    throw new InternalServerErrorException('Failed to activate user');
  }
}

async deactivateUser(userId: string): Promise<User> {
  try {
    const user = await this.userModel.findByIdAndUpdate(userId, { isActive: false }, { new: true });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  } catch (error) {
    console.error('Deactivate User Error:', error);

    if (error.name === 'CastError') {
      throw new BadRequestException('Invalid user ID format');
    }

    throw new InternalServerErrorException('Failed to deactivate user');
  }
}

async getAllUsersSortedByOrg(sortByOrg: string = 'asc'): Promise<User[]> {
  const sortOrder = sortByOrg === 'desc' ? -1 : 1;
  return this.userModel.find().sort({ orgID: sortOrder }).exec();
}
}
