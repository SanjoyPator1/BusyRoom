import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import './Table.css'
import  { useEffect, useState } from "react";
import icons from "./DWicons.png"
import { BsSearch } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
// import { Badge, Pill } from 'evergreen-ui'

import Stack from '@mui/material/Stack';
//button
import Button from '@mui/material/Button';

import synchedLogo from '../assests/synched.svg'
import updateLogo from '../assests/update.svg'

import {useNavigate} from 'react-router-dom';

import { StylesProvider } from "@material-ui/core/styles";

import { withStyles } from "@material-ui/core/styles";
import Mypdf from "./files.pdf";

import cancel from './cancel.png'



//imports config.json for API s
import configData from "../../config.json";

import Modal from 'react-bootstrap/Modal'






//materialUi styles change
const styles = {
  root: {
    textAlign:"left",
  }
}

//convert utc to normal time zone
const utcToTime = (date) => {
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  const intDate = parseInt(date)*1000;
  const d = new Date(intDate);
  const res = d.toLocaleString("en-US", options);
  return res
}

const columns = [
  { 
    id: 'productname',
    label: 'PRODUCT NAME',
    minWidth: 170 
  },
  { id: 'supplier',
    label: 'SUPPLIER NAME',
    minWidth: 170
  },
  {
    id: 'database',
    label: 'DATABASE STATUS',
    minWidth: 240,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'footprint',
    label: 'FOOTPRINT CALCULATION METHOD',
    minWidth: 170,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'time',
    label: 'CURRENT VALID TIME PERIOD',
    minWidth: 170,
    format: (value) => value.toFixed(2),
  },
  {
    id: 'emission',
    label: 'EMISSION FACTOR',
    minWidth: 170,
    format: (value) => value.toFixed(2),
  },
  {
    id: 'quantity',
    label: 'Quantity',
    minWidth: 170,
    format: (value) => value.toFixed(2),
  },
  {
    id: 'category',
    label: 'FOOTPRINT CATEGORY',
    minWidth: 170,
    format: (value) => value.toFixed(2),
  },
  /*{
    id: 'trends',
    label: 'HISTORICAL TRENDS COMPARISON',
    minWidth: 170,
    format: (value) => value.toFixed(2),
  },*/
];

function createData(productname, supplier, database, footprint, time, emission, category, trends, pcfId,quantity) {
  return { productname, supplier, database, footprint, time, emission, category, trends, pcfId,quantity };
}


function ColumnGroupingTable({classes}) {

  const navigate = useNavigate();

  //Accept
  const [openModal, setOpenModal] = useState(false);


  //hidden buttons
  const [isShown, setIsShown] = useState(false);
  const [showUpdateRequired, setShowUpdateRequired] = useState('visible');
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowDecline, setModalShowDecline] = React.useState(false);
  const [title, setTitle] = useState('')

  const acceptModal = (idd) => {
    //console.log("save button pressed with idd",idd)
    acceptData1(idd)
    setModalShow(false)
  
  };



  

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={props.idd}>
            Save Changes
          </Button>
      </Modal.Footer>
    </Modal>
  );
}


const declineModal = (idd) => {
  //console.log("save button pressed with idd",idd)
  var x = title
  console.log("user typed x is ",x)
  declineData(idd,x)
  setModalShowDecline(false)

};

function MyVerticallyCenteredModalDecline(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <input id="feedbackid" type="text" className="getFeeedback" onChange={event => setTitle(event.target.value)}></input>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={props.idd}>
            Save Changes
          </Button>
      </Modal.Footer>
    </Modal>
  );
}

  //style for update required
  const styles = {
    exampleStyle: {
      visibility: showUpdateRequired,
    }
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [rows, setBooks] = useState([]);
  const [jsonData, setJsonData] = useState([])

  useEffect(() => {
    getBooks();
  }, []);


//function for (when user accepts the data) sends a PUT request to change the status to sync
const acceptData1 =async (pcfValue) => {

  //PUT request to LANSY
  const url_local = configData.API_BACKEND+`/api/items/${pcfValue}`

  const params = {
    crossDomain:true,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    }
  const response = await fetch(url_local,params);

  //console.log("res body is ",response.body)
  //console.log("res status is ",response.status)

  //POST request to PFM done in backend
  if(response.status===200){
    window.location.reload();
  }

}

////function for (when user decline the data) sends a DELETE request to change the status to sync
const declineData =  async (pcfValue, feedbackfromuser) => {
  //console.log("pcfId is - ",pcfValue);
  
  const feedbackMsg = {
    feedback: feedbackfromuser,
   }

  const url_local = configData.API_BACKEND+`/api/items/${pcfValue}`
  //console.log("url_local is ",url_local)

  const params = {
    crossDomain:true,
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedbackMsg)
  }
  const response = await fetch(url_local,params);

  //console.log("decline res is ",response)

  if(response.status===200){
    window.location.reload();
  }

}

