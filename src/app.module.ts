import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactController } from './contact/contact.controller';
import { ContactService } from './contact/contact.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController, ContactController],
  providers: [AppService, ContactService],
})
export class AppModule {}
