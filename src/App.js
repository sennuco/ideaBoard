import React from 'react';
import './App.css';
import IdeasContainer from './Components/IdeasContainer'
import {Route ,Switch} from 'react-router'
import {Link} from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login'
import "bulma/css/bulma.css";



function App() {
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
        <Route path="/login" component={Login} />
        <Route path ="/" exact strict component={Home} />
      </div>
  );
}

export default App;
