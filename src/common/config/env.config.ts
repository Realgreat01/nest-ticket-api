import { Injectable } from '@nestjs/common';

@Injectable({})
export class EnvConfig {
  public static MONGO_URI = 'MONGO_URI';
  public static JWT_SECRET = 'JWT_SECRET';
}
