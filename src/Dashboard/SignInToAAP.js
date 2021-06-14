import React, { Component } from "react";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { saveUserAAP } from "../Actions/authAAPActions";
import { saveUser } from "../Actions/authActions";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import StaySignIn from "./staySignIn";
import "./signintoaap.css";
import "./ButtonDemo.css";
import { domainUrl } from "../requests";

export class SignInToAAP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      checked: true,
      isReadMore: false,
      succeded: false,
      isLoggedIn: false,
      continue: false,
      succededLog: false,
      logError: "User doesn't exists!",
    };

    this.props.saveUserAAP({ userAAP: {}, isLoggedIn: false });
    this.handleContinue = this.handleContinue.bind(this);
  }

  handleClick = (e) => {
    if (this.state.isReadMore) {
      this.setState({ isReadMore: false });
      console.log(this.state);
    } else {
      this.setState({ isReadMore: true });
      console.log(this.state);
    }
  };

  handleContinue = async (e) => {
    e.preventDefault();

    //example for another file that will include all fetch to server.
    if (this.state.userName !== this.props.auth.user.email) {
      this.setState({
        succededLog: true,
        logError: "You try to login to aap with user that isn't yours!",
      });
    } else {
      const login = domainUrl + "//acs/users/login/";
      await fetch(login + this.state.userName)
        .then((response) => {
          if (response.status === 200) {
            this.setState({ succeded: true });
            response.json().then((d) => {
              const userAAP = d;

              //this.displayNotifaction(true, "login succeeded!")
              this.props.saveUserAAP({ userAAP, isLoggedIn: true });

              this.setState({ isLoggedIn: true });
            });
          } else {
            console.log("Error:", response);
            response.json().then((d) => {
              //  this.displayNotifaction(false, d.message);
              this.setState({ succededLog: true });
              this.setState({
                succededLog: true,
                logError: "User doesn't exist!",
              });
              console.log(this.state.succededLog);
              console.log("Errordata", d);
            });
          }
          this.setState({ continue: true });
        })
        .catch((error) => {
          // console.error('Error:', error.data);
          console.log(error.data);
        });
    }
  };

  loggedIn() {
    const isLoggedIn = this.state.isLoggedIn;
    if (isLoggedIn) {
      console.log(this.props.authAAP);
      return <Redirect to="/dashboard/signInToAAPWithPassword" />;
    }
  }

  render() {
    return (
      <div className="signInToAAP-container">
        <h3>Hello</h3>
        <div className="title-1-sign-in-to-aap">
          Sign in to AAP or&nbsp;
          <Link id="link-to-register" to="/dashboard/registerToAAP">
            create an account
          </Link>
        </div>

        <span id="username-span" className="p-float-label">
          <InputText
            id="username"
            value={this.state.userName}
            onChange={(e) => this.setState({ userName: e.target.value })}
          />
          <label id="label-user-name" htmlFor="username">
            Email or username
          </label>
        </span>
        <div
          id="err-div"
          style={{ display: this.state.succededLog ? "block" : "none" }}
        >
          <label style={{ color: "red" }}>{this.state.logError}</label>
        </div>

        <Button
          id="continue-button"
          label="Continue"
          onClick={this.handleContinue}
        />
        {this.loggedIn()}
        <div className="border-title-2">
          <div className="border1">
            <hr id="border-title-or1" align="right" />
          </div>
          or
          <div className="border2">
            <hr id="border-title-or2" align="right" />
          </div>
        </div>
        <div className="facebook-button">
          <Button
            id="login-with-facebook"
            label="Conitnue with Facebook"
            icon="pi pi-facebook"
            className="p-button-sm"
          />
        </div>
        <div className="google-button">
          <Button
            id="login-with-google"
            label="Continue with Google"
            icon="pi pi-google"
            className="p-button-sm"
          />
        </div>

        <div>
          <StaySignIn></StaySignIn>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveUserAAP: (userAAP) => dispatch(saveUserAAP(userAAP)),
    saveUser: (user) => dispatch(saveUser(user)),
  };
}

const mapStateToProps = (state) => {
  return { authAAP: state.authAAP, auth: state.auth };
};

const LoginToAAP = connect(mapStateToProps, mapDispatchToProps)(SignInToAAP);

export default LoginToAAP;
