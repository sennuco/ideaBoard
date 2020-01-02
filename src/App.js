import React, { Component } from 'react'
import './App.css';
import IdeasContainer from './Components/IdeasContainer'
import {Route ,Switch} from 'react-router'
import {Link} from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login'
import "bulma/css/bulma.css";



class  App extends Component {
   constructor(props) {
     super(props)
   
     this.state = {
        user: {}
     };
   };


componentDidMount() {
  //this.getNewUser()
}


getNewUser = (email) => {
  console.log('email',email)
  fetch(`http://localhost:3001/users?email=${email}`)
  .then(resp => resp.json())
  .then(user_obj => {
    console.log('usssr',user_obj)
    this.setState({user: user_obj})
  }
    )
}


render() {

  return (
    <div>
      <nav className="navbar">
       <div className="navbar-item">
        <div className="field is-grouped">
          <p className="control">
            <a className="button">
                <span className="icon">
                  <i className="fas fa-twitter" aria-hidden="true"></i>
                </span>
                <span > <Link to="/">Home</Link></span>
              
            </a>
          </p>
     </div>
    </div>
      </nav>
    
        <Route path="/ideas" component={IdeasContainer} />
        <Route path="/login" render={(props) => <Login getNewUser={this.getNewUser} />  } />
        <Route path ="/" exact strict component={Home} />
   </div>
  )
  }
}

export default App;
