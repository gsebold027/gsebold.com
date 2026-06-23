import {
  ContactFormErrorResponseDto,
  ContactFormSuccessResponseDto,
} from '@/dtos/contact-form-response.dto';
import { ContactFormDto } from '@/dtos/contact-form.dto';
import { EmailService } from '@/services/email.service';
import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('contactMe')
  @ApiOperation({
    summary: 'Send contact form email',
    description: 'Receives contact form data and sends an email using Resend service',
  })
  @ApiResponse({
    status: 201,
    description: 'Contact form sent successfully',
    type: ContactFormSuccessResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: 500,
    description: 'Failed to send contact form',
    type: ContactFormErrorResponseDto,
  })
  async sendContactForm(
    @Body() contactData: ContactFormDto,
  ): Promise<ContactFormSuccessResponseDto> {
    try {
      const result = await this.emailService.sendContactEmail(contactData);

      return {
        success: true,
        message: 'Contact form sent successfully',
        timestamp: new Date().toISOString(),
        data: result,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

      throw new HttpException(
        {
          success: false,
          message: 'Failed to send contact form',
          timestamp: new Date().toISOString(),
          error: errorMessage,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
