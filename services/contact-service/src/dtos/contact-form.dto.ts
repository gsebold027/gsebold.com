import { CONTACT_CONSTRAINTS as C, ContactFormFields } from '@gsebold/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ContactFormDto implements ContactFormFields {
  @ApiProperty({
    description: 'Full name of the person sending the contact form',
    example: 'Michael Davis',
    maxLength: C.name.max,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(C.name.min)
  @MaxLength(C.name.max)
  name: string;

  @ApiProperty({
    description: 'Email address of the person sending the contact form',
    example: 'michael.davis@example.com',
    format: 'email',
  })
  @IsNotEmpty()
  @IsEmail()
  @MinLength(C.email.min)
  @MaxLength(C.email.max)
  email: string;

  @ApiProperty({
    description: 'Subject line of the contact message',
    example: 'Website development project',
    maxLength: C.subject.max,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(C.subject.min)
  @MaxLength(C.subject.max)
  subject: string;

  @ApiProperty({
    description: 'The main content of the contact message',
    example:
      "Hi Gustavo, I'm interested in developing a new React application for my business. Could we schedule a call to discuss the requirements?",
    maxLength: C.message.max,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(C.message.min)
  @MaxLength(C.message.max)
  message: string;
}
