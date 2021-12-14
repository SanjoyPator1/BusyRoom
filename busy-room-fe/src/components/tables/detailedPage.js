import React from 'react';
import {useLocation} from 'react-router-dom';
import './detailedPage.css'

import CenteredTree from '../tree/CenteredTree'

//convert utc to normal time zone
const utcToTime = (date) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    const intDate = parseInt(date)*1000;
    const d = new Date(intDate);
    const res = d.toLocaleString("en-US", options);
    return res
}

const DetailedPage = () => {

    const data1 = useLocation();
    const data = data1.state
    console.log("data - ",data)
    //date
    // var options = { year: 'numeric', month: 'long', day: 'numeric' };
    // let startDate1 = new Date(data.state.reportingPeriodStart);
    // let endDate1 = new Date(data.state.reportingPeriodEnd);

    
    let startDate = utcToTime(data.reportingPeriodStart);
    let endDate = utcToTime(data.reportingPeriodStart);


  return (
    <div className="detailPage">
        <div className="card">
        <div className="card-body">
                <div className="flex-container">
                    <div className="flex-child">
                        <div className="left">
                            <div className="spdp">
                                <div className="sp">
                                    Supplied Products
                                </div>
                                <div className="dp">
                                    /  Detailed Page
                                </div>
                            </div>
                            <div className="cnd">
                                {data.company_name}
                            </div>
                            <div className="pnd">
                                {data.productNameCompany}
                            </div>
                            <div className="date">
                                {startDate} - 
                                {endDate}
                            </div>
                        </div>
                        
                        
                        
                    </div>
                    <div className="flex-child">
                        <div className="tf">
                                    TOTAL FOOTPRINT
                        </div>
                        <div className="co2kg">
                            <div className="co2">
                                {data.pcf}
                            </div>
                            <div className="kg">
                                {data.pcfUnit}
                                {"   "}  
                                {data.category}
                            </div>
                            
                        </div>
                        <div className="su">
                            {"Based on "}
                            {data.standardsUsed}
                            {" calculation"}
                        </div>
                        
                        <div className="comment">
                            Yikes! That’s the entire generation of elephants 🐘. 
                            Let’s do our part and save them.
                        </div>

                    </div>
                </div>
        </div> 
        </div>

        <div className="chart">
            <CenteredTree/>
        </div>

    </div>

    
    
  );
}

export default DetailedPage;