import { Body, Controller, Post, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from '../dto/contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async submitContactForm(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    contactDto: ContactDto,
  ) {
    return await this.contactService.sendContactEmail(contactDto);
  }
}
