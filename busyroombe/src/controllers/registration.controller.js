import {db} from '../models/crud.js'
import { User } from '../models/user.model.js'
import genUsername from "unique-username-generator";


//createUser
const createUser =  async (email,pass,fname,lname) => {
    console.log("email "+email+" pass "+pass)

    let em = "U0"+ email;
    let ems = em.substring(0, 5);

    // add three random digits
    const proposedUserName = genUsername.generateFromEmail(
        ems,
        3
    );

    const userName = proposedUserName
    console.log("Uniquely generated userName is "+userName);

    const doc = {
        userEmail : email,
        password : pass,
        firstName : fname,
        lastName : lname,
        userName:userName
    }
    const res = await db.createOne(User, doc)

    return res

}


export const controllers = {
    createUser: createUser
}
export default controllers