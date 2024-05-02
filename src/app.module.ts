import { HttpLoggingInterceptor } from './../utils/helpers/request-logging.middleware';
import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [AuthenticationModule],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpLoggingInterceptor,
    },
  ],
})
export class AppModule {}
