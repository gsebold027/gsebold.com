import { ApiErrorResponse, ApiSuccessResponse, ContactFormResponseData } from '@gsebold/schemas';
import { ApiProperty } from '@nestjs/swagger';

export class ContactFormSuccessResponseDto implements ApiSuccessResponse<ContactFormResponseData> {
  @ApiProperty({ example: true })
  success = true as const;

  @ApiProperty({ example: 'Contact form sent successfully' })
  message: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  timestamp: string;

  @ApiProperty({ example: { emailId: 'abc123' } })
  data: ContactFormResponseData;
}

export class ContactFormErrorResponseDto implements ApiErrorResponse {
  @ApiProperty({ example: false })
  success = false as const;

  @ApiProperty({ example: 'Failed to send contact form' })
  message: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  timestamp: string;

  @ApiProperty({ example: 'SMTP connection failed' })
  error: string;
}
