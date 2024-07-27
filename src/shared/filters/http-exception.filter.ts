import { AxiosException } from '@app/shared/filters/axios-exception.exception';
import { IResponse } from '@app/shared/interfaces';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { QueryFailedError, TypeORMError } from 'typeorm';

@Catch(HttpException, AxiosException, QueryFailedError, TypeORMError)
export class HttpExceptionFilter<T extends Error> implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    let errors: string[] = [];
    let message = 'UNKNOWN_ERROR';

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      errors = Array.isArray(exception.getResponse()['message'])
        ? [...exception.getResponse()['message']]
        : [exception.getResponse()['message']];

      message = errors[0] ?? exception.getResponse()['message'];
    } else if (exception instanceof TypeORMError) {
      status = HttpStatus.BAD_REQUEST;

      message = exception['message'];

      exception['detail']
        ? errors.push(exception['detail'])
        : errors.push('Bad request');
    } else {
      errors.push(message);
    }

    this.logger.error(exception, exception.stack, HttpExceptionFilter.name);

    response.status(status).send(<IResponse<null>>{ errors, message });
  }
}
