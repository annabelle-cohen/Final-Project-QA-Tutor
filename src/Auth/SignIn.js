import React, {Component} from 'react'
import './signInStyle.css'
import Code from './video/code2.mp4'

class SignIn extends Component{

    state = {
        email: '',
        password: ''
      }
      handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
      }
      handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
      }

render(){
    return(
        <header class ="v-header container">
            <div class="fullscreen-video-wrap">
                <video autoPlay loop muted>
                    <source src={Code} type="video/mp4"></source>
                </video>
                <div class="header-overlay">
                </div>
                    <div id="login-div" className="container">
                         <div id="login-div2" className="card z-depth-0">
                            <div id="login-card" className="card-content">
                                <form id="login-form" onSubmit={this.handleSubmit}>
                                 <span id="title" className="card-title">Welcome</span>
                                 <div className="input-field ">
                                     <label id="email" htmlFor="email">Email</label>
                                         <input type="email" id="email" onChange = {this.handleChange}></input>
                                 </div>
                                <div className="input-field">
                                      <label id="password" htmlFor="password" >Password</label>
                                         <input type="password" id="password" onChange = {this.handleChange}></input>
                                </div>
                                 <div className="input-field">
                                     <button id="signIn-button" className="btn grey darken-3 z-depth-3">Login</button>

                                 </div>
                                 </form>
                             </div>
        
                         </div>
                   
                
                     </div>

               
                 </div>
                 <section class="sec-bottom">
                    <div id="sec-div" class="container1">
                         © AAP
                    </div>
                </section>
        </header>


    )

    
}

}



export default SignIn

