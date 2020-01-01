import React, { Component } from 'react';
import '../App.css';
import {Link} from 'react-router-dom'
import Image from '/Users/meicodes/Desktop/NULL-ideacloud/ideaboard/src/Images/undraw_to_do_xvvc.png'
import "bulma/css/bulma.css";

class Home extends Component {
    render() {
        return (
            <div>
        <div className="App">
        <div className="App-header"></div>

          <img className="todoimg" src={Image} alt="Welcome Header"/>
          <p className="welcome">Where Ideas <br></br>Are Born</p>
          <p className="welcometext">When you need to kick off a project, followup on that next big thing,<br></br>deploy some code, and make all of your goals a reality, <br></br>Ideaboard has you covered.</p>
          <button className="ideaboard  button is-primary"><Link to="/ideas">Get Started</Link></button>
          <p className="signup-message">Already a member? </p>  <p className="login"><Link to="/login">Login</Link></p>
        </div>
            </div>
        );
    }
}

export default Home;