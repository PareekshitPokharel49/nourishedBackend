import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { ContactDto } from '../dto/contact.dto';

@Injectable()
export class ContactService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST', 'smtp.gmail.com'),
      port: this.configService.get<number>('SMTP_PORT', 587),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendContactEmail(contactDto: ContactDto): Promise<{ success: boolean; message: string }> {
    const { firstname, lastname, email, mobile, message } = contactDto;

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p><strong>Name:</strong> ${firstname} ${lastname}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mobile:</strong> ${mobile}</p>
          <p><strong>Message:</strong></p>
          <p style="background-color: white; padding: 15px; border-left: 4px solid #007bff;">
            ${message}
          </p>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          This email was sent from the contact form on your website.
        </p>
      </div>
    `;

    try {
      const info = await this.transporter.sendMail({
        from: this.configService.get<string>('SMTP_FROM', `"Contact Form" <${this.configService.get<string>('SMTP_USER')}>`),
        to: email,
        subject: `Contact Form Submission from ${firstname} ${lastname}`,
        html: emailContent,
      });

      return {
        success: true,
        message: 'Email sent successfully',
      };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new InternalServerErrorException('Failed to send email. Please try again later.');
    }
  }
}
