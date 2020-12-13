import React, { Component } from "react";
import { connect } from "react-redux";
import { InputText } from "primereact/inputtext";
import { saveUserAAP } from "../Actions/authAAPActions";
import "./forgotpassword.css";
import { Redirect } from "react-router-dom";
import "./ButtonDemo.css";
import { saveUser } from "../Actions/authActions";
import { Button } from "primereact/button";

export class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newPassword: "",
      verifyPassword: "",
      newPasswordError: "Field cann't be empty",
      verifyError: "The passwords are not matching",
      isShowNewPassError: false,
      isShowVerifyError: false,
      isSuccesReset: false,
      isVerifyEmail: false,
    };

    this.props.saveUser({
      user: this.props.auth.user,
      isLoggedIn: this.props.auth.isLoggedIn,
    });

    this.props.saveUserAAP({
      userAAP: this.props.authAAP.userAAP,
      isLoggedIn: this.props.authAAP.isLoggedIn,
      isSignIn: false,
    });

    this.handleSubmitNewPassword = this.handleSubmitNewPassword.bind(this);
  }

  handleSubmitNewPassword = (e) => {
    if (this.state.newPassword !== "") {
      this.setState({ isShowNewPassError: false });
      if (this.state.newPassword === this.state.verifyPassword) {
        this.setState({ isShowVerifyError: false });
        const userAAPNew = {
          email: this.props.authAAP.userAAP.email,
          firstName: this.props.authAAP.userAAP.firstName,
          lastName: this.props.authAAP.userAAP.lastName,
          password: this.state.newPassword,
        };

        const userNew = {
          avatar: this.props.auth.avatar,
          email: this.props.auth.email,
          roleEnum: this.props.auth.roleEnum,
          username: this.props.auth.username,
          password: this.state.newPassword,
        };

        const main = "http://localhost:8092//";
        const resetPassword = main + "/acs/users/updatePassword/";
        const verifyEmail = main + "/acs/users/verify/";
        //prepare the jason for the server
        const data = { password: userAAPNew.password };
        const dataJson = JSON.stringify(data);

        fetch(verifyEmail + userAAPNew.email)
          .then((response) => {
            if (response.status === 200) {
              response.json().then((d) => {
                //check if email exist in the system
                if (d) {
                  fetch(resetPassword + userAAPNew.email, {
                    method: "PUT", // or 'PUT'
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: dataJson,
                  }).then(
                    (response) => {
                      if (response.status === 200) {
                        //save that we verify
                        this.setState({ isSuccesReset: true });

                        //save the changes
                        this.props.saveUserAAP({
                          userAAP: userAAPNew,
                          isLoggedIn: this.props.authAAP.isLoggedIn,
                          isSignIn: false,
                        });

                        //save the changes
                        this.props.saveUser({
                          userNew,
                          isLoggedIn: this.props.auth.isLoggedIn,
                        });
                      } else {
                        response.json().then((x) => {
                          console.log(x);
                          this.setState({ isSuccesReset: false });
                        });
                      }
                    },
                    (error) => {
                      console.log(error);
                      this.setState({ isSuccesReset: false });
                    }
                  );
                }
              });
            } else {
              console.log("Error:", response);
              response.json().then((d) => {
                console.log("Errordata", d);
              });
            }
          })
          .catch((error) => {
            console.log(error.data);
          });
      } else {
        this.setState({ isShowVerifyError: true });
      }
    } else {
      this.setState({ isShowNewPassError: true });
    }
  };

  ResetIsSuccess = (e) => {
    const isReset = this.state.isSuccesReset;
    if (isReset) {
      console.log(this.props.authAAP);
      return <Redirect to="/dashboard" />;
    }
  };

  render() {
    return (
      <div className="forgotpassword-container">
        <h3>Reset Password</h3>
        <div className="input-new-password">
          <span id="new-password-span" className="p-float-label">
            {/**new password input*/}
            <InputText
              id="new-password"
              style={{ color: "black" }}
              placeholder="Enter New Password"
              value={this.state.newPassword}
              type="password"
              onChange={(e) => this.setState({ newPassword: e.target.value })}
            />

            {/**new password error*/}
            <div
              id="err-div"
              style={{
                display: this.state.isShowNewPassError ? "block" : "none",
              }}
            >
              <label style={{ color: "red" }}>
                {this.state.newPasswordError}
              </label>
            </div>
          </span>

          <span id="verify-password-span" className="p-float-label">
            {/**verify password input*/}
            <InputText
              id="verify-password"
              style={{ color: "black" }}
              placeholder="Verify Password"
              value={this.state.verifyPassword}
              type="password"
              onChange={(e) =>
                this.setState({ verifyPassword: e.target.value })
              }
            />

            {/**verify password error*/}
            <div
              id="err-div"
              style={{
                display: this.state.isShowVerifyError ? "block" : "none",
              }}
            >
              <label style={{ color: "red" }}>{this.state.verifyError}</label>
            </div>
          </span>

          {/**Submit new password*/}
          <Button
            id="Submit-new-password-button"
            label="Submit"
            onClick={this.handleSubmitNewPassword}
          />
          {this.ResetIsSuccess()}
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

const ForgotPassword1 = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);

export default connect()(ForgotPassword1);