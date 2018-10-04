import { JsonController, Get, Param, Post, HttpCode, Authorized, BodyParam, Put, Body, NotFoundError } from 'routing-controllers'
import EventEntity from './entity';


@JsonController()
export default class EventController {
    
  @Get('/events/:id')
  getEvent(
      @Param('id') id: number
  ) {
      return EventEntity.findOne(id)
  }


  @Get('/events')
  async getAllEvents () {
    const events = await EventEntity.find()


    return { events }
  }

  @Authorized()
  @Post('/events')
  @HttpCode(201)
  createEvent(
    @BodyParam("name") name: string,
    @BodyParam("imageURL") imageURL: string,
    @BodyParam("description") description: string,
    @BodyParam("startDate") startDate: Date,
    @BodyParam("endDate") endDate: Date
  ) {

    const newEvent = new EventEntity
    newEvent.name = name
    newEvent.imageURL = imageURL
    newEvent.description = description
    newEvent.startDate = startDate
    newEvent.endDate = endDate
    newEvent.tickets = []

    return newEvent.save()
  }

    @Authorized()
    @Put('/events/:id')
    async updateEvent(
      @Param('id') id: number,
      @Body() update: Partial<EventEntity>
    ) {
      const event = await EventEntity.findOne(id)
      if(!event) throw new NotFoundError('The event you are looking for does not exist')

      return EventEntity.merge(event, update).save()
    }

}
