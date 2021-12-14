import WebSocket, { WebSocketServer } from 'ws';

//import routers
import registrationRouter from './src/routers/registration.router.js'
import landRouter from './src/routers/land.router.js'
import roomRouter from './src/routers/room.router.js'


import {db} from './src/models/crud.js'

import { connect } from './src/models/db.js'
export const app = express()

import express from 'express'
import cors from 'cors'

const wss = new WebSocketServer({ port: 9000 });

app.use(cors());
app.options('*', cors());

app.use(express.json());

//route - createUser - POST 
app.use('/api/registration', registrationRouter)

//route - land - POST 
app.use('/api/land', landRouter)

//route - room - POST 
app.use('/api/room', roomRouter)

//routes now - GET request for all data
// app.use('/api/items', dashboardRouter)

// // app.get('/', (req, res) => res.send('Hello World!'));

// //post to pfm
// app.use('/api/pfm',pfmRouter)

// //post to feedback
// app.use('/api/feedback',feedbackRouter)

// //get notification list
// app.use('/api/notifications',notificationRouter)

// app.post('/notify/spanner/:spanner_id/update', async (req, res) => {
//   let spanner_id = req.params.spanner_id
//   console.log('Event: spanner %s updated', spanner_id)
//   let notification_body = req.body

//   //console.log("notification data entry to table")
//   notification_body = await db.createOne(Notification, notification_body)

//   wss.clients.forEach( (client) => {
//     client.send("visible")
//   })
//   res.sendStatus(200);
// })

try {
      await connect()
      const port = 3006
      app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
      })
    } catch (e) {
      console.error(e)
    }

