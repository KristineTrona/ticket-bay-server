import 'reflect-metadata'
import {createKoaServer, Action, BadRequestError} from "routing-controllers"
import setupDb from './db'
import { verify } from './jwt'
import UserController from './users/controller'
import EventController from './events/controller'
import TicketController from './tickets/controller'
import CommentController from './comments/controller'
import LoginController from './logins/controller';

const port = process.env.PORT || 4000

const app = createKoaServer({
  cors: true,
  controllers: [
      UserController,
      LoginController,
      EventController,
      TicketController,
      CommentController
   ],
   authorizationChecker: (action: Action) => {
     const header: string = action.request.headers.authorization

     if(header && header.startsWith('Bearer ')){
       const [ , token ] = header.split(' ')
       
       try {
        return !!(token && verify(token))
      }
      catch (e) {
        throw new BadRequestError(e)
      }
     }
       return false
   }
})

setupDb()
.then(_ =>
app.listen(port, () => console.log(`Listening on port ${port}`))
)
.catch(err => console.error(err))
