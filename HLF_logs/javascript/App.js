import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import GetTransaction from './Components/GetTransaction/GetTransaction';
import ViewTransaction from './Components/View Transaction/ViewTransaction';
import Signin from './Components/SignIn/Signin';
import Register from './Components/Register/Register';
import 'bulma/css/bulma.css';
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
      <div className="App mdiv"> 
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} onUser={this.onUser} currentUser={currentUser} />
          {   route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange} currentUser={currentUser} onUser={this.onUser}/>
            : route === 'register'
            ? <Register onRouteChange={this.onRouteChange} />
            : route === 'home'
            ? <GetTransaction onClickingView={this.onClickingView} onRouteChange={this.onRouteChange} />
            : route === 'logs'
              ? <ViewTransaction user={user} currentUser={currentUser} />
            : <div></div>
          }
    </div>
    );
  }
}

export default App;
