import React, { Component } from "react";
import { saveCart } from "../Actions/shoppingCart";
import { connect } from "react-redux";
import Cart from "./checkout/Summary";
import NavigationBarAAP from "./NavigationBarAAP";
import { saveUserAAP } from "../Actions/authAAPActions";
import { Redirect } from "react-router-dom";
import { savePassingProduct } from "../Actions/passProduct";

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

    this.props.saveUserAAP({
      userAAP: this.props.authAAP.userAAP,
      isLoggedIn: this.props.authAAP.isLoggedIn,
      isSignIn: this.props.authAAP.isSignIn,
    });

    this.props.savePassingProduct({
      productToPass: this.props.productToPass.productToPass,
    });
  }

  isSignOut() {
    if (!this.props.authAAP.isSignIn) {
      return <Redirect to="/dashboard"></Redirect>;
    }
  }

  render() {
    const onUpdateCartQty = async (item, newQuantity) => {
      const index = this.props.cart.cart.findIndex(
        (product) => item.productID === product.productID
      );
      var price = this.props.cart.totalPrice;
      var amount = this.props.cart.amountOfproducts;
      var totalItems = this.props.cart.totalNumOfProducts;

      if (this.props.cart.amountOfproducts[index] < newQuantity) {
        amount[index] = newQuantity;
        price += item.unitPrice + item.shippingServiceCost;
        totalItems += 1;
      } else {
        if (newQuantity >= 0) {
          amount[index] = newQuantity;
          price -= item.unitPrice + item.shippingServiceCost;
          totalItems -= 1;
        }
      }

      this.props.saveCart({
        lastPosition: this.props.cart.lastPosition,
        totalPrice: price,
        totalNumOfProducts: totalItems,
        cart: this.props.cart.cart,
        amountOfproducts: amount,
      });
    };

    const onRemoveFromCart = (item) => {
      var price = this.props.cart.totalPrice;
      var amount = this.props.cart.amountOfproducts;
      var totalItems = this.props.cart.totalNumOfProducts;
      var cartProducts = this.props.cart.cart;
      const index = cartProducts.findIndex(
        (product) => item.productID === product.productID
      );
      price -=
        amount[index] * item.unitPrice +
        amount[index] * item.shippingServiceCost;
      console.log("price " + price);
      totalItems -= amount[index];
      console.log("total items " + totalItems);
      amount.splice(index, 1);
      cartProducts.splice(index, 1);

      this.props.saveCart({
        lastPosition: this.props.cart.lastPosition,
        totalPrice: price,
        totalNumOfProducts: totalItems,
        cart: cartProducts,
        amountOfproducts: amount,
      });
    };

    const onEmptyCart = () => {
      this.props.saveCart({
        lastPosition: 0,
        totalPrice: 0,
        totalNumOfProducts: 0,
        cart: [],
        amountOfproducts: [],
      });
    };

    const passingItem = (item) => {
      this.props.savePassingProduct({
        productToPass: item,
      });
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
          handleClick={passingItem}
        ></Cart>
        {this.isSignOut()}
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
    saveUserAAP: (userAAP) => dispatch(saveUserAAP(userAAP)),
    savePassingProduct: (productToPass) =>
      dispatch(savePassingProduct(productToPass)),
  };
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    authAAP: state.authAAP,
    productToPass: state.productToPass,
  };
};

const checkout = connect(mapStateToProps, mapDispatchToProps)(checkout1);

export default connect()(checkout);
