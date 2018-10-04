import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import * as bcrypt from 'bcrypt'
import { IsEmail, IsString, MinLength, Length } from '../../node_modules/class-validator';
import { Exclude } from '../../node_modules/class-transformer'
import CommentEntity from '../comments/entity'
import Ticket from '../tickets/entity'

@Entity()
export default class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number
  
  @IsString()
  @Length(3,20)
  @Column('text', {nullable:false, unique: true})
  username: string

  @IsEmail()
  @Column('text', {nullable:false})
  email: string

  @IsString()
  @MinLength(8)
  @Column('text', {nullable:false})
  @Exclude({ toPlainOnly: true })
  password: string

  @OneToMany(_ => Ticket, ticket => ticket.user)
  tickets: Ticket[]

  @OneToMany(_ => CommentEntity, comment => comment.user)
  comments: CommentEntity[]


  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10)
    this.password = hash
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }
}
