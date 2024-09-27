import mongoose from 'mongoose';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDTO } from './dto/create-ticket.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticateUser } from 'src/common/middleware/auth.middleware';
import { IRequest } from 'src/common/types';

@Controller('tickets')
@UseGuards(AuthenticateUser)
@ApiTags('Ticket')
@ApiBearerAuth()
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Post()
  @ApiOperation({
    summary: 'create new ticket by user',
  })
  async createTickets(
    @Body() createUserDTO: CreateTicketDTO,
    @Request() req: IRequest,
  ) {
    return await this.ticketService.createTicket(req.user.id, createUserDTO);
  }

  @Get()
  @ApiOperation({
    summary: 'get all tickets',
  })
  async getTickets() {
    return await this.ticketService.getTickets();
  }

  @Get('user')
  @ApiOperation({
    summary: 'get all tickets created by user',
  })
  async getUserTickets(@Request() req: IRequest) {
    return await this.ticketService.getUserTickets(req.user.id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'get ticket by tickedId',
  })
  async getTicket(@Param('id') id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new NotFoundException('Ticket does not exist');

    const ticket = await this.ticketService.getTicket(id);
    if (!ticket) throw new NotFoundException('Ticket does not exist');

    return ticket;
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'update ticket by created user',
  })
  async updateTicket(
    @Param('id') id: string,
    @Request() req: IRequest,
    @Body() updateTicketDto: CreateTicketDTO,
  ) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new NotFoundException('Ticket does not exist');
    console.log({ user: req.user });
    const ticket = await this.ticketService.updateTicket(
      id,
      req.user.id,
      updateTicketDto,
    );
    if (!ticket) throw new NotFoundException('Ticket does not exist');
    return ticket;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'delete ticket created by user',
  })
  async deleteTicket(@Param('id') id: string, @Request() req: IRequest) {
    return await this.ticketService.deleteTicket(id, req.user.id);
  }
}
