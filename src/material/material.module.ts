import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Material, MaterialSchema } from './schemas/material.schema';
import { MaterialService } from './services/material.service';
import { MaterialController } from './controllers/material.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Material.name, schema: MaterialSchema }])],
  controllers: [MaterialController],
  providers: [MaterialService],
})
export class MaterialModule {}
