import React, { Component } from "react";
import NavigationBarAAP from "./NavigationBarAAP";
import { Card } from "primereact/card";
import { saveUserAAP } from "../Actions/authAAPActions";
import { connect } from "react-redux";
import "./accountsetting.css";

class AccountSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      country: "",
      city: "",
      phone: "",
      avatar: "",
      addressError: "",
      countryError: "",
      cityError: "",
      phoneError: "",
    };

    this.props.saveUserAAP({
      isLoggedIn: this.props.authAAP.isLoggedIn,
      isSignIn: this.props.authAAP.isSignIn,
      userAAP: this.props.authAAP.userAAP,
    });

    this.checkIfIsPersonalInfo = this.checkIfIsPersonalInfo.bind(this);
    this.checkIfIsPersonalInfo();
  }

  checkIfIsPersonalInfo = (e) => {
    const main = "http://localhost:8092//";
    const PersonalInfo = main + "/acs/users/detail/";
    const user = this.props.authAAP.userAAP;

    fetch(PersonalInfo + user.email)
      .then((response) => {
        if (response.status === 200) {
          response.json().then((d) => {
            const userAAP = d;
            if (userAAP.address !== null) {
              this.setState({ address: userAAP.address });
            }

            if (userAAP.country !== null) {
              this.setState({ country: userAAP.country });
            }
            if (userAAP.city !== null) {
              this.setState({ city: userAAP.city });
            }

            if (userAAP.phone !== null) {
              this.setState({ phone: userAAP.phone });
            }

            if (userAAP.avatar !== null) {
              this.setState({ avatar: userAAP.avatar });
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
        // console.error('Error:', error.data);
        console.log(error.data);
      });
  };
  render() {
    return (
      <div>
        <div>
          {/**Nav bar */}
          <NavigationBarAAP />
        </div>

        {/**div container for account setting */}
        <div className="container-account-setting">
          <h3 style={{ marginLeft: 100 + "px" }}>Account Setting</h3>
          {/**border */}
          <hr id="border9" align="right" />

          {/**card */}
          <Card className="card-form-account-setting">
            <div>
              <h5>Personal Info</h5>
              <hr id="border10" align="right" />
            </div>

            <div>
              <h5>Billing Info</h5>
              <hr id="border10" align="right" />
            </div>
          </Card>
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

const AccountSetting1 = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSetting);

export default AccountSetting1;
