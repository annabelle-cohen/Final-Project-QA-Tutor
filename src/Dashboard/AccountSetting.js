import React, { Component } from "react";
import NavigationBarAAP from "./NavigationBarAAP";
import { Card } from "primereact/card";
import { saveUserAAP } from "../Actions/authAAPActions";
import { savePersonalInfo } from "../Actions/authPersonalInfo";
import { connect } from "react-redux";
import { avatar } from "../Asset/default_profile_pic";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Button } from "primereact/button";
import { Redirect } from "react-router-dom";
import "./accountsetting.css";
import {domainUrl} from '../requests'
class AccountSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      country: "",
      city: "",
      phone: "",
      avatar: "",
      firstName: "",
      lastName: "",
      billingAddress: "",
      ownerID: "",
      expDate: "",
      creditNumber: "",
      cvv: "",
      firstError: "",
      lastNameError: "",
      addressError: "",
      countryError: "",
      cityError: "",
      phoneError: "",
      billingError: "",
      ownerIdError: "",
      expDateError: "",
      creditError: "",
      cvvError: "",
    };

    this.possible_avatar = {
      avatar: "check",
    };

    this.props.saveUserAAP({
      isLoggedIn: this.props.authAAP.isLoggedIn,
      isSignIn: this.props.authAAP.isSignIn,
      userAAP: this.props.authAAP.userAAP,
    });

    this.props.savePersonalInfo({
      isPersonalInfoExist: this.props.personalInfo.isPersonalInfoExist,
      personalInfo: {},
      billingInfos: {},
    });

    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.checkIfIsPersonalInfo = this.checkIfIsPersonalInfo.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
    this.billingInfoFromServer();
    this.checkIfIsPersonalInfo();
  }

  fileChangedHandler = (e) => {
    this.possible_avatar.avatar = e.target.files[0].name;
  };

  uploadHandler = (e) => {
    this.setState({ avatar: this.possible_avatar.avatar });
    //send to the server
  };

  billingInfoFromServer = async () => {
    await fetch(
      domainUrl+ "/acs/users/detail/" +
        this.props.authAAP.userAAP.email
    )
      .then((response) => {
        if (response.status === 200) {
          response.json().then((d) => {
            const personalInfo = d;
            this.props.savePersonalInfo({
              isPersonalInfoExist: this.props.personalInfo.isPersonalInfoExist,
              personalInfo: {
                address: this.props.authAAP.userAAP.email,
                country: "null",
                city: "null",
                phone: "null",
                avatar: "null",
                firstName: this.props.authAAP.userAAP.firstName,
                lastName: this.props.authAAP.userAAP.lastName,
              },
              billingInfos: {
                billingAdress: this.props.personalInfo.billingInfos
                  .billingAdress,
                creditCardID: this.props.personalInfo.billingInfos.creditCardID,
                billDate: this.props.personalInfo.billingInfos.billDate,
                creditCardEXPDate:
                  personalInfo.billingInfos[0].creditCardEXPDate,
                creditCardPIN: personalInfo.billingInfos[0].creditCardPIN,
                creditCardNo: personalInfo.billingInfos[0].creditCardNo,
              },
            });

            var res = personalInfo.billingInfos[0].creditCardEXPDate.split("/");
            var str1_month = "";
            var str2_month = "";
            var final_month = "";
            var final_year = "";
            if (res[0] < 10) {
              str1_month = "0";
              str2_month = res[0];
              final_month = str1_month.concat(str2_month);
              console.log(final_month);
            } else {
              final_month = res[0];
            }

            var temp = res[1].split("");
            var final_year = temp[2].concat(temp[3]);

            this.setState({
              expDate: final_month.concat(final_year),
              creditNumber: personalInfo.billingInfos[0].creditCardNo,
              cvv: personalInfo.billingInfos[0].creditCardPIN,
            });
          });
        } else {
          console.log("Error:", response);
          response.json().then((d) => {
            console.log("Errordata", d);
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error.data);
      });
  };

  handleSubmitPersonalInfo = async (e) => {
    const updateForUserAccount = {
      firstName: null,
      lastName: null,
      country: null,
      address: null,
      city: null,
      phone: null,
    };

    if (this.state.firstName === "") {
      this.setState({ firstError: "must enter name" });
    } else {
      this.setState({ firstError: "" });
      if (this.state.firstName !== "Enter Fisrt Name") {
        updateForUserAccount.firstName = this.state.firstName;
      }
    }

    if (this.state.lastName === "") {
      this.setState({ lastNameError: "must enter last name" });
    } else {
      this.setState({ lastNameError: "" });
      if (this.state.lastName !== "Enter Last Name") {
        updateForUserAccount.lastName = this.state.lastName;
      }
    }
    if (this.state.country === "") {
      this.setState({ countryError: "must enter country" });
    } else {
      this.setState({ countryError: "" });
      if (this.state.country !== "Enter Country") {
        updateForUserAccount.country = this.state.country;
      }
    }

    if (this.state.address === "") {
      this.setState({ addressError: "must enter address" });
    } else {
      this.setState({ addressError: "" });
      if (this.state.address !== "Enter Address") {
        updateForUserAccount.address = this.state.address;
      }
    }

    if (this.state.city === "") {
      this.setState({ cityError: "must enter city" });
    } else {
      this.setState({ cityError: "" });
      if (this.state.city !== "Enter City") {
        updateForUserAccount.city = this.state.city;
      }
    }
    if (this.state.phone.length == 11 || this.state.phone === "") {
      this.setState({ phoneError: "" });
      updateForUserAccount.phone = this.state.phone;
    } else {
      this.setState({ phoneError: "must enter valid phone number" });
    }
    console.log(updateForUserAccount);

    const dataJson = JSON.stringify(updateForUserAccount);

    const PersonalInfo = domainUrl + "/acs/users/detail/";
    const user = this.props.authAAP.userAAP;

    await fetch(PersonalInfo + user.email, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: dataJson,
    }).then(
      (response) => {
        if (response.status === 200) {
          this.props.savePersonalInfo({
            isPersonalInfoExist: false,
            personalInfo: updateForUserAccount,
            billingInfos: {},
          });
        } else {
          response.json().then((x) => {});
        }
      },
      (error) => {
        console.log(error);
      }
    );

    console.log(this.props.personalInfo);
  };

  handleSubmitBillingInfo = async (e) => {
    const billingInfoUpdate = {
      billingInfos: [
        {
          billingAdress: null,
          creditCardID: null,
          creditCardEXPDate: null,
          creditCardPIN: null,
          creditCardNo: null,
        },
      ],
    };

    const existBilling = this.props.personalInfo.billingInfos;

    for (var i = 0; i < existBilling.length; i++) {
      //billingInfoUpdate.billingInfos[i] = existBilling[i];
      console.log(existBilling[i]);
      billingInfoUpdate.billingInfos[i + 1] = existBilling[i];
      console.log(billingInfoUpdate.billingInfos[i + 1]);
    }

    if (this.state.billingAddress === "") {
      this.setState({ billingError: "must enter address" });
    } else {
      this.setState({ billingError: "" });
      if (this.state.billingAddress === "Enter Billing Address")
        this.setState({ billingAddress: "" });
      billingInfoUpdate.billingInfos[0].billingAddress = this.state.billingAddress;
    }

    if (this.state.ownerID === "") {
      this.setState({ ownerIdError: "must enter owner Id" });
    } else {
      this.setState({ ownerIdError: "" });
      if (this.state.ownerID === "Enter Owner Id")
        this.setState({ ownerID: "" });
      billingInfoUpdate.billingInfos[0].creditCardID = this.state.ownerID;
    }

    if (this.state.expDate.length != 10) {
      this.setState({ expDateError: "must enter expiry date" });
    } else {
      this.setState({ expDateError: "" });
      //  billingInfoUpdate.billingInfos[0].creditCardEXPDate = this.state.expDate;
    }

    if (this.state.creditNumber.length != 19) {
      this.setState({ creditError: "must enter valid credit card number" });
    } else {
      this.setState({ creditError: "" });
      billingInfoUpdate.billingInfos[0].creditCardNo = this.state.creditNumber;
    }

    if (this.state.cvv.length != 3) {
      this.setState({ cvvError: "must enter valid cvv" });
    } else {
      this.setState({ cvvError: "" });
      billingInfoUpdate.billingInfos[0].creditCardPIN = this.state.cvv;
    }

    const dataJson = JSON.stringify(billingInfoUpdate);
    console.log(dataJson);
 
    const PersonalInfo = domainUrl + "/acs/users/detail/";
    const user = this.props.authAAP.userAAP;

    await fetch(PersonalInfo + user.email, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: dataJson,
    }).then(
      (response) => {
        if (response.status === 200) {
          this.props.savePersonalInfo({
            isPersonalInfoExist: this.props.personalInfo.isPersonalInfoExist,
            personalInfo: this.props.personalInfo.personalInfo,
            billingInfos: billingInfoUpdate.billingInfos,
          });
        } else {
          response.json().then((x) => {});
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  checkIfIsPersonalInfo = async (e) => {
    const PersonalInfo = domainUrl + "/acs/users/detail/";
    const user = this.props.authAAP.userAAP;

    await fetch(PersonalInfo + user.email)
      .then((response) => {
        if (response.status === 200) {
          response.json().then((d) => {
            const userAAP = d;

            //first name
            if (userAAP.firstName !== null) {
              this.setState({ firstName: userAAP.firstName });
            } else {
              this.setState({ firstName: "Enter First Name" });
            }

            //last name
            if (userAAP.lastName !== null) {
              this.setState({ lastName: userAAP.lastName });
            } else {
              this.setState({ lastName: "Enter Last Name" });
            }

            //address
            if (userAAP.address !== null) {
              this.setState({ address: userAAP.address });
            } else {
              this.setState({ address: "Enter Address" });
            }

            //country
            if (userAAP.country !== null) {
              this.setState({ country: userAAP.country });
            } else {
              this.setState({ country: "Enter Country" });
            }

            //city
            if (userAAP.city !== null) {
              this.setState({ city: userAAP.city });
            } else {
              this.setState({ city: "Enter City" });
            }

            //phone
            if (userAAP.phone !== null) {
              this.setState({ phone: userAAP.phone });
            }

            //avatar
            if (userAAP.avatar !== null) {
              this.setState({ avatar: userAAP.avatar });
            } else {
              this.setState({ avatar: avatar["default"] });
            }

            this.props.savePersonalInfo({
              isPersonalInfoExist: this.props.personalInfo.isPersonalInfoExist,
              personalInfo: this.props.personalInfo.personalInfo,
              billingInfos: d.billingInfos,
            });
          });
        } else {
          console.log("Error:", response);
          response.json().then((d) => {
            console.log("Errordata", d);
          });
        }
      })
      .catch((error) => {
        // console.error('Error:', error.data);
        console.log(error.data);
      });
  };
  checkIfSignOut() {
    if (!this.props.authAAP.isSignIn) {
      return <Redirect push="/dashboard" to="/dashboard"></Redirect>;
    }
  }
  render() {
    return (
      <div>
        {this.checkIfSignOut()}
        <div>
          {/**Nav bar */}
          <NavigationBarAAP />
        </div>
        <div>
          <hr id="border1" align="right" />
        </div>

        {/**div container for account setting */}
        <div className="container-account-setting">
          <h3 style={{ marginLeft: 100 + "px" }}>Account Setting</h3>
          {/**border */}
          <hr id="border9" align="right" />

          {/**card */}
          <Card className="card-form-account-setting">
            <div className="div-account-setting">
              <h5>Personal Info</h5>
              <hr id="border10" align="right" />
              <div className="container-personal">
                <div id="imgPersonal">
                  <img
                    src="https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg"
                    id="image-default"
                  ></img>
                </div>
                <div id="firstNameDiv">
                  <label>First Name:</label>
                  <InputText
                    id="firstNameInput"
                    value={this.state.firstName}
                    onChange={(e) =>
                      this.setState({ firstName: e.target.value })
                    }
                    aria-describedby="firstName-help"
                    className="p-invalid p-d-block"
                  />
                  <small id="firstName-help" className="p-invalid p-d-block">
                    {this.state.firstError}
                  </small>
                </div>

                <div id="lastNameInputDiv">
                  <label>Last Name:</label>
                  <InputText
                    id="firstNameInput"
                    value={this.state.lastName}
                    onChange={(e) =>
                      this.setState({ lastName: e.target.value })
                    }
                    aria-describedby="lastName-help"
                    className="p-invalid p-d-block"
                  />
                  <small id="lastName-help" className="p-invalid p-d-block">
                    {this.state.lastNameError}
                  </small>
                </div>
              </div>

              <div className="container-personal-addres">
                <div id="countryInputDiv">
                  <label>Country:</label>
                  <InputText
                    id="countryInput"
                    value={this.state.country}
                    onChange={(e) => this.setState({ country: e.target.value })}
                    aria-describedby="country-help"
                    className="p-invalid p-d-block"
                  />
                  <small id="country-help" className="p-invalid p-d-block">
                    {this.state.countryError}
                  </small>
                </div>

                <div id="addresInputDiv">
                  <label>Address:</label>
                  <InputText
                    id="addresInput"
                    value={this.state.address}
                    onChange={(e) => this.setState({ address: e.target.value })}
                    aria-describedby="addres-help"
                    className="p-invalid p-d-block"
                  />
                  <small id="addres-help" className="p-invalid p-d-block">
                    {this.state.addressError}
                  </small>
                </div>

                <div id="cityInputDiv">
                  <label>City:</label>
                  <InputText
                    id="cityInput"
                    value={this.state.city}
                    onChange={(e) => this.setState({ city: e.target.value })}
                    aria-describedby="city-help"
                    className="p-invalid p-d-block"
                  />
                  <small id="city-help" className="p-invalid p-d-block">
                    {this.state.cityError}
                  </small>
                </div>
              </div>

              <div className="container-phone">
                <label htmlFor="phoneInput">Phone Number:</label>
                <div id="phoneInputDiv">
                  <InputMask
                    id="phoneInput"
                    mask="999-9999999"
                    value={this.state.phone}
                    placeholder="999-9999999"
                    aria-describedby="phone-help"
                    onChange={(e) => this.setState({ phone: e.value })}
                  ></InputMask>
                  <small id="phone-help" className="p-invalid p-d-block">
                    {this.state.phoneError}
                  </small>
                </div>
              </div>
              <div className="div-button-update">
                <input
                  id="input-file"
                  type="file"
                  style={{ width: 100 + "px" }}
                  onChange={this.fileChangedHandler}
                />
                <br></br>
                <br></br>
                <button id="upload-file" onClick={this.uploadHandler}>
                  Upload
                </button>
              </div>
            </div>

            <Button
              id="personal-info-button"
              onClick={this.handleSubmitPersonalInfo}
              label="Submit"
              className="p-button-raised p-button-info"
            />

            <div className="div-account-setting">
              <h5>Billing Info</h5>
              <hr id="border10" align="right" />
              <div className="billing-container">
                <div id="billing-address-div">
                  <label>Billing Address</label>
                  <InputText
                    id="billingAddressInput"
                    value={this.state.billingAddress}
                    onChange={(e) =>
                      this.setState({ billingAddress: e.target.value })
                    }
                    aria-describedby="billingAddress-help"
                    className="p-invalid p-d-block"
                  />
                  <small
                    id="billingAddress-help"
                    className="p-invalid p-d-block"
                  >
                    {this.state.billingError}
                  </small>
                </div>

                <div id="id-owner-credit-div">
                  <label>Owner ID</label>
                  <InputText
                    id="ownerIdInput"
                    value={this.state.ownerID}
                    onChange={(e) => this.setState({ ownerID: e.target.value })}
                    aria-describedby="ownerId-help"
                    className="p-invalid p-d-block"
                  />
                  <small id="ownerId-help" className="p-invalid p-d-block">
                    {this.state.ownerIdError}
                  </small>
                </div>
              </div>
              <div className="credit-card-container">
                <div id="dateCreditDiv">
                  <div>
                    <label htmlFor="dateInput">Expiry Date</label>
                  </div>
                  <InputMask
                    disabled={true}
                    id="dateInput"
                    mask="99/99"
                    value={this.state.expDate}
                    placeholder={this.state.expDate}
                    slotChar="dd/yy"
                    onChange={(e) => this.setState({ expDate: e.value })}
                  ></InputMask>
                  <small id="exp-date-help" className="p-invalid p-d-block">
                    {this.state.expDateError}
                  </small>
                </div>

                <div id="credit-number-div">
                  <div>
                    <label htmlFor="creditNumberInput">Card Number</label>
                  </div>
                  <InputMask
                    disabled={true}
                    id="creditNumberInput"
                    mask="9999-9999-9999-9999"
                    value={this.state.creditNumber}
                    placeholder={this.state.creditNumber}
                    onChange={(e) => this.setState({ creditNumber: e.value })}
                  ></InputMask>
                  <small id="card-number-help" className="p-invalid p-d-block">
                    {this.state.creditError}
                  </small>
                </div>

                <div id="credit-cv-div">
                  <div>
                    <label htmlFor="cvvNumberInput">CVV Number</label>
                  </div>
                  <InputMask
                    disabled={true}
                    id="cvvInput"
                    mask="999"
                    value={this.state.cvv}
                    placeholder="CVV"
                    onChange={(e) => this.setState({ cvv: e.value })}
                  ></InputMask>
                  <small id="cvv-help" className="p-invalid p-d-block">
                    {this.state.cvvError}
                  </small>
                </div>
              </div>
              <Button
                onClick={this.handleSubmitBillingInfo}
                label="Submit Billing Info"
                id="billing-info-button"
                className="p-button-raised p-button-info"
              />
            </div>
          </Card>
        </div>
        <div>
          <hr id="border4" align="right" />
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

function mapDispatchToProps(dispatch) {
  return {
    saveUserAAP: (userAAP) => dispatch(saveUserAAP(userAAP)),
    savePersonalInfo: (personalInfo) =>
      dispatch(savePersonalInfo(personalInfo)),
  };
}

const mapStateToProps = (state) => {
  return { authAAP: state.authAAP, personalInfo: state.personalInfo };
};

const AccountSetting1 = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSetting);

export default AccountSetting1;
