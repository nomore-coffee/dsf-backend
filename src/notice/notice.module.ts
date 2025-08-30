// notice.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notice, NoticeSchema } from './schemas/notice.schema';
import { NoticeService } from './services/notice.service';
import { NoticeController } from './controllers/notice.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notice.name, schema: NoticeSchema }]),
  ],
  controllers: [NoticeController],
  providers: [NoticeService],
  exports: [NoticeService],
})
export class NoticeModule {}
