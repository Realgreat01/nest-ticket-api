import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export class CreateTicketDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(Priority)
  priority: 'low' | 'medium' | 'high';

  @IsString()
  @IsDateString()
  @IsNotEmpty()
  expiry_date: string;
}
