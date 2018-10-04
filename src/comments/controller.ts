import { JsonController, Get, Param, Authorized, Put, Body, NotFoundError, Post, HttpCode, BodyParam } from 'routing-controllers'
import CommentEntity from './entity';
import Ticket from '../tickets/entity';
import User from '../users/entity';


@JsonController()
export default class TicketController {

    
    @Get('/comments/:id')
    getComment(
        @Param('id') id: number
    ) {
        return CommentEntity.findOne(id)
    }


    @Get('/comments')
    async getAllComments () {
      const comments = await CommentEntity.find()
      return { comments }
    }

    @Authorized()
    @Put('/comments/:id')
    async updateComment(
      @Param('id') id: number,
      @Body() update: Partial<CommentEntity>
    ) {
      const comment = await CommentEntity.findOne(id)
      if(!comment) throw new NotFoundError('The comment you are looking for does not exist')

      return CommentEntity.merge(comment, update).save()
    }

    @Authorized()
    @Post('/comments')
    @HttpCode(201)
    async createComment(
      @BodyParam("text") text: string,
      @BodyParam("ticketId") ticketId: number,
      @BodyParam("userId") userId: number
    ) {
        const newComment = new CommentEntity
        newComment.text = text
        newComment.ticket = await Ticket.findOne(ticketId)
        newComment.user = await User.findOne(userId)

        return newComment.save()
    }
}
