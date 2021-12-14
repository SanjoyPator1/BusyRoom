import React from 'react';
import style from './book.module.css'

import ToggleSwitch from "../toggle/ToggleSwitch.js";


const DoorCard = ({doorNo,user,pub_date}) => {
    return(
        <div className={style.cards}>
            <h1 className="doorNo">Door No : {doorNo}</h1>
            <p className="user">User : {user}</p>
            <h2 className="date">Publication Date : {pub_date}</h2>
            <div>
                <ToggleSwitch label="Busy" />
            </div>
        </div>
    );
}

export default DoorCard;