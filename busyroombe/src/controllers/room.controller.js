import {db} from '../models/crud.js'
import { Room } from '../models/room.model.js'
import genUsername from "unique-username-generator";


//create Room - CONTROLLER
const createRoom =  async (userName,land_id) => {
    console.log("room created by username "+userName+ " for "+land_id)

    let em = "R0"+ userName+land_id

    // add three random digits
    const proposedRoomId = genUsername.generateFromEmail(
        em,
        4
    );

    console.log("Uniquely generated room Id is "+proposedRoomId);

    const doc = {
        sup_userName : userName,
        land_id : land_id,
        room_id : proposedRoomId
    }
    const res = await db.createOne(Room, doc)

    return res

}

//update room BASIC details
const updateRoom =  async (room_id,sub_userName,room_no) => {

    const filter = {room_id: room_id}
    const query =  {
        sub_userName: sub_userName,
        room_no: room_no
    }
    const updateN =  db.updateOne(Room,filter,query)
    return updateN
}

//UPDATE BUSY - NOT BUSY DETAILS

export const controllers = {
    createRoom: createRoom,
    updateRoom: updateRoom
}
export default controllers