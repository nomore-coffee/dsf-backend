import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../users/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Org } from 'src/organization/schemas/org.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Org.name) private orgModel: Model<Org>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string , role: string): Promise<User | Org>{
    let user ;
    // if(role !== 'admin'){
      user = await this.userModel.findOne({ userEmail: email  , role: role });
      if (!user) throw new UnauthorizedException('Invalid credentials');
      const isMatch = await bcrypt.compare(pass, user.userPassword);
      if (!isMatch) throw new UnauthorizedException('Invalid credentials');
  //   }else{
  //     user = await this.userModel.findOne({ userEmail: email });
  //     if (!user) throw new UnauthorizedException('Invalid credentials');
  //     console.log("..",user,pass)
  //     const isMatch = await bcrypt.compare(pass, user.userPassword);
  //     if (!isMatch) throw new UnauthorizedException('Invalid credentials');
  //   }
    return user;
  }
  
  async login(user: any) {
    console.log(".>",user)
    const payload = {
      sub: user._id,
      email: user.userEmail ?? user.orgEmail,
      role: user.role ?? 'admin',
      orgID: user.orgID ?? user._id,
      // userID: user._id,
      userName: user.userName ?? user.orgName,
      userClass: user.userClass ?? null,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      payload:payload
    };
  }

  logout(): { message: string } {
    return { message: 'Logout successful (token deleted client-side)' };
  }
}
