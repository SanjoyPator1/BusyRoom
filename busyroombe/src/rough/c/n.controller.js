// import {db} from '../models/crud.js'
// import { Notification } from '../models/notification.model.js'

// const getNotification = async () => {
//     let query = {"seen":false}

//     let notificationData = await db.getManyNotification(Notification,query)
    

//     return notificationData
// }

// const updateNotificationSeen = async (id) => {
//     //console.log("update notification controller")
//     const not_id = id
//     const filter = {_id: not_id}
//     const query =  {seen: true}
//     const updateN =  db.updateOne(Notification,filter,query)

//     //console.log("updated Notification - ",updateN)

//     return updateN

// }

// export const controllers = {
//     getNotification: getNotification,
//     updateNotificationSeen: updateNotificationSeen
// }
// export default controllers
