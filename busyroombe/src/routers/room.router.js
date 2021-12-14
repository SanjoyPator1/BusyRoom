import { Router } from 'express'
import controllers from '../controllers/room.controller.js'


const router = Router()

//CREATE ROOM INITIALLY
// /api/room/
router
  .route('/')
  .post(async (req, res) => {
    const result = await controllers.createRoom(req.body.userName,req.body.land_id)

    if(!result){
      res.status(400).send({
          message: 'This is an error!'
       });
  }else{
      res.json(result)
  }

  })

//UPDATE BASIC DETAILS OF ROOM
// /api/room/detail
router
  .route('/detail')
  .put(async (req, res) => {
    const result = await controllers.updateRoom(req.body.room_id,req.body.sub_userName,req.body.room_no)

    if(!result){
      res.status(400).send({
          message: 'This is an error!'
       });
  }else{
      res.json(result)
  }

})

//UPDATE BUSY - NOT BUSY DETAILS



  export default router