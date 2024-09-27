import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    /**
     * @description Exception json response
     * @param message
     */

    const responseMessage = (
      type: string,
      message: string | any,
      error: any,
    ) => {
      response.status(status).json({
        meta: {
          success: false,
          statusCode: status,
          statusMessage: type,
        },
        error: { path: request.url, message, error },
        timestamp: new Date().toISOString(),
      });
    };

    // Throw an exceptions for either
    // MongoError, ValidationError, TypeError, CastError and Error
    if (exception.message['error']) {
      responseMessage(
        'Error',
        exception.message,
        exception.getResponse().toString(),
      );
    } else if (exception.message.includes('E11000 ')) {
      const values = Object.keys(exception['keyValue']);
      const message = values[0].replaceAll('_', ' ') + ' already exists';
      responseMessage(exception.name, message, message);
    } else if (typeof exception.getResponse === 'function') {
      const { message, error }: any = exception.getResponse();
      responseMessage(
        error ?? exception.name,
        exception.message,
        message ?? exception.message,
      );
    } else {
      responseMessage(exception.name, exception.message, exception.message);
    }
  }
}
