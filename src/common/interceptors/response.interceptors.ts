import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as http from 'http';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response: Response = ctx.getResponse();
    const statusCode = response.statusCode; // Get status code from the response
    const statusMessage = http.STATUS_CODES[statusCode] || 'SUCCESS';
    return next.handle().pipe(
      map((data) => {
        return {
          meta: { success: true, statusCode, statusMessage },
          data: this.transformResponse(data),
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }

  private transformResponse(data: any): any {
    if (Array.isArray(data)) {
      return data.map((item) =>
        this.replaceId(this.convertToPlainObject(item)),
      );
    } else if (typeof data === 'object' && data !== null) {
      return this.replaceId(this.convertToPlainObject(data));
    }
    return data;
  }

  private replaceId(obj: any): any {
    if (obj && obj._id) {
      // Create a new object to avoid mutating the original one
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, __v, password, ...rest } = obj;
      return { id: _id, ...rest };
    }
    return obj;
  }

  private convertToPlainObject(doc: any): any {
    if (doc && typeof doc.toObject === 'function') {
      return doc.toObject(); // Convert Mongoose document to plain object
    }
    return doc;
  }
}
