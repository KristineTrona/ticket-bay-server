import { JsonController, Get, Param, Authorized, Put, Body, NotFoundError, Post, HttpCode, BodyParam } from 'routing-controllers'
import Ticket from './entity'
import { Timestamp } from '../../node_modules/typeorm';
import EventEntity from '../events/entity'
import User from '../users/entity'


@JsonController()
export default class TicketController {
    
  @Get('/tickets/:id')
  getTicket(
      @Param('id') id: number
  ) { 
      return Ticket.findOne(id)
  }

  @Get('/tickets')
  async getAllTickets () {
    const tickets = await Ticket.find()
    return { tickets }
  }

  @Authorized()
  @Put('/tickets/:id')
  async updateTicket(
    @Param('id') id: number,
    @Body() update: Partial<Ticket>
  ) {
    const ticket = await Ticket.findOne(id)
    if(!ticket) throw new NotFoundError('The ticket you are looking for does not exist')
    return Ticket.merge(ticket, update).save()
  }

  @Authorized()
  @Post('/tickets')
  @HttpCode(201)
  async createTicket(
    @BodyParam("eventId") eventId: number,
    @BodyParam("userId") userId: number,
    @BodyParam("createdAt") createdAt: Timestamp,
    @BodyParam("price") price: number,
    @BodyParam("imageURL") imageURL: string,
    @BodyParam("description") description: string
  ) {

    const newTicket = new Ticket

    newTicket.user = await User.findOne(userId)
    newTicket.event = await EventEntity.findOne(eventId)
    newTicket.createdAt = createdAt
    newTicket.price = price
    newTicket.imageURL = imageURL
    newTicket.description = description

    return newTicket.save()
  }
}