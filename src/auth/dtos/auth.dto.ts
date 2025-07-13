import { IsEmail, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../users/schemas/user.schema';

export class LoginDto {
  @ApiProperty({
    description: 'User email address',
    example: 'admin@digitalshala.com',
    type: String,
  })
  @IsEmail()
  userEmail: string;

  @ApiProperty({
    description: 'User password (minimum 6 characters)',
    example: 'securePassword123',
    type: String,
    minLength: 6,
  })
  @IsString()
  userPassword: string;

  @ApiProperty({
    description: 'User role for authentication',
    enum: UserRole,
    example: 'admin',
  })
  @IsEnum(UserRole)
  role: UserRole;
}
