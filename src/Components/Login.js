import React, { Component , } from 'react';
// import { browserHistory } from 'react-router'


class Login extends Component {

   constructor(props) {
       super(props);
   
       this.state = {
         email: ""
       }
   }

   handleSubmit =() => {

     this.props.getNewUser(this.state.email)

     
   }

   handleChange =(e) => {
     this.setState({
         email: e.target.value
     })
   }
   

   

    render() {
        return (
            <div>
                <p>Login page</p>
                <form>
                    <input type="text" value={this.state.email} placeholder="Enter your email address.." onChange={this.handleChange}></input><br></br>
                    <button type="button" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        );
    }
}

export default Login;