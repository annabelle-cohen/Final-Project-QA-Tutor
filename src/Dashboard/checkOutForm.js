import React, { Component } from "react";
import { saveCart } from "../Actions/shoppingCart";
import { savePersonalInfo } from "../Actions/authPersonalInfo";
import { connect } from "react-redux";
import { saveUserAAP } from "../Actions/authAAPActions";
import { saveCartID } from "../Actions/savingCartId";
import { saveBugsList } from "../Actions/saveBugsList";
import { Redirect } from "react-router-dom";
import CheckoutStepper from "./checkoutForm/stepper/CheckoutStepper";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.props.saveCart({
      cartId: this.props.cart.cartId,
      lastPosition: this.props.cart.lastPosition,
      totalPrice: this.props.cart.totalPrice,
      totalNumOfProducts: this.props.cart.totalNumOfProducts,
      cart: this.props.cart.cart,
      amountOfproducts: this.props.cart.amountOfproducts,
    });

    this.props.saveUserAAP({
      userAAP: this.props.authAAP.userAAP,
      isLoggedIn: this.props.authAAP.isLoggedIn,
      isSignIn: this.props.authAAP.isSignIn,
    });

    this.props.savePersonalInfo({
      isPersonalInfoExist: this.props.personalInfo.isPersonalInfoExist,
      personalInfo: {
        address: "null",
        country: "null",
        city: "null",
        phone: "null",
        avatar: "null",
        firstName: this.props.authAAP.userAAP.firstName,
        lastName: this.props.authAAP.userAAP.lastName,
      },
      billingInfos: this.props.personalInfo.billingInfos,
    });

    this.props.saveCartID({
      id: this.props.cartId.id,
    });

    this.props.saveBugsList({
      bugsList: this.props.bugsList.bugsList,
    });

    console.log(this.props.personalInfo);
    this.fillPersonalInfo();
    this.checkBugs();
  }

  checkBugs = async () => {
    var isTotalPriceBug = this.props.bugsList.bugsList.some(
      (b) => b.bugName === "TotalPrice Bug"
    );

    if (isTotalPriceBug) {
      const main = "http://localhost:8092";
      const checkoutLink = main + "/acs/carts/setTotalPrice";
      const wrongPrice = this.props.cart.totalPrice + 100;

      const cartInfo = {
        cartID: this.props.cartId.id,
        totalPrice: wrongPrice,
      };

      const dataJson = JSON.stringify(cartInfo);

      await fetch(checkoutLink, {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: dataJson,
      }).then(
        (response) => {
          if (response.status === 200) {
            console.log("success");
          } else {
            response.json().then((x) => {
              console.log(x);
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );

      this.props.saveCart({
        lastPosition: this.props.cart.lastPosition,
        totalPrice: wrongPrice,
        totalNumOfProducts: this.props.cart.totalNumOfProducts,
        cart: this.props.cart.cart,
        amountOfproducts: this.props.cart.amountOfproducts,
      });
    }
  };

  fillPersonalInfo = async () => {
    await fetch(
      "http://localhost:8092/acs/users/detail/" +
        this.props.authAAP.userAAP.email
    )
      .then((response) => {
        if (response.status === 200) {
          response.json().then((d) => {
            const personalInfo = d;
            console.log(personalInfo.billingInfos[0]);
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
                billingAdress:
                  this.props.personalInfo.billingInfos.billingAdress,
                creditCardID: this.props.personalInfo.billingInfos.creditCardID,
                billDate: this.props.personalInfo.billingInfos.billDate,
                creditCardEXPDate:
                  personalInfo.billingInfos[0].creditCardEXPDate,
                creditCardPIN: personalInfo.billingInfos[0].creditCardPIN,
                creditCardNo: personalInfo.billingInfos[0].creditCardNo,
              },
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

  render() {
    const handleShippingAddress = (data) => {
      console.log(data);
      //in the future need to send it to the server.
    };

    const handleBillingInfo = async (billingData) => {
      console.log(this.props.cartId.id);

      //send to server

      const main = "http://localhost:8092";
      const checkoutLink = main + "/acs/carts/checkout";

      const cartInfo = {
        cartID: this.props.cartId.id,
      };

      const dataJson = JSON.stringify(cartInfo);

      await fetch(checkoutLink, {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: dataJson,
      }).then(
        (response) => {
          if (response.status === 200) {
            console.log("success");
          } else {
            response.json().then((x) => {
              console.log(x);
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );

      this.props.saveCart({
        lastPosition: 0,
        totalPrice: 0,
        totalNumOfProducts: 0,
        cart: [],
        amountOfproducts: [],
      });
    };
    return (
      <div>
        <CheckoutStepper
          shippingAddress={handleShippingAddress}
          billingInfo={handleBillingInfo}
          checkoutToken={this.props.cart}
          personalInfo={this.props.personalInfo}
          bugsList={this.props.bugsList.bugsList}
        ></CheckoutStepper>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveCart: (cart) => dispatch(saveCart(cart)),
    saveUserAAP: (userAAP) => dispatch(saveUserAAP(userAAP)),
    savePersonalInfo: (personalInfo) =>
      dispatch(savePersonalInfo(personalInfo)),
    saveCartID: (cartId) => dispatch(saveCartID(cartId)),
    saveBugsList: (bugsList) => dispatch(saveBugsList(bugsList)),
  };
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    authAAP: state.authAAP,
    personalInfo: state.personalInfo,
    cartId: state.cartId,
    bugsList: state.bugsList,
  };
};

const CheckoutForm1 = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutForm);

export default connect()(CheckoutForm1);
