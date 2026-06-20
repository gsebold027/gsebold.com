import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ContactFormDto {
  @ApiProperty({
    description: 'Full name of the person sending the contact form',
    example: 'Michael Davis',
    maxLength: 50,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'Email address of the person sending the contact form',
    example: 'michael.davis@example.com',
    format: 'email',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Subject line of the contact message',
    example: 'Website development project',
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  subject: string;

  @ApiProperty({
    description: 'The main content of the contact message',
    example:
      "Hi Gustavo, I'm interested in developing a new React application for my business. Could we schedule a call to discuss the requirements?",
    maxLength: 600,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(600)
  message: string;
}
