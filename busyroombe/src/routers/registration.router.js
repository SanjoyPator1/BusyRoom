import { Router } from 'express'
import controllers from '../controllers/registration.controller.js'


const router = Router()

// /api/registration/
router
  .route('/')
  .post(async (req, res) => {
    const result = await controllers.createUser(req.body.email,req.body.pass,req.body.fname,req.body.lname)

    if(!result){
      res.status(400).send({
          message: 'This is an error!'
       });
  }else{
      res.json(result)
  }

  })

  export default router