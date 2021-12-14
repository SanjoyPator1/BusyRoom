import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema(
  {
    sup_userName: {
      type: String,
      required:true
    },
    sub_userName: [{
        type: String
    }],
    room_no: {
        type: Number,
    },
    busy: {
        type: Boolean,
    },
    busy_title : {
      type: String
    },
    slot : {
      type: Date,
    },
    land_id : {
      type : String,
      required : true
    },
    room_id : {
        type: String,
        required: true
    }
  }
);

roomSchema.index({ room_id: 1})

export const Room = mongoose.model('room', roomSchema)
