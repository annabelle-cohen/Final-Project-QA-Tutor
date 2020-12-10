import React, { Component} from 'react'
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import "./signintoaap.css"
import './ButtonDemo.css';


export class StaySignIn extends Component {

    constructor(props){
        super(props);
        this.state={
            checked:true,
            isReadMore:false
        }
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


    render(){
        return(

            <div>
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
        )

    }

}