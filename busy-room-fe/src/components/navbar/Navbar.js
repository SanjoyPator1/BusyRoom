import React from "react";
import './Navbar.css'
import logo from '../assests/logo-door.png'
import {NotificationsNone} from '@material-ui/icons';

// import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import profile from '../assests/profile.png'

import './Popup.css'
import { useState } from "react";


import configData from "../../config.json";


    const diffToast = (cname) => {
        if(cname !== null){
            toast.info("Update required for "+cname)
        }
        else{
            toast.info("Take a break! \n There are currently no new notification.")
        }
    }


const Navbar = () => {
    // const [notificationList, setNotificationList] = useState([]);
    // const [buttonPopup, setButtonPopup] = useState(false);
    const [newNotificationData, setNewNotificationData] = useState("hidden");

    const getNLIST = async () => {

        //GET request for the new incoming data
        const params = {
                        crossDomain:true,
                        method: 'GET',
                        headers: {
                        'Origin': '*'
                        }
                        
                        }
         const url_notify_list = configData.API_BACKEND+`/api/notifications`
                
         const res = await fetch(url_notify_list, params)
         const data = await res.json()
         //console.log("New notification list is ",data)
         const props = data
         setNewNotificationData("hidden")
        //  setNotificationList(props)
        //  setButtonPopup(true)

        console.log("notification raw data is ",data.length)
         //show alert
         if(data.length!==0){
             data.map((item)=>{
                diffToast(item.companyName);
             })
         }else{
            diffToast(null);
         }

         //PUT request to notification table - update seen to true from false using _id
         props.map(async(item)=>{
            const params1 = {
                crossDomain:true,
                method: 'PUT',
                headers: {
                'Origin': '*'
                }
                
            }
            //console.log("changing seen to true")
             const _id = item._id
             const res = await fetch(configData.API_BACKEND+`/api/notifications/${_id}`,params1)
            //const data = await res.json()
           // console.log("New notification list is ",data)
         })
    }

    const notifyStyle = {
        visibility : newNotificationData,
    };

    //notification - alert
    var myWebSocket = new WebSocket("ws://localhost:9000");
    // var myWebSocket = new WebSocket("ws://35.244.38.224:9000");
     myWebSocket.onmessage = function(evt) {
        // Msg.info("A spanner has been updated. Please refresh the page to see changes.");
        setNewNotificationData(evt.data)
        // console.log("hello");
    };

    return(
        <div className='navbar'>
            <div className="navbarWrapper">
                <div className="navLeft">
                    <div className='logo'>
                    <img alt="company logo" src={logo} style={{height:'25px'}}/>
                    </div >
                    <h5 className='text'>Busy Door</h5>
                </div>
                <div className="navRight">
                    <div className='navbarIconContainer' onClick={getNLIST} >
                     <NotificationsNone />
                     <ToastContainer />
                     <div style={notifyStyle} className='navbarIconBadge' />
                    </div>
                    <img src={profile} alt='' className='topAvatar' style={{height:'30px', width:'30px'}}/>
                </div>
        </div>

        </div>
    )
}

export default Navbar;