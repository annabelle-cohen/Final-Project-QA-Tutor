import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, { Component} from 'react'
import './bussinesregister.css'
import './DropdownDemo2.css';
import './flag.css';
import { Dropdown } from 'primereact/dropdown';
import './DropdownDemo.css';
import { Link } from 'react-router-dom'
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import Recaptcha from 'react-recaptcha';
import { Button } from 'primereact/button';
import './ButtonDemo.css';






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
            phoneNumber:null,
            bussinesNameError:"",
            bussinessEmailError:"",
            reenterEmailError:"",
            passwordBussinesError:"",
            phoneNumberError:"",
            isVerified: false,
           

        }

        this.countries = [
            {name: '+61', code: 'AU'},
            {name: '+55', code: 'BR'},
            {name: '+86', code: 'CN'},
            {name: '+20', code: 'EG'},
            {name: '+33', code: 'FR'},
            {name: '+49', code: 'DE'},
            {name: '+91', code: 'IN'},
            {name: '+81', code: 'JP'},
            {name: '+34', code: 'ES'},
            {name: '+1', code: 'US'}
        ];


    }


    onCountryChanged = (e)=> {
        console.log(e);
        this.setState({selectedCountry:e.target.value.name})
    }


    




    recaptchaLoaded() {
        console.log('capcha successfully loaded');
      }

      verifyCallback(response) {
          console.log(response);
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


handleGoogleClientLoad() {
    console.log('Success on load');
}
componentDidMount() {
    <script src="https://www.google.com/recaptcha/api.js?render=explicit" async defer > </script>

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

        <div id="phone-number-label">
            <label  id="phone-number-label2" htmlFor="phoneNumber" className="p-d-block">Business Phone Number</label>
        </div>
        <br></br>

        <div id="container-phone-number">

        <div id="number-country">
     
        <Dropdown id="code-phone" value={this.state.selectedCountry} options={this.countries} onChange={this.onCountryChanged}  optionLabel="name" editable/> 

    
        </div>

        <div id="number-country2">
             <InputText id="phoneNumber" value={this.state.phoneNumber} type="tel" maxLength="10" onChange={(e) => this.setState({phoneNumber: e.target.value})} aria-describedby="phoneNumber-help" className="p-invalid p-d-block" />
                    <small id="phoneNumber-help" className="p-invalid p-d-block">{this.state.phoneNumberError}</small>
        </div>
        </div>
        
        <div id="recaptcha">
        <Recaptcha 
        sitekey="6Le2Oe4ZAAAAAIFJA4GMLgm0rHZLyhjs9Q_llL3j"
        render="explicit"
        onloadCallback={this.recaptchaLoaded}
        verifyCallback={this.verifyCallback}
      />

      
        </div>
        <div id="regis-div-button">
        <Button id="register-button" label="Register" onClick={this.handleContinue} />
        
        </div>
 
        </Card>


        </div>


        
        </div>

        <div>
            <hr id="border6" align="right" />
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