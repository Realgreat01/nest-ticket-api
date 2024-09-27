import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket } from '../common/schemas/ticket.schema';
import { Model } from 'mongoose';
import { CreateTicketDTO } from './dto/create-ticket.dto';

@Injectable()
export class TicketService {
  constructor(@InjectModel(Ticket.name) private TicketModel: Model<Ticket>) {}

  private populateCreatedBy = {
    path: 'created_by',
    select: 'email username firstname lastname phone_number _id:id',
  };

  async createTicket(created_by: string, createTicketDTO: CreateTicketDTO) {
    return (
      await this.TicketModel.create({ created_by, ...createTicketDTO })
    ).populate(this.populateCreatedBy.path, this.populateCreatedBy.select);
  }

  async getTickets() {
    return await this.TicketModel.find().populate(
      this.populateCreatedBy.path,
      this.populateCreatedBy.select,
    );
  }

  async getTicket(id: string) {
    return await this.TicketModel.findById(id).populate(
      this.populateCreatedBy.path,
      this.populateCreatedBy.select,
    );
  }

  async getUserTickets(userId: string) {
    return await this.TicketModel.find({ created_by: userId }).populate(
      this.populateCreatedBy.path,
      this.populateCreatedBy.select,
    );
  }

  async updateTicket(id: string, userId: string, data: any) {
    return await this.TicketModel.findOneAndUpdate(
      { _id: id, created_by: userId },
      data,
      {
        new: true,
      },
    ).populate(this.populateCreatedBy.path, this.populateCreatedBy.select);
  }

  async deleteTicket(id: string, userId: string) {
    return await this.TicketModel.findOneAndDelete({
      _id: id,
      created_by: userId,
    }).populate(this.populateCreatedBy.path, this.populateCreatedBy.select);
  }
}
