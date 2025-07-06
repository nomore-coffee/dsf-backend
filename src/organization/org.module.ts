import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Org, OrgSchema } from './schemas/org.schema';
import { OrgService } from './services/org.service';
import { OrgController } from './controllers/org.controller';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Org.name, schema: OrgSchema }]),
    UserModule
  ],
  controllers: [OrgController],
  providers: [OrgService],
})
export class OrgModule {}
