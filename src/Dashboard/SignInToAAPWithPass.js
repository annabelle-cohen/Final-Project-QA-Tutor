import React, { Component } from "react";
import { connect } from "react-redux";
import { StaySignIn } from "./staySignIn";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { saveUserAAP } from "../Actions/authAAPActions";
import { Redirect } from "react-router-dom";
import "./signintoaapwithpass.css";
import { Link } from "react-router-dom";
import "./ButtonDemo.css";

export class SignInToAAPWithPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      succededLog: false,
      isSucced: false,
      logError: "Oops! that's not a match",
    };

    this.props.saveUserAAP({
      userAAP: this.props.authAAP.userAAP,
      isLoggedIn: this.props.authAAP.isLoggedIn,
      isSignIn: false,
    });
    this.signInContinue = this.signInContinue.bind(this);
  }

  signInContinue = (e) => {
    if (this.props.authAAP.userAAP.password === this.state.password) {
      this.setState({ succededLog: false });

      const userAAP = this.props.authAAP.userAAP;

      console.log(userAAP);
      //this.displayNotifaction(true, "login succeeded!")
      this.props.saveUserAAP({
        userAAP,
        isLoggedIn: this.props.authAAP.isLoggedIn,
        isSignIn: true,
      });

      console.log("im in log in success");
      this.setState({ isSucced: true });
    } else {
      this.setState({ succededLog: true });

      const userAAP = this.props.authAAP.userAAP;

      this.props.saveUserAAP({
        userAAP,
        isLoggedIn: this.props.authAAP.isLoggedIn,
        isSignIn: false,
      });
    }
  };

  SignedIn = (e) => {
    const isLoggedIn = this.state.isSucced;
    if (isLoggedIn) {
      console.log(this.props.authAAP);
      return <Redirect to="/dashboard" />;
    }
  };

  render() {
    return (
      <div className="signInToAAPWithPass-container">
        <h3>Welcome</h3>
        {/**the email from local storage */}
        {this.props.authAAP.userAAP.email}

        {/**switch account to sign in again*/}
        <div>
          <br></br>Not you?{" "}
          <Link id="switch-account" to="/dashboard/signInToAAP">
            Switch Account
          </Link>
        </div>

        {/**enter password*/}
        <span id="password-span" className="p-float-label">
          <InputText
            id="password1"
            style={{ color: "black" }}
            placeholder="Enter Password"
            value={this.state.password}
            type="password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </span>
        <div>
          {/**password error*/}
          <div
            id="err-div"
            style={{ display: this.state.succededLog ? "block" : "none" }}
          >
            <label style={{ color: "red" }}>{this.state.logError}</label>
          </div>

          {/**forgot password button*/}
          <Link
            id="forgot-pass"
            to="/dashboard/signInToAAPWithPassword/forgotPassword"
          >
            Forgot Password?
          </Link>
        </div>

        {/**Signed In*/}
        <Button
          id="SignInToAAP-button"
          label="Sign In"
          onClick={this.signInContinue}
        />
        {this.SignedIn()}
        <div>
          {/**Stay Signed in*/}
          <StaySignIn></StaySignIn>
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

const SignInToAAPWithPassword1 = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInToAAPWithPassword);

export default connect()(SignInToAAPWithPassword1);
