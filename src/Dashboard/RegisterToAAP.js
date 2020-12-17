import React, { Component } from "react";
import { Button } from "primereact/button";
import { Link, Redirect } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import "./registertoaap.css";
import "./ButtonDemo.css";

export class RegisterToAAP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      passwordError: "",
      serverError: "",
      isServerError: false,
      isFill: true,
      isSuccedRegister: false,
    };
  }
  handleClick = (e) => {
    console.log("click");
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
    this.setState({ isFill: false });
  };

  handleCreateAccount = (e) => {
    //initialize for new checking

    var letterNumber = /^[0-9a-zA-Z]+$/;

    let check = {
      isFirstNameValid: false,
      isLastNameValid: false,
      isEmailValid: false,
      isPasswordValid: false,
      isPasswordInFormat: false,
      isFine: false,
    };

    if (this.state.firstName === "") {
      check.isFirstNameValid = false;
      this.setState({ firstNameError: "first name cann't be null" });
    } else {
      check.isFirstNameValid = true;
      this.setState({ firstNameError: "" });
    }

    if (this.state.lastName === "") {
      check.isLastNameValid = false;
      this.setState({ lastNameError: "Last name cann't be empty" });
    } else {
      check.isLastNameValid = true;
      this.setState({ lastNameError: "" });
    }

    if (this.state.email === "") {
      check.isEmailValid = false;
      this.setState({ emailError: "Email cann't be empty" });
    } else {
      check.isEmailValid = true;
      this.setState({ emailError: "" });
    }

    if (this.state.password === "") {
      check.isPasswordValid = false;
      this.setState({ passwordError: "Password cann't be empty" });
    } else {
      check.isPasswordValid = true;
      this.setState({ passwordError: "" });

      if (
        (check.isPasswordValid &&
          this.state.password.length >= 5 &&
          this.state.password.match("[0-9]+[a-z]+[A-Z]*")) ||
        this.state.password.match("[a-z]+[A-Z]*[0-9]+")
      ) {
        check.isPasswordInFormat = true;
        this.setState({
          passwordError: "",
        });
      } else {
        check.isPasswordInFormat = false;
        this.setState({
          passwordError:
            "Password must include digits and letters and at least 5 characters",
        });
      }
    }

    if (
      check.isFirstNameValid &&
      check.isLastNameValid &&
      check.isEmailValid &&
      check.isPasswordValid &&
      check.isPasswordInFormat
    ) {
      check.isFine = true;
    }

    if (check.isFine) {
      const main = "http://localhost:8092//";
      const register = main + "/acs/users";

      const user = {
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        password: this.state.password,
      };

      const dataJson = JSON.stringify(user);

      fetch(register, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: dataJson,
      }).then(
        (response) => {
          if (response.status === 200) {
            this.setState({ isServerError: false });
            this.setState({ serverError: "" });
            this.setState({ isSuccedRegister: true });
          } else {
            response.json().then((x) => {
              console.log(x);
              this.setState({ isServerError: true });
              this.setState({ serverError: x.message });
            });
          }
        },
        (error) => {
          console.log(error);
          this.setState({ isServerError: true });
          this.setState({ serverError: error.message });
        }
      );
    }
  };

  isRegister = (e) => {
    if (this.state.isSuccedRegister) {
      return <Redirect to="/dashboard"></Redirect>;
    }
  };

  render() {
    const submitDisabled = this.state.isFill;
    return (
      <div className="div-container-register">
        <div className="already-exist">
          Already a member? &nbsp;
          <Link
            to="/dashboard/signInToAAP"
            id="signIn-link"
            className="p-button-link"
          >
            Sign In
          </Link>
        </div>
        <div className="Create-Account">
          <label id="create-account-title">Create an account</label>
          <p>
            Have a business?&nbsp;
            <Link
              to="/dashboard/registerToAAP/businessregister"
              id="business-link"
              className="p-button-link"
            >
              Create a business account
            </Link>
          </p>
        </div>

        <div className="first-row-name">
          <div id="first-name-field" className="p-float-label">
            <InputText
              id="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
            <label id="firstName-label-regis" htmlFor="firstName">
              First Name
            </label>
            {/*for submit check*/}
            <small id="username2-help" className="p-invalid p-d-block">
              {this.state.firstNameError}
            </small>
          </div>

          <div id="last-name-field" className="p-float-label">
            <InputText
              id="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
            <label id="lastName-label-regis" htmlFor="lastName">
              Last Name
            </label>
            {/*for submit check*/}
            <small id="username2-help" className="p-invalid p-d-block">
              {this.state.lastNameError}
            </small>
          </div>

          <span id="email-field" className="p-float-label">
            <InputText
              id="email"
              value={this.state.email}
              style={{ color: "gray" }}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            <label id="email-label-regis" htmlFor="email">
              Email
            </label>
            {/*for submit check*/}
            <small id="username2-help" className="p-invalid p-d-block">
              {this.state.emailError}
            </small>
          </span>

          <span id="password-field" className="p-float-label">
            <InputText
              id="pass-register-input"
              type="password"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <label id="password-label-regis" htmlFor="password">
              Password
            </label>
            {/*for submit check*/}
            <small id="username2-help" className="p-invalid p-d-block">
              {this.state.passwordError}
            </small>
          </span>
        </div>

        <div>
          <div style={{ display: this.state.isServerError ? "block" : "none" }}>
            {/*server error*/}
            <small
              id="username2-help"
              className="p-invalid p-d-block"
              style={{
                marginLeft: 400 + "px",
                fontSize: 14 + "px",
                marginTop: 240 + "px",
              }}
            >
              {this.state.serverError}
            </small>
          </div>
        </div>
        <div className="vertical-container">
          {/*div for vertical line*/}
          <div id="div-line-vertical">
            <div class="vl"></div>
            <div class="vl1">or</div>
            <div class="vl2"></div>
          </div>

          {/*div for vertical buttons*/}
          <div id="div-buttons-vertival">
            <div className="facebook-button2">
              <Button
                disabled={submitDisabled}
                id="submit-form"
                label="Create account"
                onClick={this.handleCreateAccount}
                className="p-button-sm"
              />
            </div>
            <div className="google-button2">
              <Button
                id="login-with-google2"
                label="Continue with Google"
                icon="pi pi-google"
                className="p-button-sm"
              />
            </div>
          </div>
          {this.isRegister()}
        </div>

        <div>
          <hr id="border5" align="right" />
        </div>

        <div id="copy-right">
          Copyright © 2020-2021 AAP Inc. All Rights Reserved.{" "}
          <a id="User_Agreement" href="url" color="black">
            User Agreement
          </a>
          ,
          <a id="Privacy" href="url" color="black">
            Privacy
          </a>
          ,
          <a id="Cookies" href="url" color="black">
            Cookies
          </a>{" "}
          ,
          <a id="personal_information" href="url" color="black">
            Do not sell my personal information
          </a>{" "}
          and{" "}
          <a id="AdChoice" href="url" color="black">
            AdChoice
          </a>
          <i id="info_circle" className="pi pi-info-circle"></i>
        </div>
      </div>
    );
  }
}
