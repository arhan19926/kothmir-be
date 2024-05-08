import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthenticationService {
  constructor(private readonly jwtService: JwtService) {}
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

  async createToken(payload: any) {
    try {
      const token = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      });
      return token;
    } catch (error) {
      throw error;
    }
  }

  async processVerifyToken(token: any) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      console.log(`payload -->`, payload);
      if (payload) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
}
