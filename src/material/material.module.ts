import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Material, MaterialSchema } from './schemas/material.schema';
import { MaterialService } from './services/material.service';
import { MaterialController } from './controllers/material.controller';
import { S3Service } from './services/s3.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Material.name, schema: MaterialSchema }]),
    ConfigModule,
  ],
  controllers: [MaterialController],
  providers: [MaterialService, S3Service],
  exports: [MaterialService, S3Service],
})
export class MaterialModule {}
