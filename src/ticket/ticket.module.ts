import { Ticket, TicketSchema } from '../common/schemas/ticket.schema';
import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { MongooseModule } from '@nestjs/mongoose';
// import { AuthenticateUser } from 'src/common/middleware/auth.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
  ],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(AuthenticateUser).forRoutes(TicketController);
  // }
}
