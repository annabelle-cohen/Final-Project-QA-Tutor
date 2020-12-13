import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import React, { Component } from "react";
import "./bussinesregister.css";
import "./DropdownDemo2.css";
import "./flag.css";
import { Dropdown } from "primereact/dropdown";
import "./DropdownDemo.css";
import { Link, Redirect } from "react-router-dom";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import Recaptcha from "react-recaptcha";
import { Button } from "primereact/button";
import "./ButtonDemo.css";

export class businessRegister extends Component {
  constructor(props) {
    super(props);

    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);

    this.state = {
      bussinessName: "",
      bussinessEmail: "",
      reenterEmail: "",
      passwordBussines: "",
      selectedCountry: "",
      phoneNumber: "",
      bussinesNameError: "",
      bussinessEmailError: "",
      reenterEmailError: "",
      passwordBussinesError: "",
      phoneNumberError: "",
      isServerError: "",
      serverError: "",
      isVerified: false,
      isSuccessRegisterBussines: false,
    };

    this.countries = [
      { name: "+61" },
      { name: "+55" },
      { name: "+86" },
      { name: "+20" },
      { name: "+33" },
      { name: "+49" },
      { name: "+91" },
      { name: "+81" },
      { name: "+34" },
      { name: "+1" },
    ];
  }

  onCountryChanged = (e) => {
    this.setState({
      selectedPhoneCountry: e.target.value.name,
    });
    console.log(this.state.selectedPhoneCountry);
  };

  recaptchaLoaded() {
    console.log("capcha successfully loaded");
  }

  verifyCallback(response) {
    console.log(response);
    if (response) {
      this.setState({
        isVerified: true,
      });
    }
  }

  handleSubmit = (e) => {
    //initialize the check variable to true.
    var isOk = true;

    if (this.state.bussinessName === "") {
      this.setState({
        bussinesNameError: "Please enter the business or DBA name.",
      });
      isOk = false;
    } else {
      this.setState({
        bussinesNameError: "",
      });
    }

    if (this.state.bussinessEmail === "") {
      this.setState({
        bussinessEmailError: "Please enter your email address.",
      });
      isOk = false;
    } else {
      this.setState({
        bussinessEmailError: "",
      });
    }

    if (this.state.reenterEmail === "") {
      console.log("reenter email err");
      this.setState({
        reenterEmailError: "Don't forget to reenter your email address!",
      });
      isOk = false;
    } else {
      this.setState({
        reenterEmailError: "",
      });
    }

    if (this.state.passwordBussines === "") {
      this.setState({ passwordBussinesError: "Please enter your password." });
      isOk = false;
    } else {
      this.setState({ passwordBussinesError: "" });
    }

    if (this.state.selectedCountry === "" || this.state.phoneNumber === "") {
      this.setState({ phoneNumberError: "Phone number Cann't be empty!" });
      isOk = false;
    } else {
      var numbers = /^[0-9]+$/;
      if (this.state.phoneNumber.match(numbers)) {
        console.log("im here in if");
        this.setState({ phoneNumberError: "" });
      } else {
        isOk = false;
        this.setState({ phoneNumberError: "Number must include only digits!" });
      }
    }

    if (this.state.bussinessEmail !== this.state.reenterEmail) {
      isOk = false;
      this.setState({
        reenterEmailError: "Reenter email must be match to business email",
      });
    } else {
      this.setState({
        reenterEmailError: "",
      });
    }

    if (isOk && this.state.isVerified) {
      const main = "http://localhost:8092//";
      const registerBussines = main + "/acs/business";

      const userBussines = {
        email: this.state.bussinessEmail,
        password: this.state.passwordBussines,
        businessName: this.state.bussinessName,
      };

      const dataJson = JSON.stringify(userBussines);

      fetch(registerBussines, {
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
            this.setState({ isSuccessRegisterBussines: true });
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

  isRegisterBussines() {
    if (this.state.isSuccessRegisterBussines) {
      return <Redirect to="/dashboard"></Redirect>;
    }
  }

  handleGoogleClientLoad() {
    console.log("Success on load");
  }
  componentDidMount() {
    <script
      src="https://www.google.com/recaptcha/api.js?render=explicit"
      async
      defer
    >
      {" "}
    </script>;
  }

  render() {
    return (
      <div className="register-bussiness-container">
        <label id="logo-aap">Logo in future</label>

        <div className="register-form">
          <div id="link-to-sign-in2">
            <Link id="sign-in-link" to="/dashboard/signInToAAP">
              <i
                id="chevron-icon"
                className="pi pi-chevron-circle-right"
                iconPos="left"
              ></i>
              Sign In
            </Link>
            {/*<i id="chevron-circle-icon"  className="pi pi-chevron-circle-right"></i>*/}
          </div>

          <div id="link-to-register2">
            <Link
              id="register-link"
              to="/dashboard/registerToAAP/businessregister"
            >
              <i
                id="icon-plus"
                className="pi pi-plus-circle"
                iconPos="left"
              ></i>
              Register
            </Link>
          </div>

          <div className="second-title-bussines">
            <Card className="card-form">
              <p id="p-register-bussiness">
                Register a business account
                <br></br>
                <Link
                  id="create-personal-account"
                  to="/dashboard/registerToAAP"
                >
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
              <div id="container-input">
                <div className="p-field">
                  <label htmlFor="bussinessName" className="p-d-block">
                    Legal business name
                  </label>
                  <InputText
                    id="bussinessName"
                    value={this.state.bussinessName}
                    onChange={(e) =>
                      this.setState({ bussinessName: e.target.value })
                    }
                    aria-describedby="bussinessName-help"
                    className="p-invalid p-d-block"
                  />
                  <small
                    id="bussinessName-help"
                    className="p-invalid p-d-block"
                  >
                    {this.state.bussinesNameError}
                  </small>
                </div>

                <div className="p-field">
                  <label htmlFor="bussinessEmail" className="p-d-block">
                    Legal business email
                  </label>
                  <InputText
                    id="bussinessEmail"
                    value={this.state.bussinessEmail}
                    onChange={(e) =>
                      this.setState({ bussinessEmail: e.target.value })
                    }
                    aria-describedby="bussinessEmail-help"
                    className="p-invalid p-d-block"
                  />
                  <small
                    id="bussinessEmail-help"
                    className="p-invalid p-d-block"
                  >
                    {this.state.bussinessEmailError}
                  </small>
                </div>

                <div className="p-field">
                  <label htmlFor="reenterEmail" className="p-d-block">
                    Reenter email
                  </label>
                  <InputText
                    id="reenterEmail"
                    value={this.state.reenterEmail}
                    onChange={(e) =>
                      this.setState({ reenterEmail: e.target.value })
                    }
                    aria-describedby="reenterEmail-help"
                    className="p-invalid p-d-block"
                  />
                  <small id="reenterEmail-help" className="p-invalid p-d-block">
                    {this.state.reenterEmailError}
                  </small>
                </div>

                <div className="p-field">
                  <label htmlFor="passwordBussines" className="p-d-block">
                    Password
                  </label>
                  <InputText
                    id="passwordBussines"
                    type="password"
                    value={this.state.passwordBussines}
                    onChange={(e) =>
                      this.setState({ passwordBussines: e.target.value })
                    }
                    aria-describedby="passwordBussines-help"
                    className="p-invalid p-d-block"
                  />
                  <small
                    id="passwordBussines-help"
                    className="p-invalid p-d-block"
                  >
                    {this.state.passwordBussinesError}
                  </small>
                </div>

                <div id="phone-number-label">
                  <label
                    id="phone-number-label2"
                    htmlFor="phoneNumber"
                    className="p-d-block"
                  >
                    Business Phone Number
                  </label>
                </div>
                <br></br>

                <div id="container-phone-number">
                  <div id="number-country">
                    <Dropdown
                      id="code-phone"
                      value={this.state.selectedCountry}
                      options={this.countries}
                      onChange={(e) =>
                        this.setState({ selectedCountry: e.target.value.name })
                      }
                      optionLabel="name"
                      editable
                    />
                  </div>

                  <div id="number-country2">
                    <InputText
                      id="phoneNumber"
                      value={this.state.phoneNumber}
                      type="tel"
                      maxLength="10"
                      onChange={(e) =>
                        this.setState({ phoneNumber: e.target.value })
                      }
                      aria-describedby="phoneNumber-help"
                      className="p-invalid p-d-block"
                    />
                    <small
                      id="phoneNumber-help"
                      className="p-invalid p-d-block"
                    >
                      {this.state.phoneNumberError}
                    </small>
                  </div>
                </div>
              </div>
              <div id="recaptcha">
                <Recaptcha
                  sitekey="6Le2Oe4ZAAAAAIFJA4GMLgm0rHZLyhjs9Q_llL3j"
                  render="explicit"
                  id="recapatcha2"
                  onloadCallback={this.recaptchaLoaded}
                  verifyCallback={this.verifyCallback}
                />
              </div>
              <div id="regis-div-button">
                <Button
                  id="register-button"
                  label="Register"
                  onClick={this.handleSubmit}
                />
              </div>
              {this.isRegisterBussines()}
              <small
                id="server-help"
                className="p-invalid p-d-block"
                style={{ fontSize: 14 + "px", marginTop: 10 + "px" }}
              >
                {this.state.serverError}
              </small>
            </Card>
          </div>
        </div>

        <div>
          <hr id="border6" align="right" />
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
