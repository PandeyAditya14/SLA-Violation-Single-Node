import React from 'react'
import '../css/style.css'
const Compensation = ({user}) => {
    const type={
        0:"gold",
        1:"silver",
        2:"bronze",
    }
    return (
        <div className="p-5">
                 <div className="dis">Compensation details</div> 
                    <div className="comp">    
                        <p className="mt-3" ><strong>Name:<span>  </span></strong>{user.data.uid}</p> 
                        <p className="mt-3" ><strong>Membership Tier: </strong>{type[user.data.type]}</p> 
                        <p className="mt-3" ><strong>Threshold value: </strong>{user.data.threshold}%</p>
                        <p className="mt-3" ><strong>Compensation base value: </strong>{user.data.compensationValue} Units</p> 
                        <p className="mt-3" ><strong>Compensation recieved: </strong>{user.data.compensationValue*user.data.compensationNoTimes} Units</p> 
                    </div>   
            </div>
    )
}
export default Compensation;
