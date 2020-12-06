import React, { Component } from 'react'
import './style.css'
import './DropdownDemo.css';
import { Button } from 'primereact/button';
import './ButtonDemo.css';
import './CarouselDemo.css';
import './TabViewDemo.css';


export class NavigationBarAAP extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(


            <div id="first-row"> &nbsp;
            &nbsp; Hi! <a id="home_signIn" href="/dashboard/signInToAAP">Sign in</a> or  <a id="home_register" href="/dashboard/registerToAAP">register</a>  &nbsp;
            <a id="home_dailydeals" href="url" color="black">Daily Deals</a>  &nbsp; <a id="home_helpconatct" href="url" color="black">Help&Contact</a>
                      <a id="home_ship" href="url" color="black">Ship to</a>
      
                      {/*watchlist drop down*/}
                      <div className="dropDown1">
                      <Button id="watchlist" label="Watchlist" icon="pi pi-angle-down" iconPos="right" className="p-button-secondary p-button-text" />
                          <div className="dropDown-menu">
                              <div className="msg_watchlist">
                                  Please&nbsp;<a id="sign-in-msg" href="url">Sign In</a>&nbsp;to view items you are watching.
                              </div>
                          </div>
                      </div>
  
                       {/*myAAP drop down*/}
                      <div className="dropDown2">
                      <Button id="My_AAP" label="My AAP" icon="pi pi-angle-down" iconPos="right" className="p-button-secondary p-button-text" />
                          <div id="myDropdown" class="dropdown_aap">
                              <a className="dropdown_aap_content" href="url">Summary</a>
                              <a className="dropdown_aap_content" href="url">Recently Viewed</a>
                              <a className="dropdown_aap_content"  href="url">Bids/offers</a>
                              <a className="dropdown_aap_content" href="url">Watchlist</a>
                              <a className="dropdown_aap_content"  href="url">Purchase History</a>
                              <a className="dropdown_aap_content"  href="url">Buy again</a>
                              <a className="dropdown_aap_content"  href="url">Selling</a>
                              <a className="dropdown_aap_content"  href="url">Saved Searches</a>
                              <a className="dropdown_aap_content"  href="url">Save  sellers</a>
                              <a className="dropdown_aap_content"  href="url">Messages</a>
                           </div>
                      </div>
  
                      {/*notification drop down*/}
                      <div className="dropDown3">
                          <Button id="notification"  icon="pi pi-bell"  className="p-button-secondary p-button-text" />
                               <div id="msg_notifications" class="dropdown_notofication">
                               Please&nbsp;<a id="sign-in-msg2" href="url">Sign In</a>&nbsp;to view<br></br> notification.
                               </div>
                      </div>
                  </div>
        );
    }
}