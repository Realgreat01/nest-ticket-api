import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/common/schemas/user.schema';
import { LoginPayloadDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { BcryptConfig } from 'src/common/utils/bcrypt.utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async loginUser(data: LoginPayloadDTO) {
    const user = await this.UserModel.findOne({ email: data.email });
    if (!user) throw new NotFoundException('Invalid Credentials');

    if (BcryptConfig.comparePassword(data.password, user.password)) {
      const token = this.jwtService.sign({
        username: user.username,
        id: user.id,
      });
      return { token, username: user.username };
    } else throw new NotFoundException('Invalid Credentials');
  }

  async register(data: CreateUserDTO) {
    const { password, ...credentials } = data;
    const hashedPassword = BcryptConfig.hashPassword(password);
    return await this.UserModel.create({
      ...credentials,
      password: hashedPassword,
    });
  }
}
