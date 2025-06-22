// src/auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'mySecretKey', // ⚠️ use process.env.JWT_SECRET in prod
    });
  }

  async validate(payload: any) {
    return {
      _id: payload.sub,
      email: payload.email,
      role: payload.role,
      orgID: payload.orgID,
    };
  }
}
