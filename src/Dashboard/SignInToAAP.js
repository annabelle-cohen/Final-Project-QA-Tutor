import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import {saveUserAAP} from '../Actions/authAAPActions'
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import "./signintoaap.css"
import './ButtonDemo.css';

export class SignInToAAP extends Component {

    constructor(props){
        super(props);
        this.state={
            userName:null,
            checked:true,
            isReadMore:false,
            succeded: false,
            isLoggedIn: false,
            continue:false,
            succededLog:false,
            logError:"User doesn't exists!"
        };

        this.props.saveUserAAP({ userAAP:{} ,isLoggedIn:false});
        this.handleContinue = this.handleContinue.bind(this);

    }

    handleClick = (e)=>{
        if(this.state.isReadMore){
            this.setState({isReadMore:false});
            console.log(this.state);
        }else{
            this.setState({isReadMore:true});
            console.log(this.state);
        }
    }

    handleContinue = (e) =>{
        e.preventDefault();
      
        fetch('http://localhost:8092//acs/users/login/'+this.state.userName)
        .then(response => {
          if (response.status===200){
            this.setState({succeded:true})
            response.json().then((d)=>{
            const userAAP = d;
    
             //this.displayNotifaction(true, "login succeeded!")
             this.props.saveUserAAP({ userAAP , isLoggedIn:true});

        this.setState({isLoggedIn:true})
            })
          }else {
            console.log('Error:', response);
            response.json().then((d)=>{
            //  this.displayNotifaction(false, d.message);
              this.setState({succededLog:true})
              console.log(this.state.succededLog);
              console.log("Errordata", d)
             })
          }
          this.setState({continue:true})
        })
        .catch((error) => {
         // console.error('Error:', error.data);
         console.log(error.data);
        });
        
        
      }


      loggedIn() {
        const isLoggedIn = this.state.isLoggedIn
        if (isLoggedIn) {
         console.log(this.props.authAAP);
          return <Redirect  to="/dashboard/signInToAAP/signInToAAPWithPassword" />
    
         }
        }
      
      


    render() {


        return (
            <div className="signInToAAP-container">
            <h3>Hello</h3>
            <div className="title-1-sign-in-to-aap">
                    Sign in to AAP or&nbsp;<Link id="link-to-register" to="/dashboard/registerToAAP">create an account</Link>
            </div>


            <span id="username-span" className="p-float-label">
                <InputText id="username" value={this.state.userName} onChange={(e) => this.setState({userName: e.target.value})} />
                <label htmlFor="username">Email or username</label>
            </span>
            <div id="err-div" style={{display:this.state.succededLog?"block":"none"}}>
                     <label style={{color:"red"}}>{this.state.logError}</label>
                </div>

            <Button id="continue-button" label="Continue" onClick={this.handleContinue} />
            {this.loggedIn()}
            <div className="border-title-2">
            <div className="border1">
            <hr id="border-title-or1" align="right" />
            </div>or<div className="border2"><hr id="border-title-or2" align="right" /></div>
            </div>
            <div className="facebook-button">
            <Button id="login-with-facebook" label="Conitnue with Facebook" icon="pi pi-facebook" className="p-button-sm"  />
            </div>
            <div className="google-button">
            <Button id="login-with-google" label="Continue with Google" icon="pi pi-google" className="p-button-sm"  />
            </div>
            <div id="chekbox" className="p-field-checkbox">
                    <Checkbox id="checkbox-button" inputId="binary" checked={this.state.checked} onChange={e => this.setState({ checked: e.checked })} />
                    <label id="label-checkbox" htmlFor="binary">Stay signed in</label>
            </div>
            <label  id="label-checkbox">   
                    Using a public or shared device?<br></br>
                    Uncheck to protect your account.</label>
            <div>
            <Button id="button-read-more" label={this.state.isReadMore?"Show less":"Learn more"} onClick={this.handleClick} ></Button>
            </div>
            <span id="more" style={{display:this.state.isReadMore? "block" : "none"}}>
                <div className="container-read-more">
                        <div className="for-icon">
                             <i id="info-icon" className="pi pi-info-circle"></i>
                     </div>
                     <div className="content-read-more">
                         With this box checked, we'll keep you signed in, making it easier to bid and buy.
                         You'll also be all set to pay if you've saved your payment info. You can always
                          turn off this feature in My eBay.
                          We may ask you to sign in again for some activities, 
                          such as making changes to your account.
                          </div>
                </div>
            </span>
            <div>
                    <hr id="border4" align="right" />
            </div>

            <div id="copy-right">
            Copyright © 2020-2021 AAP Inc. All Rights Reserved. <a id="User_Agreement" href="url" color="black">User Agreement</a>, 
            <a id="Privacy" href="url" color="black">Privacy</a>,
            <a id="Cookies" href="url" color="black">Cookies</a> ,
            <a id="personal_information" href="url" color="black">Do not sell my personal information</a> and <a id="AdChoice" href="url" color="black">AdChoice</a> 
            <i id="info_circle" className="pi pi-info-circle"></i>
            </div>

        </div>
           
            );
    }

}


function mapDispatchToProps(dispatch) {
    return {
      saveUserAAP: userAAP => dispatch(saveUserAAP(userAAP))
    };
  }
  
  
  const mapStateToProps = state => {
    return { authAAP: state.authAAP };
  };
  
  const LoginToAAP = connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignInToAAP);

  export default LoginToAAP