import React from 'react'

export const Compensation = ({user}) => {
    return (
        <div id="wrapper" style={{display:"flex" , alignContent:"center" , justifyContent:"center"}}>
        <div className="card bg-light mb-3" style={{maxWidth:"18rem"}}>
            <div class="card-header"><strong>{user.data.uid}</strong></div>
            <div class="card-body">
                <h5 class="card-title">Total Compensated amount for {user.data.uid}</h5>
                <p class="card-text">Accordin to our records there have been {user.data.compensationNoTimes} and total amount Compenstated is {user.data.compensationNoTimes * user.data.compensationValue} </p>          
            </div>
        </div>
        </div>
    )
}
