import React, { Component} from 'react'
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom'
import { InputText } from 'primereact/inputtext';
import "./registertoaap.css"
import './ButtonDemo.css'
import { Password } from 'primereact/password';


export class RegisterToAAP extends Component {
    constructor(props){
        super(props);
        this.state={
            firstName:null,
            lastName:null,
            email:null,
            password:null,
            firstNameError:"",
            lastNameError:"",
            emailError:"",
            passwordError:"",
            isFill:true
        }
    }
    handleClick = (e)=>{
        console.log("click");
    }

    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
        console.log(e);
        console.log(this.state);
        this.setState({isFill:false});
      }


    render(){

        const submitDisabled=this.state.isFill;
        return(
            <div className="div-container-register">
            <div className="already-exist">Already a member? &nbsp;<Link to="/dashboard/signInToAAP" id="signIn-link" className="p-button-link" >Sign In</Link></div>
            <div className="Create-Account">
            <label id="create-account-title">Create an account</label>
            <p>Have a business?&nbsp;<Link to="/dashboard/registerToAAP/businessregister" id="business-link" className="p-button-link" >Create a business account</Link></p>
            </div>

            
            <div className="first-row-name">
            <div id="first-name-field" className="p-float-label">
                <InputText id="firstName" value={this.state.firstName} onChange={this.handleChange} />
                <label id="firstName-label-regis" htmlFor="firstName">First Name</label>
                {/*for submit check*/}
                <small id="username2-help"  className="p-invalid p-d-block">{this.state.firstNameError}</small>
            </div>


            <div id="last-name-field" className="p-float-label">
                <InputText id="lastName" value={this.state.lastName} onChange={this.handleChange} />
                <label id="lastName-label-regis" htmlFor="lastName">Last Name</label>
                {/*for submit check*/}
                <small id="username2-help"  className="p-invalid p-d-block">{this.state.lastNameError}</small>
            </div>

            
            <span id="email-field" className="p-float-label">
                <InputText id="email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
               <label id="email-label-regis" htmlFor="email">Email</label>
                {/*for submit check*/}
                <small id="username2-help"  className="p-invalid p-d-block">{this.state.emailError}</small>
            </span>

            <span id="password-field" className="p-float-label">
                <InputText id="pass-register-input" type="password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} />
               <label id="password-label-regis" htmlFor="password">Password</label>
                {/*for submit check*/}
                <small id="username2-help"  className="p-invalid p-d-block">{this.state.passwordError}</small>
            </span>

            </div>
            
            <div>
            <Button disabled={submitDisabled} id="submit-form" label="Create account" className="p-button-sm"  />
           </div>
           <div className="vertical-container">

           {/*div for vertical line*/}
           <div id="div-line-vertical">
           <div class="vl"></div>
           <div class="vl1">or</div>
           <div class="vl2"></div>
           </div>

            {/*div for vertical buttons*/}
            <div id="div-buttons-vertival">
            <div className="facebook-button2">
            <Button id="login-with-facebook2" label="Conitnue with Facebook" icon="pi pi-facebook" className="p-button-sm"  />
            </div>
            <div className="google-button2">
            <Button id="login-with-google2" label="Continue with Google" icon="pi pi-google" className="p-button-sm"  />
            </div>
            </div>
           </div>

           <div>
                    <hr id="border5" align="right" />
        </div>

           <div id="copy-right">

            Copyright © 2020-2021 AAP Inc. All Rights Reserved. <a id="User_Agreement" href="url" color="black">User Agreement</a>, 
            <a id="Privacy" href="url" color="black">Privacy</a>,
            <a id="Cookies" href="url" color="black">Cookies</a> ,
            <a id="personal_information" href="url" color="black">Do not sell my personal information</a> and <a id="AdChoice" href="url" color="black">AdChoice</a> 
            <i id="info_circle" className="pi pi-info-circle"></i>
            </div>

            
            </div>
        

        )

        
    }

}