import React from 'react';
import '../css/style.css'
    
class Navigation extends React.Component {
    constructor() {
        super();
        this.state = {
            emailChange: null,
            password: null
        }
    }

    onSignOut = async () => {
        const ip = process.env.REACT_APP_IP
        await fetch(`http://${ip}:3001/signout`)
          .then(response => response.json())
          .then(data => {
              console.log(data);
              this.props.onUser(null);
              this.props.onRouteChange('signin');
            });
    
        }

    render() {
        const {onRouteChange, isSignedIn, currentUser} = this.props;
        if(isSignedIn) {
            return (
                <div>
                    <div class="topnav py-3">Sla Violation Detection and Compensation</div> 
                <nav class="navbar navi navbar-expand-md bg-dark">
                    <a onClick={() => onRouteChange('home')} class="navbar-brand">
                        LogAuditor
                    </a>
                    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarCollapse">
                        <div class="navbar-nav">
                            <a onClick={() => onRouteChange('home')} class="nav-item nav-link active">Home</a>
                        </div>
                        <div class="navbar-nav ml-auto">
                            <a class="nav-item nav-link">Signed in as: {currentUser}</a>
                            <a onClick={this.onSignOut} class="nav-item nav-link">Logout</a>
                        </div>
                    </div>
                </nav>
                </div>
                
            );
        }else {
            return (
                <div>
                    <div class="topnav py-3">Sla Violation Detection and Compensation</div> 
                    <nav class="navbar navi navbar-expand-md bg-dark">
                    <a onClick={() => onRouteChange('home')} class="navbar-brand">
                        LogAuditor
                    </a>
                    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarCollapse">
                        <div class="navbar-nav ml-auto">
                            <a onClick={() => onRouteChange('signin')} class="nav-item nav-link">Sign in</a>
                            <a onClick={() => onRouteChange('register')} class="nav-item nav-link">Register</a>
                        </div>
                    </div>
                </nav>
                </div>
                
                
                
            );
        }
    }
}


export default Navigation;