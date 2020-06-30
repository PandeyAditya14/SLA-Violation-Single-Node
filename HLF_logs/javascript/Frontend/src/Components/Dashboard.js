import React from 'react';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           data:null,
           tid: null
        }
        this.onClickingView=this.onClickingView.bind(this);
    }

    componentDidMount() {
        this.getUser();
    }

    getUser = async () => { 
        const ip = process.env.REACT_APP_IP
        console.log('hd',ip);  
        await fetch(`http://${ip}:3001/getUser`)
      .then(response => response.json())
      .then(data => {
          console.log(data)
        this.setState({ data })
        this.props.onClickingView({data: this.state.data});
        });
    }


    onClickingView = async (id) => {  
        this.getUser();
        this.props.onRouteChange('logs');
    }

    onCompensate = async () => {
        const ip = process.env.REACT_APP_IP
        const { data } = this.state
        if(data!==null) {
            console.log(data.uid)
            await fetch(`http://${ip}:3001/compensate`)
        .then(response => response.json())
        .then(data => {
            this.getUser();
            this.props.onRouteChange('compensation');
            });
        }
    }

    onInputChange = (event) => {
        this.setState({ tid: event.target.value });
    }

    render() {
        return(
            <div className="p-5">
                 <h1 className="display-4">Sla Violation Detection and Compenstation</h1> 
                    {this.props.currentUser === 'admin'?
                    <div>
                        <p className="mt-3" >View all the user logs</p>  
                        <button className="btn btn-primary mt-3" onClick={() => this.onClickingView('')}>Get Logs</button><span>   </span>
                    </div>
                    : 
                    <div>
                        <p className="mt-3" >View all the violated logs or to get compensation for any violation</p> 
                        <button className="btn btn-primary mt-3" onClick={() => this.onClickingView('')}>Get Logs</button>
                        <button class=" btn btn-primary mt-3 ml-4" onClick={() => this.onCompensate()}>Get Compensation</button>
                    </div>  
                    }   
            </div>
               
        );
        
    }
}

export default Dashboard;
