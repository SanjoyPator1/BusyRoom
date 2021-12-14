import React from 'react';

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5
        }}
    />
);


const NList = ({cname,pname}) => {
    return(
        <div  className='box1'>
            <p className="text1"> Update Required </p>
            <p className="text1" >{cname}</p>
            {/* <p className="text2">{pname}</p> */}
        </div>
    );
}

export default NList;