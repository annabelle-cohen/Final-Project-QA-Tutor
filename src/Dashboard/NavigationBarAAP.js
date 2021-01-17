import React, { Component } from "react";
import { connect } from "react-redux";
import { saveUserAAP } from "../Actions/authAAPActions";
import "./style.css";
import "./DropdownDemo.css";
import { Button } from "primereact/button";
import "./ButtonDemo.css";
import "./CarouselDemo.css";
import "./TabViewDemo.css";
import { Redirect } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { saveCart } from "../Actions/shoppingCart";
import { savePassingProduct } from "../Actions/passProduct";
import { Link, Route, NavLink } from "react-router-dom";

export class NavigationBarAAP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      product: "",
    };

    this.props.saveUserAAP({
      userAAP: this.props.authAAP.userAAP,
      isLoggedIn: this.props.authAAP.isLoggedIn,
      isSignIn: this.props.authAAP.isSignIn,
    });

    this.props.saveCart({
      lastPosition: this.props.cart.lastPosition,
      totalPrice: this.props.cart.totalPrice,
      totalNumOfProducts: this.props.cart.totalNumOfProducts,
      cart: this.props.cart.cart,
      amountOfproducts: this.props.cart.amountOfproducts,
    });

    this.props.savePassingProduct({
      productToPass: this.props.productToPass.productToPass,
    });

    this.handleSignOut = this.handleSignOut.bind(this);
    this.productsDropDown = this.productsDropDown.bind(this);
    this.checkIfIsAlreadyExistCart = this.checkIfIsAlreadyExistCart.bind(this);

    this.checkIfIsAlreadyExistCart();
  }

  checkIfIsAlreadyExistCart() {
    //example for another file that will include all fetch to server.
    if (this.props.authAAP.isSignIn) {
      const main = "http://localhost:8092//";
      const fetchCart = main + "acs/carts/getCart/";
      fetch(fetchCart + this.props.authAAP.userAAP.email)
        .then((response) => {
          if (response.status === 200) {
            this.setState({ succeded: true });
            response.json().then((d) => {
              const data = d;
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
    }
  }

  handleSignOut = (e) => {
    this.props.saveUserAAP({
      userAAP: {},
      isLoggedIn: this.props.authAAP.isLoggedIn,
      isSignIn: false,
    });
  };

  productsDropDown(products, amount, savingProductToPass) {
    return products.map(function (product) {
      var index = products.findIndex(
        (item) => item.productID === product.productID
      );
      return (
        <div className="row" style={{ height: 153 + "px" }}>
          <div
            className="col-md-1"
            style={{
              display: "inline-block",
              position: "relative",
              zIndex: 0,
              height: "flex",
            }}
          >
            <div style={{ display: "inline-block", top: 20 + "px" }}>
              <img
                src={product.images[0].source}
                style={{
                  width: 40 + "px",
                  height: 40 + "px",
                  position: "relative",
                  zIndex: 1,
                }}
              ></img>
            </div>
            <div
              style={{
                position: "relative",
                zIndex: 99,
                top: -32,
                marginLeft: 50 + "px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                height: 20 + "px",
                width: 200 + "px",
              }}
            >
              <Link
                id="link-title-product"
                onClick={async (e) => {
                  savingProductToPass({
                    productToPass: product,
                  });
                }}
                to="/dashboard/productPage"
              >
                {product.title}
              </Link>
            </div>
            <div
              style={{
                position: "relative",
                zIndex: 99,
                top: -30,
                marginLeft: 50 + "px",
                fontSize: 15 + "px",
                color: "gray",
              }}
            >
              Price: ${product.unitPrice}
            </div>
            <div
              style={{
                display: "inline-block",
                position: "relative",
                zIndex: 100,
                top: -50,
                marginLeft: 210 + "px",
                fontSize: 13 + "px",
                color: "gray",
              }}
            >
              Qty.{amount[index]}
            </div>

            <div
              style={{
                position: "relative",
                zIndex: 100,
                top: -50,
                marginLeft: 50 + "px",
                fontSize: 13 + "px",
                color: "gray",
              }}
            >
              Shipping from:
              {product.location}
            </div>

            <div
              style={{
                position: "relative",
                zIndex: 100,
                top: -50,
                marginLeft: 50 + "px",
                fontSize: 13 + "px",
                color: "gray",
              }}
            >
              Shipping:
              {product.shippingServiceCost > 0
                ? product.shippingServiceCost
                : "FREE"}
            </div>
          </div>
          <hr
            style={{
              borderColor: "rgb(255, 255, 255)",
              borderWidth: 0.2,
              borderBottom: "thin",
              marginLeft: 5 + "px",
              position: "relative",
              zIndex: 4,
            }}
          ></hr>
        </div>
      );
    });
  }

  render() {
    return (
      <div id="first-row">
        {" "}
        &nbsp; &nbsp; Hi!{" "}
        <a
          id="home_signIn"
          href="/dashboard/signInToAAP"
          style={{
            display: this.props.authAAP.isSignIn ? "none" : "inline-block",
          }}
        >
          Sign in
        </a>{" "}
        <div
          style={{
            display: this.props.authAAP.isSignIn ? "none" : "inline-block",
          }}
        >
          or
        </div>{" "}
        <a
          id="home_register"
          href="/dashboard/registerToAAP"
          style={{
            display: this.props.authAAP.isSignIn ? "none" : "inline-block",
          }}
        >
          register
        </a>
        {/*watchlist drop down*/}
        <div
          id="profile-div-drop"
          className="dropDown1"
          style={{
            display: this.props.authAAP.isSignIn ? "inline-block" : "none",
          }}
        >
          <Button
            id="profile-div"
            label={this.props.authAAP.userAAP.firstName}
            icon="pi pi-angle-down"
            iconPos="right"
            className="p-button-secondary p-button-text"
          />
          <div className="dropDown-menu">
            <div className="profile-option">
              {this.props.authAAP.userAAP.firstName}&nbsp;
              {this.props.authAAP.userAAP.lastName}
              <div>
                {this.props.authAAP.userAAP.firstName}
                {this.props.authAAP.userAAP.lastName}'(rating)'
              </div>
              <div id="profile-buttons-nav">
                <Link id="account-setting" to="/dashboard/accountsetting">
                  Account Setting
                </Link>
                <br></br>
                <Button
                  id="sign-out"
                  label="Sign Out"
                  onClick={this.handleSignOut}
                  className="p-button-link"
                />
              </div>
            </div>
          </div>
        </div>
        &nbsp;
        <a id="home_dailydeals" href="url" color="black">
          Daily Deals
        </a>{" "}
        &nbsp;{" "}
        <a id="home_helpconatct" href="url" color="black">
          Help&Contact
        </a>
        <a id="home_ship" href="url" color="black">
          Ship to
        </a>
        {/*watchlist drop down*/}
        <div className="dropDown1">
          <Button
            id="watchlist"
            label="Watchlist"
            icon="pi pi-angle-down"
            iconPos="right"
            className="p-button-secondary p-button-text"
          />
          <div className="dropDown-menu">
            <div
              className="msg_watchlist"
              style={{
                display: this.props.authAAP.isSignIn ? "none" : "block",
              }}
            >
              Please&nbsp;
              <a id="sign-in-msg" href="/dashboard/signInToAAP">
                Sign In
              </a>
              &nbsp;to view items you are watching.
            </div>

            <div
              className="msg_watchlist2"
              style={{
                display: this.props.authAAP.isSignIn ? "block" : "none",
              }}
            >
              Looks like you are not watching any items yet.
            </div>
          </div>
        </div>
        {/*myAAP drop down*/}
        <div className="dropDown2">
          <Button
            id="My_AAP"
            label="My AAP"
            icon="pi pi-angle-down"
            iconPos="right"
            className="p-button-secondary p-button-text"
          />
          <div id="myDropdown" class="dropdown_aap">
            <a className="dropdown_aap_content" href="url">
              Summary
            </a>
            <a className="dropdown_aap_content" href="url">
              Recently Viewed
            </a>
            <a className="dropdown_aap_content" href="url">
              Bids/offers
            </a>
            <a className="dropdown_aap_content" href="url">
              Watchlist
            </a>
            <a className="dropdown_aap_content" href="url">
              Purchase History
            </a>
            <a className="dropdown_aap_content" href="url">
              Buy again
            </a>
            <a className="dropdown_aap_content" href="url">
              Selling
            </a>
            <a className="dropdown_aap_content" href="url">
              Saved Searches
            </a>
            <a className="dropdown_aap_content" href="url">
              Save sellers
            </a>
            <a className="dropdown_aap_content" href="url">
              Messages
            </a>
          </div>
        </div>
        {/*notification drop down*/}
        <div className="dropDown3">
          <Button
            id="notification"
            icon="pi pi-bell"
            className="p-button-secondary p-button-text"
          />
          <div id="msg_notifications" class="dropdown_notofication">
            <p
              id="notfication-p"
              style={{
                display: this.props.authAAP.isSignIn ? "none" : "block",
              }}
            >
              Please&nbsp;
              <a id="sign-in-msg2" href="/dashboard/signInToAAP">
                Sign In
              </a>
              &nbsp;to view<br></br> notification.
            </p>
            <p
              id="notfication-p2"
              style={{
                display: this.props.authAAP.isSignIn ? "block" : "none",
              }}
            >
              You're all caught up!
            </p>
          </div>
        </div>
        {/*shopping cart*/}
        <div className="drop-down-shop" style={{ display: "inline-block" }}>
          <IconButton
            aria-label="Show cart items"
            color="inherit"
            id="shopping-cart"
          >
            <Badge
              badgeContent={this.props.cart.totalNumOfProducts}
              color="secondary"
            >
              <ShoppingCart style={{ fontSize: 19 + "px" }} />
            </Badge>
          </IconButton>
          <div class="dropdown-content-shopping">
            <div
              style={{
                display:
                  this.props.cart.totalNumOfProducts <= 0 ? "none" : "block",
                marginTop: -15 + "px",
                position: "static",
                zIndex: 3,
              }}
            >
              <h6 style={{ top: -10 + "px", fontWeight: "bold" }}>
                Shopping Cart
              </h6>
              <hr
                style={{
                  borderColor: "rgb(255, 255, 255)",
                  borderWidth: 0.2,
                  borderBottom: "thin",
                  marginLeft: 1 + "px",
                  marginRight: 25 + "px",
                }}
              ></hr>
            </div>
            <div
              style={{
                minHeight: 50 + "px",
                maxHeight: 300 + "px",
                height: "flex",
                overflowY: "scroll",
              }}
            >
              {this.props.cart.totalNumOfProducts <= 0
                ? "your cart is empty start adding some!"
                : this.productsDropDown(
                    this.props.cart.cart,
                    this.props.cart.amountOfproducts,
                    this.props.savePassingProduct
                  )}
            </div>
            <div
              style={{
                textAlign: "center",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Total: {this.props.cart.totalPrice.toFixed(2)}
            </div>
            <div style={{ textAlign: "center" }}>
              <Link
                id="go-to-checkout"
                to={
                  !this.props.authAAP.isSignIn
                    ? "/dashboard/signInToAAP"
                    : "/checkout"
                }
                style={{
                  position: "absulote",
                  color: "blue",
                  fontWeight: "bold",
                }}
              >
                Go to chekout
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveUserAAP: (userAAP) => dispatch(saveUserAAP(userAAP)),
    saveCart: (cart) => dispatch(saveCart(cart)),
    savePassingProduct: (productToPass) =>
      dispatch(savePassingProduct(productToPass)),
  };
}

const mapStateToProps = (state) => {
  return {
    authAAP: state.authAAP,
    cart: state.cart,
    productToPass: state.productToPass,
  };
};

const NavigationBarAAP1 = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBarAAP);

export default connect()(NavigationBarAAP1);
