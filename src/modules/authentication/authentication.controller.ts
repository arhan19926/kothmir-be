import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ApiResponse } from '@app/utils/helpers/response-context.helper';
import { STATUS_CODES } from '@app/utils/constants/status-codes.constant';
import { OAuth2Client } from 'google-auth-library';
import { Request, Response } from 'express';

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_SECRET;
const redirectUrl = process.env.CALLBACK_URL;
const client = new OAuth2Client(clientId, clientSecret, redirectUrl);

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/google/redirect')
  async googleLoginCallback(
    @Body() body: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: body.accessToken,
        audience: clientId,
      });

      const payload = ticket.getPayload();

      if (Object.entries(payload).length) {
        const oneHourFromNow = new Date();
        oneHourFromNow.setHours(oneHourFromNow.getHours() + 1);

        const jwtToken = await this.authenticationService.createToken(payload);

        res.cookie('session', jwtToken, {
          expires: oneHourFromNow,
          sameSite: 'none',
          secure: process.env.ENV == 'dev' ? false : true,
          httpOnly: process.env.ENV == 'dev' ? false : true,
          path: '/',
        });
      }
      return new ApiResponse(
        { message: `Logged In Successfully` },
        null,
        STATUS_CODES.OK,
      );
    } catch (error) {
      throw error;
    }
  }

  @Get('/validateUser')
  async verifyToken(@Req() req: Request) {
    try {
      const sessionToken = req.cookies['session'];
      const isValid =
        await this.authenticationService.processVerifyToken(sessionToken);
      if (isValid) {
        return new ApiResponse(
          { message: `User Validation Successfull` },
          null,
          STATUS_CODES.OK,
        );
      }
    } catch (error) {
      throw error;
    }
  }
}
