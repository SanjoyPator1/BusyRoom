import {db} from '../models/crud.js'
import { Land } from '../models/land.model.js'
import genUsername from "unique-username-generator";


//createLand - route
const createLand =  async (userName,title,noRooms) => {
    console.log("username "+userName+" noRooms "+noRooms)

    let em = "L0"+title

    // add three random digits
    const proposedLandId = genUsername.generateFromEmail(
        em,
        4
    );

    console.log("Uniquely generated Land Id is "+proposedLandId);

    const doc = {
        title:title,
        sup_userName : userName,
        no_rooms: noRooms,
        land_id : proposedLandId
    }
    const res = await db.createOne(Land, doc)

    return res

}


export const controllers = {
    createLand: createLand
}
export default controllers