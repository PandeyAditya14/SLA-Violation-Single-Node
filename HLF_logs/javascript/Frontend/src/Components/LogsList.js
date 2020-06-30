import React from 'react';
import { MDBDataTable,MDBTable,MDBTableHead,MDBTableBody } from 'mdbreact';
import '../css/style.css'
const DatatablePage = (userData) => {
    console.log(userData.logs)
    
    const data = {
        columns: [
            {
                label: 'Tid',
                field: 'tid',
                width: 100
            },
            {
                label: 'Load',
                field: 'load',
                width: 100
            },
            {
                label: 'Os',
                field: 'os',
                width: 100
            },
            {
                label: 'Ram',
                field: 'ram',
                width: 100
            },
            {
                label: 'Autoscale',
                field: 'autoscale',
                width: 100
            },
        ],
        rows:userData.logs,
    };

    return (data)
}

export default function LogList({transactionData}) {
  const userData = transactionData.data;
  const logs = transactionData.data.logs;
  console.log("df",userData);
  console.log("df",userData.logs);
  const data=DatatablePage(userData)
  return(   
    <div className="mt-3 table1">
    <h1 className="dis text-center">Violated Logs</h1>
    <MDBTable className="center ma-3">
      <MDBTableHead color="tabhead">
        <tr>
          <th>Tid</th>
          <th>Load</th>
          <th>Os</th>
          <th>Ram</th>
          <th>Autoscale</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      { 
        Object.keys(logs).map((log, i) => {
        return (
                <tr>
                    <td>{logs[log].tid}</td>
                    <td>{logs[log].load}</td>
                    <td>{logs[log].os}</td>
                    <td>{logs[log].ram}</td>
                    <td>{logs[log].autoscale}</td>
                </tr>
        )})}
    </MDBTableBody>
    </MDBTable>
        
        </div>

  );
};

