import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, { Component} from 'react'
import './bussinesregister.css'
import './DropdownDemo2.css';
import './flag.css';
import { Link } from 'react-router-dom'
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import Recaptcha from 'react-recaptcha';



export class businessRegister extends Component {
    constructor(props){
        super(props);

        this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);

        this.state={
            bussinessName:null,
            bussinessEmail:null,
            reenterEmail:null,
            passwordBussines:null,
            selectedCountry: null,
            bussinesNameError:"",
            bussinessEmailError:"",
            reenterEmailError:"",
            passwordBussinesError:"",
            isVerified: false
        }

    }


    recaptchaLoaded() {
        console.log('capcha successfully loaded');
      }

      verifyCallback(response) {
        if (response) {
          this.setState({
            isVerified: true
          })
        }
      }


    handleSubmit=(e)=>{
        var isOk=true;
        if(this.state.bussinessName === "" ){
            this.setState({bussinesNameError:"Please enter the business or DBA name."});
            isOk =false;
        }

        if(this.state.bussinessEmailError === ""){
            this.setState({bussinessEmailError:"Please enter your email address."}); 
            isOk =false;  
        }

        if(this.state.reenterEmailError === ""){
            this.setState({bussinessEmailError:"Don't forget to reenter your email address!"}); 
            isOk =false;   
        }

        if(this.state.passwordBussinesError === ""){
            this.setState({bussinessEmailError:"Please enter your password."}); 
            isOk =false;    
        }
}


  


render(){
    return(
        <div className="register-bussiness-container">
        <label id="logo-aap">Logo in future</label>

        <div className="register-form">


        <div id="link-to-sign-in2">
        <Link id="sign-in-link" to='/dashboard/signInToAAP'>
        <i id="chevron-icon" className="pi pi-chevron-circle-right" iconPos="left"></i>
        Sign In
        </Link>
            {/*<i id="chevron-circle-icon"  className="pi pi-chevron-circle-right"></i>*/}
        </div>

        <div id="link-to-register2">
        <Link id="register-link" to="/dashboard/registerToAAP/businessregister" >
        <i id="icon-plus" className="pi pi-plus-circle" iconPos="left"></i>
         Register
        </Link>
        </div>

        <div className="second-title-bussines">
        <Card className="card-form">
            <p id="p-register-bussiness">Register a business account
            <br></br>
            <Link id="create-personal-account" to="/dashboard/registerToAAP" >
            Or create a personal account
            </Link>
            </p>

         <div className="quality-container">
        <div className="info-icon-class">
                <i id="info-icon" className="pi pi-info-circle"></i>
         </div>
        <div className="content-Qualify-for-business">
               Qualify for business selling limits, promotions, <br></br>
                and get professional tools to help you grow.
        </div>
        </div>

        <div className="p-field">
            <label htmlFor="bussinessName"  className="p-d-block">Legal business name</label>
            <InputText id="bussinessName" value={this.state.bussinessName} onChange={(e) => this.setState({bussinessName: e.target.value})} aria-describedby="bussinessName-help" className="p-invalid p-d-block" />
            <small id="bussinessName-help" className="p-invalid p-d-block">{this.state.bussinesNameError}</small>
        </div>


        <div className="p-field">
            <label htmlFor="bussinessEmail"  className="p-d-block">Legal business email</label>
            <InputText id="bussinessEmail" value={this.state.bussinessEmail} onChange={(e) => this.setState({bussinessEmail: e.target.value})} aria-describedby="bussinessEmail-help" className="p-invalid p-d-block" />
            <small id="bussinessEmail-help" className="p-invalid p-d-block">{this.state.bussinessEmailError}</small>
        </div>

        <div className="p-field">
            <label htmlFor="reenterEmail"  className="p-d-block">Reenter email</label>
            <InputText id="reenterEmail" value={this.state.reenterEmail} onChange={(e) => this.setState({reenterEmail: e.target.value})} aria-describedby="reenterEmail-help" className="p-invalid p-d-block" />
            <small id="reenterEmail-help" className="p-invalid p-d-block">{this.state.reenterEmailError}</small>
        </div>
        
        <div className="p-field">
            <label htmlFor="passwordBussines"  className="p-d-block">Password</label>
            <InputText id="passwordBussines"  type="password" value={this.state.passwordBussines} onChange={(e) => this.setState({passwordBussines: e.target.value})} aria-describedby="passwordBussines-help" className="p-invalid p-d-block" />
            <small id="passwordBussines-help" className="p-invalid p-d-block">{this.state.passwordBussinesError}</small>
        </div>

        <div id="recaptcha">
        <Recaptcha
            sitekey="6Le2Oe4ZAAAAAIFJA4GMLgm0rHZLyhjs9Q_llL3j"
            render="explicit"
            onloadCallback={this.recaptchaLoaded}
            verifyCallback={this.verifyCallback}
          />
        </div>

 
        </Card>
        </div>

        
        </div>

        </div>
    )
}
}