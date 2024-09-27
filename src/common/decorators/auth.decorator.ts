import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Response } from 'express';

export const AuthUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const response: Response = ctx.switchToHttp().getResponse();
    return response.locals.user; // extract token from request
  },
);
