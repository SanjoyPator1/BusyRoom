import { Router } from 'express'
import controllers from '../controllers/dashboardController.js'

const router = Router()

router
  .route('/')
  .get(async (req, res) => {
    const result = await controllers.getItems()

    if(!result){
      res.status(400).send({
          message: 'This is an error!'
       });
  }else{
      res.json(result)
  }

  })

// /api/item/:id
router
  .route('/:id')
  .put(async (req, res) => {
    const result = await controllers.accept(req.params.id)

    if(!result){
      res.status(400).send({
          message: 'This is an error!'
       });
  }else{
      res.json(result)
  }
  })

  router
  .route('/:id')
  .delete(async (req, res) => {
    const result = await controllers.reject(req.params.id, req.body.feedback)

    if(!result){
      res.status(400).send({
          message: 'This is an error!'
       });
  }else{
      res.json(result)
  }
  })


export default router