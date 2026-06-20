import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './controllers/app.controller';
import { EmailController } from './controllers/email.controller';
import { EmailService } from './services/email.service';
import { validateEnvironment } from './config/environment.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnvironment,
      envFilePath: ['.env.local', '.env'],
    }),
  ],
  controllers: [AppController, EmailController],
  providers: [EmailService],
})
export class AppModule {}
