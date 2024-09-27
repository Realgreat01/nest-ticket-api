import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/common/schemas/user.schema';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Ticket } from 'src/common/schemas/ticket.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(Ticket.name) private TicketModel: Model<Ticket>,
  ) {}

  getUsers() {
    return this.UserModel.find();
  }

  getUserById(userId: string) {
    return this.UserModel.findById(userId);
  }
  getUserByUsername(username: string) {
    return this.UserModel.findOne({ username });
  }

  updateUser(userId: string, data: UpdateUserDTO) {
    return this.UserModel.findByIdAndUpdate(userId, data, { new: true });
  }

  deleteUser(userId: string) {
    this.TicketModel.deleteMany({ created_by: userId });
    return this.UserModel.findByIdAndDelete(userId);
  }
}
