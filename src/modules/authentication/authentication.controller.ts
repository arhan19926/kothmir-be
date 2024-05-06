import { Controller, Get, Query } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ApiResponse } from '@app/utils/helpers/response-context.helper';
import { STATUS_CODES } from '@app/utils/constants/status-codes.constant';
import { OAuth2Client } from 'google-auth-library';

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_SECRET;
const redirectUrl = process.env.CALLBACK_URL;
const client = new OAuth2Client(clientId, clientSecret, redirectUrl);

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get('/')
  googleLogin() {
    const redirectURI = process.env.CALLBACK_URL;
    const scope = 'openid email profile';

    const url = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=code&scope=${scope}`;
    console.log(`url--->`, url);
    return new ApiResponse(url, null, STATUS_CODES.OK);
  }

  @Get('/google/redirect')
  async googleLoginCallback(@Query('code') code: string) {
    try {
      const { tokens } = await client.getToken({
        code,
        redirect_uri: redirectUrl,
      });

      const idToken = tokens.id_token;

      const ticket = await client.verifyIdToken({
        idToken,
        audience: clientId,
      });
      const payload = ticket.getPayload();
      return new ApiResponse(payload, null, STATUS_CODES.OK);
    } catch (error) {
      throw error;
    }
  }
}
