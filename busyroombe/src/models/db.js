import mongoose from 'mongoose'

export const connect = () => {
  return mongoose.connect(
    'mongodb+srv://sanjoy:dps123@cluster0.sbvnk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  )
}
