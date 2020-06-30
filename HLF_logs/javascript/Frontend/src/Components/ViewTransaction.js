import React from 'react';
import LogsList from './LogsList';
import Admin from './Admin';

const ViewTransaction = ({user,currentUser}) => {
    console.log('from view',currentUser)
        if(currentUser==='admin') {
            return(
                <div className="p-5">
                    <Admin transactionData={user} />  
                </div>
            ); 
        }
        else {
            return(
                <div className="p-5">
                    <LogsList transactionData={user} />  
                </div>
            ); 
        }
}
export default ViewTransaction;
