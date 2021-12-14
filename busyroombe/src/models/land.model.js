import mongoose from 'mongoose'

const landSchema = new mongoose.Schema(
  {
      title: {
          type: String,
          required: true,
      },
      sup_userName: {
          type: String,
          required: true,
      },
      no_rooms: {
          type: Number,
          required: true,
      },
      land_id : {
        type: String,
        required: true,
        unique:true
    }
  }
);



landSchema.index({ land_id: 1})

export const Land = mongoose.model('land', landSchema)
