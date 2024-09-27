import {
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @MinLength(3)
  @IsOptional()
  firstname: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  lastname: string;

  @IsPhoneNumber()
  @IsOptional()
  phone_number: string;

  @IsString()
  @MinLength(20)
  @IsOptional()
  about: string;
}
