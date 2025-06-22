import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { User, UserSchema } from '../users/schemas/user.schema';
import { Org, OrgSchema } from 'src/organization/schemas/org.schema';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User?.name, schema: UserSchema  },{ name: Org?.name, schema: OrgSchema  }]),
    JwtModule.register({
      secret: 'mySecretKey', // ⚠️ replace with env variable in prod
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService , JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
