import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import Ticket from '../tickets/entity'
import User from '../users/entity'
import { MaxLength } from '../../node_modules/class-validator';

@Entity()
export default class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @MaxLength(200)
  @Column('text')
  text: string

  @ManyToOne(_ => User, user => user.comments, {eager: true})
  user: User | undefined

  @ManyToOne(_ => Ticket, ticket => ticket.comments)
  ticket: Ticket | undefined

}