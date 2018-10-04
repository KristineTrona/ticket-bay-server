import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { IsString, MinLength, IsDate } from '../../node_modules/class-validator';
import Ticket from '../tickets/entity'

@Entity()
export default class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @MinLength(2)
  @Column('text', {nullable:false})
  name: string

  @Column('text')
  imageURL: string

  @IsDate()
  @Column('date', {nullable:false})
  startDate: Date

  @IsDate()
  @Column('date', {nullable:false})
  endDate: Date

  @IsString()
  @Column('text', {nullable: false})
  description: string

  @OneToMany(_ => Ticket, ticket => ticket.event, {eager:true})
  tickets?: Ticket[]
}
