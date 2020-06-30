import React, { Component } from 'react';
import Navigation from './Components/Navigation';
import Dashboard from './Components/Dashboard';
import ViewTransaction from './Components/ViewTransaction';
import Signin from './Components/Signin';
import Register from './Components/Register';
import Compensation from './Components/Compensation'
import Footer from './Components/Footer';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: 'signin',
      isSignedIn: false,
      currentUser: null,
      user: null
    }
  }

  

  onClickingView = (data) => {
    this.setState({user: data});
    
  }

  onRouteChange = (route) => {
    if(route==='signin') {
      this.setState({isSignedIn: false})
      this.setState({isTransactionData: false})
    } else if (route === 'home'){
      this.setState({ isSignedIn: true })
    } else if (route === 'register') {
      this.setState({isSignedIn: false})
    }
    this.setState({route: route})
  }

  onUser = (user) => {
    this.setState({currentUser: user})
  }

  render() {
    const {isSignedIn, user, route, currentUser} = this.state
    return (  
      <div>
      <div className="App"> 
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} onUser={this.onUser} currentUser={currentUser} />
          {   route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange} currentUser={currentUser} onUser={this.onUser}/>
            : route === 'register'
            ? <Register onRouteChange={this.onRouteChange} />
            : route === 'home'
            ? <Dashboard onClickingView={this.onClickingView} onRouteChange={this.onRouteChange} currentUser={currentUser}/>
            : route === 'logs'
              ? <ViewTransaction user={user} currentUser={currentUser} />
            : route ==='compensation'
            ? <Compensation user={user} />
            :<div></div>
          }
  
    </div>
    <div className='footer1'>
    <Footer />
    </div>
    
    </div>
   
    );
  }
}

export default App;
