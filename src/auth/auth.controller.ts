import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginPayloadDTO } from './dto/login.dto';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'login user' })
  async loginUser(@Body() data: LoginPayloadDTO) {
    return await this.authService.loginUser(data);
  }

  @Post('register')
  @ApiOperation({ summary: 'create new user account' })
  async createUser(@Body() data: CreateUserDTO) {
    return await this.authService.register(data);
  }
}
