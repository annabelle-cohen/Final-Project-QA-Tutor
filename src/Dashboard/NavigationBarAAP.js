import React, { Component } from "react";
import { connect } from "react-redux";
import { saveUserAAP } from "../Actions/authAAPActions";
import "./style.css";
import "./DropdownDemo.css";
import { Button } from "primereact/button";
import "./ButtonDemo.css";
import "./CarouselDemo.css";
import "./TabViewDemo.css";
import { Redirect } from "react-router-dom";
import { Link, Route, NavLink } from "react-router-dom";

export class NavigationBarAAP extends Component {
  constructor(props) {
    super(props);

    this.props.saveUserAAP({
      userAAP: this.props.authAAP.userAAP,
      isLoggedIn: this.props.authAAP.isLoggedIn,
      isSignIn: this.props.authAAP.isSignIn,
    });
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut = (e) => {
    this.props.saveUserAAP({
      userAAP: {},
      isLoggedIn: this.props.authAAP.isLoggedIn,
      isSignIn: false,
    });
  };

  render() {
    return (
      <div id="first-row">
        {" "}
        &nbsp; &nbsp; Hi!{" "}
        <a
          id="home_signIn"
          href="/dashboard/signInToAAP"
          style={{
            display: this.props.authAAP.isSignIn ? "none" : "inline-block",
          }}
        >
          Sign in
        </a>{" "}
        <div
          style={{
            display: this.props.authAAP.isSignIn ? "none" : "inline-block",
          }}
        >
          or
        </div>{" "}
        <a
          id="home_register"
          href="/dashboard/registerToAAP"
          style={{
            display: this.props.authAAP.isSignIn ? "none" : "inline-block",
          }}
        >
          register
        </a>
        {/*watchlist drop down*/}
        <div
          id="profile-div-drop"
          className="dropDown1"
          style={{
            display: this.props.authAAP.isSignIn ? "inline-block" : "none",
          }}
        >
          <Button
            id="profile-div"
            label={this.props.authAAP.userAAP.firstName}
            icon="pi pi-angle-down"
            iconPos="right"
            className="p-button-secondary p-button-text"
          />
          <div className="dropDown-menu">
            <div className="profile-option">
              {this.props.authAAP.userAAP.firstName}&nbsp;
              {this.props.authAAP.userAAP.lastName}
              <div>
                {this.props.authAAP.userAAP.firstName}
                {this.props.authAAP.userAAP.lastName}'(rating)'
              </div>
              <div id="profile-buttons-nav">
                <Link id="account-setting" to="/dashboard/accountsetting">
                  Account Setting
                </Link>
                <br></br>
                <Button
                  id="sign-out"
                  label="Sign Out"
                  onClick={this.handleSignOut}
                  className="p-button-link"
                />
              </div>
            </div>
          </div>
        </div>
        &nbsp;
        <a id="home_dailydeals" href="url" color="black">
          Daily Deals
        </a>{" "}
        &nbsp;{" "}
        <a id="home_helpconatct" href="url" color="black">
          Help&Contact
        </a>
        <a id="home_ship" href="url" color="black">
          Ship to
        </a>
        {/*watchlist drop down*/}
        <div className="dropDown1">
          <Button
            id="watchlist"
            label="Watchlist"
            icon="pi pi-angle-down"
            iconPos="right"
            className="p-button-secondary p-button-text"
          />
          <div className="dropDown-menu">
            <div
              className="msg_watchlist"
              style={{
                display: this.props.authAAP.isSignIn ? "none" : "block",
              }}
            >
              Please&nbsp;
              <a id="sign-in-msg" href="/dashboard/signInToAAP">
                Sign In
              </a>
              &nbsp;to view items you are watching.
            </div>

            <div
              className="msg_watchlist2"
              style={{
                display: this.props.authAAP.isSignIn ? "block" : "none",
              }}
            >
              Looks like you are not watching any items yet.
            </div>
          </div>
        </div>
        {/*myAAP drop down*/}
        <div className="dropDown2">
          <Button
            id="My_AAP"
            label="My AAP"
            icon="pi pi-angle-down"
            iconPos="right"
            className="p-button-secondary p-button-text"
          />
          <div id="myDropdown" class="dropdown_aap">
            <a className="dropdown_aap_content" href="url">
              Summary
            </a>
            <a className="dropdown_aap_content" href="url">
              Recently Viewed
            </a>
            <a className="dropdown_aap_content" href="url">
              Bids/offers
            </a>
            <a className="dropdown_aap_content" href="url">
              Watchlist
            </a>
            <a className="dropdown_aap_content" href="url">
              Purchase History
            </a>
            <a className="dropdown_aap_content" href="url">
              Buy again
            </a>
            <a className="dropdown_aap_content" href="url">
              Selling
            </a>
            <a className="dropdown_aap_content" href="url">
              Saved Searches
            </a>
            <a className="dropdown_aap_content" href="url">
              Save sellers
            </a>
            <a className="dropdown_aap_content" href="url">
              Messages
            </a>
          </div>
        </div>
        {/*notification drop down*/}
        <div className="dropDown3">
          <Button
            id="notification"
            icon="pi pi-bell"
            className="p-button-secondary p-button-text"
          />
          <div id="msg_notifications" class="dropdown_notofication">
            <p
              id="notfication-p"
              style={{
                display: this.props.authAAP.isSignIn ? "none" : "block",
              }}
            >
              Please&nbsp;
              <a id="sign-in-msg2" href="/dashboard/signInToAAP">
                Sign In
              </a>
              &nbsp;to view<br></br> notification.
            </p>
            <p
              id="notfication-p2"
              style={{
                display: this.props.authAAP.isSignIn ? "block" : "none",
              }}
            >
              You're all caught up!
            </p>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveUserAAP: (userAAP) => dispatch(saveUserAAP(userAAP)),
  };
}

const mapStateToProps = (state) => {
  return { authAAP: state.authAAP };
};

const NavigationBarAAP1 = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBarAAP);

export default connect()(NavigationBarAAP1);
