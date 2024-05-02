import { HEADER_PROPERTIES } from '../../utils/constants/common.constant';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  constructor(
    private logger: Logger,
    private reflector: Reflector,
  ) {}
  shouldLogBody(context: ExecutionContext): boolean {
    const isLogRequestBody = this.reflector.get<boolean>(
      'logRequestBody',
      context.getHandler(),
    );
    return isLogRequestBody === true;
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, headers, params, body } = request;
    const userAgent = headers[HEADER_PROPERTIES.USER_AGENT] || '';
    const IP = headers[HEADER_PROPERTIES.X_FORWARDED_FOR] || '';

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          ` HTTP Method: ${method}, URL: ${request.protocol}://${request.get(
            'host',
          )}${url}, User-Agent: ${userAgent},IP:${IP}, queryString: ${JSON.stringify(params)}` +
            (this.shouldLogBody(context)
              ? `, postBody: ${JSON.stringify(body)}`
              : '') +
            `,endpoint:${url}`,
        );
      }),
      catchError((error) => {
        this.logger.error(
          `Error occurred during request processing: ${error.message}`,
        );
        return throwError(() => error);
      }),
    );
  }
}
