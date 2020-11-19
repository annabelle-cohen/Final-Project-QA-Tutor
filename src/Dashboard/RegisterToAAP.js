import React, { Component} from 'react'
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom'
import { InputText } from 'primereact/inputtext';
import "./registertoaap.css"
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
            <p>Have a business?&nbsp;<Link to="/dashboard/registerToAAP/businessAccount" id="business-link" className="p-button-link" >Create a business account</Link></p>
            </div>

            
            <div className="first-row-name">
            <div id="first-name-field" className="p-float-label">
                <InputText id="firstName" value={this.state.firstName} onChange={this.handleChange} />
                <label htmlFor="firstName">First Name</label>
                {/*for submit check*/}
                <small id="username2-help"  className="p-invalid p-d-block">{this.state.firstNameError}</small>
            </div>

            <div id="last-name-field" className="p-float-label">
                <InputText id="lastName" value={this.state.lastName} onChange={this.handleChange} />
                <label htmlFor="lastName">Last Name</label>
                {/*for submit check*/}
                <small id="username2-help"  className="p-invalid p-d-block">{this.state.lastNameError}</small>
            </div>

            
            <span id="email-field" className="p-float-label">
                <InputText value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
               <label htmlFor="email">Email</label>
                {/*for submit check*/}
                <small id="username2-help"  className="p-invalid p-d-block">{this.state.emailError}</small>
            </span>

            <span id="password-field" className="p-float-label">
                <InputText type="password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} />
               <label htmlFor="password">Password</label>
                {/*for submit check*/}
                <small id="username2-help"  className="p-invalid p-d-block">{this.state.passwordError}</small>
            </span>

            </div>
            <div>
            <Button disabled={submitDisabled} id="submit-form" label="Create account" className="p-button-sm"  />
           </div>

            </div>
        

        )

        
    }

}