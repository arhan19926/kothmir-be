import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthenticationService {
  async processGoogleLogin(req: Request) {
    try {
      if (!req.user) {
        return 'No user from google';
      }
      return {
        message: 'User information from google',
        user: req.user,
      };
    } catch (error) {
      throw error;
    }
  }
}
