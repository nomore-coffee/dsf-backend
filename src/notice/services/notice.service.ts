// notice.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notice } from '../schemas/notice.schema';
import { CreateNoticeDto } from '../dtos/create-notice.dto';
import { UpdateNoticeDto } from '../dtos/update-notice.dto';

@Injectable()
export class NoticeService {
    constructor(
        @InjectModel(Notice.name) private noticeModel: Model<Notice>,
    ) { }

    async create(createNoticeDto: CreateNoticeDto): Promise<Notice> {
        try {
            const newNotice = new this.noticeModel(createNoticeDto);
            return await newNotice.save();
        } catch (err) {
            throw new BadRequestException('Invalid data provided');
        }
    }

    async update(id: string, updateNoticeDto: UpdateNoticeDto): Promise<Notice> {
        const updated = await this.noticeModel.findByIdAndUpdate(id, updateNoticeDto, { new: true });
        if (!updated) throw new NotFoundException('Notice not found');
        return updated;
    }

    async delete(id: string): Promise<{ message: string }> {
        const deleted = await this.noticeModel.findByIdAndDelete(id);
        if (!deleted) throw new NotFoundException('Notice not found');
        return { message: 'Notice deleted successfully' };
    }

    async findAll(): Promise<Notice[]> {
        return this.noticeModel
            .find()
            .populate('orgID userID') // optional: populate referenced fields
            .sort({ createdAt: -1 }); // latest first
    }

    // Fetch single notice by ID
    async findOne(id: string): Promise<Notice | null> {
        return this.noticeModel.findById(id).populate('orgID userID');
    }

    async findByFilter(filter: {
        id?: string;
        forClass?: number;
        noticeType?: string;
        userID?: string;
    }): Promise<Notice[]> {
        const query: any = {};
        if (filter.id) query._id = filter.id;
        if (filter.forClass !== undefined) query.forClass = filter.forClass;
        if (filter.noticeType) query.noticeType = filter.noticeType;
        if (filter.userID) query.userID = filter.userID;

        return this.noticeModel
            .find(query)
            .populate('orgID userID')
            .sort({ createdAt: -1 });
    }


}
