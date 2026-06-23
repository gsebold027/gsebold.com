import { ContactFormResponseData } from '@gsebold/schemas';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

import { ContactFormDto } from '@/dtos/contact-form.dto';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly resend: Resend;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.getOrThrow<string>('RESEND_API_KEY');
    this.resend = new Resend(apiKey);
  }

  async sendContactEmail(data: ContactFormDto): Promise<ContactFormResponseData> {
    try {
      const recipientEmail = this.configService.getOrThrow<string>('CONTACT_EMAIL');
      const fromDomain = this.configService.getOrThrow<string>('FROM_DOMAIN');

      const { data: result, error } = await this.resend.emails.send({
        from: `Contact Form <noreply@${fromDomain}>`,
        to: [recipientEmail],
        subject: `Contact Form: ${data.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #007cba; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>

            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 10px 0;">
                <strong>Name:</strong> ${data.name}
              </p>
              <p style="margin: 10px 0;">
                <strong>Email:</strong>
                <a href="mailto:${data.email}" style="color: #007cba;">${data.email}</a>
              </p>
              <p style="margin: 10px 0;">
                <strong>Subject:</strong> ${data.subject}
              </p>
            </div>

            <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #007cba; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Message:</h3>
              <p style="line-height: 1.6; color: #555;">
                ${data.message.replace(/\n/g, '<br>')}
              </p>
            </div>

            <hr style="border: none; height: 1px; background-color: #eee; margin: 30px 0;">

            <p style="font-size: 12px; color: #666; text-align: center;">
              This email was sent from the contact form on gsebold.com
            </p>
          </div>
        `,
        text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
This email was sent from the contact form on gsebold.com
        `,
      });

      if (error || !result) {
        this.logger.error('Resend API error:', error);
        throw new Error(`Failed to send email: ${error?.message ?? 'no data returned'}`);
      }

      this.logger.log(`Contact email sent successfully. ID: ${result.id}`);

      return {
        emailId: result.id,
      };
    } catch (error) {
      this.logger.error('Email sending error:', error);

      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

      throw new Error(`Email service failed: ${errorMessage}`);
    }
  }
}
