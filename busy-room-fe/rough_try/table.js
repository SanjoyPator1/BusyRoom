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
import { Badge, Pill } from 'evergreen-ui'

import Stack from '@mui/material/Stack';
//btton
import Button from '@mui/material/Button';

import {Link } from "react-router-dom";





const columns = [
  { id: 'productname', label: 'PRODUCT NAME', minWidth: 170 },
  { id: 'supplier', label: 'SUPPLIER NAME', minWidth: 100 },
  {
    id: 'database',
    label: 'DATABASE STATUS',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'footprint',
    label: 'FOOTPRINT CALCULATION METHOD',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'time',
    label: 'CURRENT VALID TIME PERIOD',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'emission',
    label: 'EMISSION FACTOR',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'category',
    label: 'FOOTPRINT CATEGORY',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'trends',
    label: 'HISTORICAL TRENDS COMPARISON',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(productname, supplier, database, footprint, time, emission, category, trends, pcfId) {
  return { productname, supplier, database, footprint, time, emission, category, trends, pcfId };
}


export default function ColumnGroupingTable() {

  //hidden buttons
  const [isShown, setIsShown] = useState(false);
  const [showUpdateRequired, setShowUpdateRequired] = useState('visible');

  //style for update required
  const styles = {
    exampleStyle: {
      visibility: showUpdateRequired,
    }
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [rows, setBooks] = useState([]);

  useEffect(() => {
    console.log("effect has been run");
    getBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

const acceptData = (pcfValue) => {
  console.log(pcfValue);
}


 const getBooks = async () => {

    const headers = { 'Content-Type': 'application/json'}
    const params = {
      method: 'GET',
      headers: {
      'Origin': '*'
      }
      
      }

      const url_local = `http://localhost:4004/content/ProductFootprint`
      const url_cloud = `https://b5a910ectrial-dev-lansy-srv.cfapps.us10.hana.ondemand.com/catalog/Companies?$expand=products($expand=footprints)`
      const response1 = await fetch(url_local,params);
      const data5 = await response1.json();
      console.log("local data is ")
      console.log(data5.value);

    var data1 = data5.value
    
    var anything = data1.map((d) => {
      let start = new Date(parseInt(d.reportingPeriodStart));
      let end = new Date(parseInt(d.reportingPeriodEnd));
      return createData(d.productNameCpc, d.companyName, d.status, d.standardsUsed[0], (`${start.toDateString()} - ${end.toDateString()}`), (`${d.pcf} ${d.declaredUnit}`), d.category, (`${d.pcf} %`),d.pcfId);
    })

    console.log(anything) 
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
    <Paper  style={{margin:'80px 20px 0px 20px', height:'700px', padding:'50px 50px 20px', borderRadius:'16px',
                  
     }}>
      <TableContainer sx={{ maxHeight: 540 }} >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            <TableCell align="left" colSpan={7} style={{fontFamily: 72,
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '18px',
            lineHeight: '22px',
            position:'sticky'}}>
                Supplied Products
              </TableCell>
              <TableCell>
                <div>
                  
                </div>
              </TableCell>
              {}
            </TableRow>
            <TableRow  className='row datahead' style={{padding:'10px 50px 20px'}}>
              {columns.map((column, ind) => (
                <TableCell
                  key={ind}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  <div className='header'>
                  {column.label}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className='body'>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow id={row.pcfId} hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      const col_id = column.id;

    switch(col_id){

    case 'trends':
      return (
        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
        </TableCell>
        );
    case 'database':
        return (
          <TableCell key={column.id} align={column.align}>
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
              {value}
            </div>
            {isShown && (
              <Stack spacing={2} direction="row">
                <form onsubmit={acceptData(row.pcfId)}>
              <Button className="buttonAccept" type="submit">
              ✓ Accept
              </Button>
              <Button className="buttonDecline" variant="text">
              ✘ Decline
            </Button>
            </form>
            </Stack>
            )}
          </div>
          </TableCell>
        );
    default:
        return (
          <span>
          <Link className="heading1" to="/detailedPage">
            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
            </TableCell>
          </Link>
          </span>
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
  );
}
