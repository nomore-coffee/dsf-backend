import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  userEmail: string;

  @IsString()
  userPassword: string;

  @IsString()
  role: string;
}
