import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Org, OrgSchema } from './schemas/org.schema';
import { OrgService } from './services/org.service';
import { OrgController } from './controllers/org.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Org.name, schema: OrgSchema }])],
  controllers: [OrgController],
  providers: [OrgService],
})
export class OrgModule {}
