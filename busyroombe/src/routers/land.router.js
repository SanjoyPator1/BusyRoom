import { Router } from 'express'
import controllers from '../controllers/land.controller.js'


const router = Router()

// /api/land/
router
  .route('/')
  .post(async (req, res) => {
    const result = await controllers.createLand(req.body.userName,req.body.title,req.body.noRooms)

    if(!result){
      res.status(400).send({
          message: 'This is an error!'
       });
  }else{
      res.json(result)
  }

  })

  export default router