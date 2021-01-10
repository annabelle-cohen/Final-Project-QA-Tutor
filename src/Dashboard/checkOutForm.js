import React, { Component } from "react";
import { saveCart } from "../Actions/shoppingCart";
import { connect } from "react-redux";
import { saveUserAAP } from "../Actions/authAAPActions";
import { Redirect } from "react-router-dom";
import CheckoutStepper from "./checkoutForm/stepper/CheckoutStepper";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.props.saveCart({
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
  }

  render() {
    return (
      <div>
        <CheckoutStepper></CheckoutStepper>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveCart: (cart) => dispatch(saveCart(cart)),
    saveUserAAP: (userAAP) => dispatch(saveUserAAP(userAAP)),
  };
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    authAAP: state.authAAP,
  };
};

const CheckoutForm1 = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutForm);

export default connect()(CheckoutForm1);
