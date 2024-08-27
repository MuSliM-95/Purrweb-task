import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '../entities/user.entity';

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  accessToken?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;

  constructor(user: User, accessToken?: string) {
    (this.id = user?.id), (this.email = user?.email), (this.role = user?.role);

    if (accessToken) {
      this.accessToken = accessToken;
    }
  }
}

export type UserUpdateDto = Partial<UserDto>;
