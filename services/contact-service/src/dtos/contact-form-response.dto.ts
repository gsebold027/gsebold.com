import { ApiProperty } from '@nestjs/swagger';

export class ContactFormSuccessResponseDto {
  @ApiProperty({
    description: 'Indicates if the operation was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Success message',
    example: 'Contact form sent successfully',
  })
  message: string;

  @ApiProperty({
    description: 'Additional data from the email service',
    example: { emailId: 'abc123', timestamp: '2024-01-01T00:00:00Z' },
    required: false,
  })
  data?: any;
}

export class ContactFormErrorResponseDto {
  @ApiProperty({
    description: 'Indicates if the operation was successful',
    example: false,
  })
  success: boolean;

  @ApiProperty({
    description: 'Error message',
    example: 'Failed to send contact form',
  })
  message: string;

  @ApiProperty({
    description: 'Detailed error information',
    example: 'SMTP connection failed',
    required: false,
  })
  error?: string;
}
