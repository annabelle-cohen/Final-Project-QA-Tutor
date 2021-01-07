import React, { Component } from "react";
import { saveCart } from "../Actions/shoppingCart";
import { connect } from "react-redux";
import Cart from "./checkout/Summary";
import NavigationBarAAP from "./NavigationBarAAP";

class checkout1 extends Component {
  constructor(props) {
    super(props);

    this.props.saveCart({
      lastPosition: this.props.cart.lastPosition,
      totalPrice: this.props.cart.totalPrice,
      totalNumOfProducts: this.props.cart.totalNumOfProducts,
      cart: this.props.cart.cart,
      amountOfproducts: this.props.cart.amountOfproducts,
    });
  }

  render() {
    const onUpdateCartQty = (item, newQuantity) => {
      console.log(item);
      console.log(newQuantity);
    };

    const onRemoveFromCart = (item) => {
      console.log(item);
    };
    const onEmptyCart = () => {
      console.log("empty cart");
    };
    return (
      <div id="checkout-container">
        <NavigationBarAAP />
        <div>
          <hr id="border1" align="right" />
        </div>
        <Cart
          cart={this.props.cart}
          onUpdateCartQty={onUpdateCartQty}
          onRemoveFromCart={onRemoveFromCart}
          onEmptyCart={onEmptyCart}
        ></Cart>

        <div>
          <hr id="border11" align="right" />
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
    saveCart: (cart) => dispatch(saveCart(cart)),
  };
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const checkout = connect(mapStateToProps, mapDispatchToProps)(checkout1);

export default connect()(checkout);
