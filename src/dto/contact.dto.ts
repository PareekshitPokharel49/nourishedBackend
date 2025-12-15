import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ContactDto {
  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name must be a string' })
  @MinLength(2, { message: 'First name must be at least 2 characters long' })
  @MaxLength(50, { message: 'First name must not exceed 50 characters' })
  firstname: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name must be a string' })
  @MinLength(2, { message: 'Last name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
  lastname: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Mobile number is required' })
  @IsString({ message: 'Mobile number must be a string' })
  @MinLength(10, { message: 'Mobile number must be at least 10 characters long' })
  @MaxLength(15, { message: 'Mobile number must not exceed 15 characters' })
  mobile: string;

  @IsNotEmpty({ message: 'Message is required' })
  @IsString({ message: 'Message must be a string' })
  @MinLength(10, { message: 'Message must be at least 10 characters long' })
  @MaxLength(1000, { message: 'Message must not exceed 1000 characters' })
  message: string;
}
