import {
  Body,
  Controller,
  Delete,
  Get,
  //   HttpException,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { AuthenticateUser } from 'src/common/middleware/auth.middleware';
import { IRequest } from 'src/common/types';

@ApiBearerAuth()
@ApiTags('User')
@Controller('users')
@UseGuards(AuthenticateUser)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'get all users',
  })
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get('user')
  @ApiOperation({ summary: 'get user by username' })
  async getUser(@Request() req: IRequest) {
    return this.userService.getUserById(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'get user by id' })
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get(':username')
  @ApiOperation({ summary: 'get user by username' })
  async getUserByUsername(@Param('username') username: string) {
    return this.userService.getUserByUsername(username);
  }

  @Patch()
  @ApiOperation({
    summary: 'update current user',
  })
  updateUser(@Request() req: IRequest, @Body() data: UpdateUserDTO) {
    return this.userService.updateUser(req.user.id, data);
  }

  @Delete()
  @ApiOperation({
    summary: 'delete current user and tickets created by the user',
  })
  @ApiOkResponse({
    description: 'user deleted successfully',
    type: 'application/json',
  })
  deleteUser(@Request() req: IRequest) {
    return this.userService.deleteUser(req.user.id);
  }
}