const showAcceptModal =(id)=>{
  console.log("show accept is called with id is ",id)
  setModalShow(true)
}


const showDeclineModal =(id)=>{
  console.log("show decline is called with id is ",id)
  setModalShowDecline(true)
}


//this functions send data to the detailed page to show them nicely
const sendDataDetailedPage = (pcfValue) => {
  
  console.log("sendDataDetailedPage id is ", pcfValue)
  const obj = jsonData.find(item => item.id === pcfValue)
  console.log("sending obj to detailed page ",obj)
  navigate('/detailedpage',{state:obj})
  
}



 const getBooks = async () => {

    //const headers = { 'Content-Type': 'application/json'}
    const params = {
      crossDomain:true,
      method: 'GET',
      headers: {
      'Origin': '*'
      }
      
      }

      // const url_local = `http://35.244.38.224/api/items`
      const url_local = configData.API_BACKEND+"/api/items"
      //console.log("url for md is ",url_local)

  
      const response1 = await fetch(url_local,params);
      const data5 = await response1.json();
      console.log("Data for MD is ",data5)

    var data1 = await data5;
    setJsonData(data1);
    
    var anything =await data1.map((d) => {
      

      let start =  utcToTime(d.reportingPeriodStart);
      let end =  utcToTime(d.reportingPeriodEnd);
      return createData(d.productNameCompany, d.company_name, d.status, d.standardsUsed, (`${start} - ${end}`), (`${d.pcf} ${d.unit}`), d.category, (`${d.pcf} %`),d.id,(`${d.declaredUnitAmount} ${d.declaredUnit}`));
    })

    setBooks(anything)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  

  return (
    <StylesProvider injectFirst>
    <Paper  style={{margin:'50px 40px 0px 40px', height:'700px', padding:'30px 10px 20px', borderRadius:'16px',
                  
     }}>
      <TableContainer sx={{ maxHeight: 540 }} >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            <TableCell  align="left" colSpan={8} style={{fontFamily: 72,
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '18px',
            lineHeight: '22px',
            position:'sticky',
            
            }}>
              <div style={{ paddingBottom:'15px'}}>
                Supplied Products
                </div>
            {/*searchbar*/}
                <div className="outerSearch">
                    <button className="zoom-button">
                                  <div className="elements">
                                      <p className="text-1"><BsSearch/></p>
                                      {/* <p className="text-2">Search for products/supplier</p> */}
                                      <p type="text" className="text-2">Search for products / supplier</p>
                                  </div>
                    </button>
                    <div className="filters">
                                <div className="filterOuter">
                                    <p className="text-3"><FiFilter/></p>
                                    <p className="text-4">Filters</p>
                                    <div className='outer'>
                                    <p className="text-5">2</p>
                                    </div>
                              </div>

                              
                    </div>

                    <div className="small-_trend1">
                              <p className="text-6">GHGP </p>
                              <img src={cancel} className="text-7"/>
                    </div>
                    <div className="small-_trend2">
                          <p className="text-8">CO2e</p>
                          <img src={cancel} className="text-9"/>
                    </div>
                    <div className="frame">
                          <p className="text-1-0">Clear</p>
                          <div className="filters1">
                            <p className="text-1-1">Search</p>
                          </div>
                    </div>
                    <div className="button">
                        <div className="elements1">
                      <a href={Mypdf} download="Data Sheet.pdf" className="text-1-2"> Download report </a>
                       {/*<p className="text-1-2" href={Mypdf} download="Big_Data.pdf"> Download report  </p>*/}
                        <img src={icons} className='icon'/>
                      </div>
                    </div>
                   
                </div>
            {/* search bar ends */}
              </TableCell>
            </TableRow>
            <TableRow style={{padding:'10px 50px 20px', background: "#F5FAFF"}}>
              {columns.map((column, ind) => (
                <TableCell
                className="header"
                  key={ind}
                  align="center"
                  style={{ top: 57, minWidth: column.minWidth , background: "#F5FAFF", minHeight: 71 }}
                >
                  <div className='header'>
                  {column.label}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className='body' style={{alignItems: "left"}}>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow  hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      const col_id = column.id;

    switch(col_id){

    /*case 'trends':
      return (
        <TableCell key={column.id} align="center" onClick={()=>{sendDataDetailedPage(row['pcfId'])}}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
        </TableCell>
        );*/
    case 'supplier':
      return (
        <TableCell key={column.id} align="center" style={{
              color:"#89919A"
        }}
        onClick={()=>{sendDataDetailedPage(row['pcfId'])}}
        >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
        </TableCell>
        );
    case 'footprint':
      return (
        <TableCell key={column.id} align="center" style={{
              color:"#89919A"
        }}
        onClick={()=>{sendDataDetailedPage(row['pcfId'])}}
        >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
        </TableCell>
        );
    case 'category':
      return (
        <TableCell key={column.id} align="center" style={{
              color:"#89919A"
        }}
        onClick={()=>{sendDataDetailedPage(row['pcfId'])}}
        >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
        </TableCell>
        );
    case 'productname':
      return (
        <TableCell key={column.id} align="center" style={{fontFamily: 72,
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: "1rem"
                            }}
            onClick={()=>{sendDataDetailedPage(row['pcfId'])}}
                            >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
        </TableCell>
        );
    case 'emission':
      return (
        <TableCell key={column.id} align="center" style={{fontFamily: 72,
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: "1rem"}}
            onClick={()=>{sendDataDetailedPage(row['pcfId'])}}
            >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
        </TableCell>
        );
    case 'database':
        return (
          value==='update-required'?
          <TableCell key={column.id} align="center">
          <div className="statusBig" 
                  onMouseEnter={() => 
                    {
                      setIsShown(true);
                    setShowUpdateRequired('hidden')
                    }
                  }
                  onMouseLeave={() => {
                    setIsShown(false);
                    setShowUpdateRequired('visible')
                  }}>
            <div className="status" style={styles.exampleStyle}>
              {value}<img alt="company logo" src={updateLogo} />
            </div>
            {isShown && (
              <Stack spacing={1} direction="row">
                {/* onClick={() => { console.log('onClick'); acceptData(row['pcfId']) }} */}
              
              <Button className="buttonAccept" onClick={() => acceptData1(row['pcfId'])}>
              ✓ Accept
              </Button>
              {/* console.log('onClick'); declineData(row['pcfId']) */}
              <Button className="buttonDecline" onClick={() => { declineData(row['pcfId']) }}>
              ✘ Decline
            </Button>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                idd={()=> acceptModal(row['pcfId'])}
            />
            <MyVerticallyCenteredModalDecline
                show={modalShow}
                onHide={() => setModalShow(false)}
                
                idd={()=> declineModal(row['pcfId'])}
            />
            </Stack>
            )}
          </div>
          </TableCell>
          :
          <TableCell align="center" key={column.id} >
            <div className="synchedStatus">
                          {value} 
                          <img alt="company logo" src={synchedLogo} />
            </div>
          </TableCell>
        );
    default:
        return (
        <TableCell className={classes.root} onClick={()=>{sendDataDetailedPage(row['pcfId'])}} key={column.id} align="center" stye={{textAlign:"left"}}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
        </TableCell>
        );
}
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className='page'>
      <TablePagination 
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        
        
      />
      </div>
    </Paper>
    </StylesProvider>
  );
}

export default withStyles(styles)(ColumnGroupingTable);
