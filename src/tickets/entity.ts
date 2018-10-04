import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Timestamp } from 'typeorm'
import EventEntity from '../events/entity'
import CommentEntity from '../comments/entity'
import User from '../users/entity'


@Entity()
export default class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable:true})
  imageURL: string

  @Column({nullable:false})
  price: number

  @Column('text', {nullable:false})
  description: string

  @Column('timestamp', {nullable:false})
  createdAt: Timestamp

  @ManyToOne(_ => EventEntity, event => event.tickets)
  event: EventEntity | undefined

  @ManyToOne(_ => User, user => user.tickets, {eager:true})
  user: User | undefined

  @OneToMany(_ => CommentEntity, comment => comment.ticket, {eager:true})
  comments: CommentEntity[]

}
