import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Chef! Welcome to Kothmir.Please Login like a normal person and proceed to our Application.';
  }
}
