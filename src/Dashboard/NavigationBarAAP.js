import React, { Component } from "react";
import { connect } from "react-redux";
import { saveUserAAP } from "../Actions/authAAPActions";
import { saveLastChoice } from "../Actions/saveLastChoice";
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
import { avatar } from "../Asset/default_profile_pic";
import { saveWatchlist } from "../Actions/addToWatchlist";
import { saveBugsList } from "../Actions/saveBugsList";

export class NavigationBarAAP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      product: "",
      historyPurchList: [],
    };

    this.props.saveUserAAP({
      userAAP: this.props.authAAP.userAAP,
      isLoggedIn: this.props.authAAP.isLoggedIn,
      isSignIn: this.props.authAAP.isSignIn,
    });

    this.props.saveCart({
      cartId: this.props.cart.cartID,
      lastPosition: this.props.cart.lastPosition,
      totalPrice: this.props.cart.totalPrice,
      totalNumOfProducts: this.props.cart.totalNumOfProducts,
      cart: this.props.cart.cart,
      amountOfproducts: this.props.cart.amountOfproducts,
    });

    /*this.props.saveCart({
      cartId: this.props.cart.cartID,
      lastPosition: this.props.cart.lastPosition,
      totalPrice: 0,
      totalNumOfProducts: 0,
      cart: [],
      amountOfproducts: [],
    });*/

    this.props.saveWatchlist({
      Watchlist: this.props.watchlist.Watchlist,
    });
    console.log(this.props.watchlist.Watchlist);

    this.props.savePassingProduct({
      productToPass: this.props.productToPass.productToPass,
    });
    this.props.saveLastChoice({
      choice: this.props.choice.choice,
    });

    this.props.saveBugsList({
      bugsList: this.props.bugsList.bugsList,
    });

    console.log(this.props.choice.choice);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.productsDropDown = this.productsDropDown.bind(this);
    this.checkIfIsAlreadyExistCart = this.checkIfIsAlreadyExistCart.bind(this);
    console.log(this.props.watchlist.Watchlist);
    this.checkIfIsAlreadyExistCart();
    this.loadPurchHistory();
  }

  checkIfIsAlreadyExistCart = async () => {
    //example for another file that will include all fetch to server.
    if (this.props.authAAP.isSignIn) {
      const main = "http://localhost:8092//";
      const fetchCart = main + "acs/carts/getCart/";
      await fetch(fetchCart + this.props.authAAP.userAAP.email)
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
  };

  handleSignOut = (e) => {
    var isLogOutBug = this.props.bugsList.bugsList.some(
      (b) => b.bugName === "Logout Bug"
    );
    if (!isLogOutBug) {
      this.props.saveUserAAP({
        userAAP: {},
        isLoggedIn: this.props.authAAP.isLoggedIn,
        isSignIn: false,
      });
    }
  };

  handleWatchlist = (e) => {
    this.props.saveLastChoice({
      choice: "watchlist",
    });
  };

  handleRecentleyViewed = (e) => {
    this.props.saveLastChoice({
      choice: "viewed",
    });
  };

  handlePurchaseHistory = (e) => {
    this.props.saveLastChoice({
      choice: "history",
    });
  };

  handleBuyAgain = (e) => {
    this.props.saveLastChoice({
      choice: "Buy Again",
    });
  };

  loadPurchHistory = async () => {
    if (this.props.authAAP.isSignIn) {
      await fetch(
        "http://localhost:8092/acs/orders/getOrderHistroy/" +
          this.props.authAAP.userAAP.email
      )
        .then((response) => {
          if (response.status === 200) {
            response.json().then((d) => {
              const orderInfo = d;
              this.setState({
                historyPurchList: orderInfo,
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
    }
  };

  dropDownNotifactions(purchaseHistory) {
    return purchaseHistory.map(function (order) {
      return (
        <div className="row" style={{ height: "flex" }}>
          <div
            className="col-md-2"
            style={{
              display: "inline-block",
              position: "relative",
              zIndex: 0,
              height: "15px",
              top: -25,
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "black",
                marginLeft: "-10px",
                height: "15px",
                top: -50,
                fontWeight: "bold",
              }}
            >
              Order #{order.orderID} confirmation sent to your email
            </div>
            <hr
              style={{
                borderColor: "rgb(54, 41, 240)",
                borderWidth: 0.2,
                borderBottom: "thin",
                marginLeft: -18 + "px",
                position: "relative",
                width: "280px",
                zIndex: 4,
              }}
            ></hr>
          </div>
        </div>
      );
    });
  }

  dropDownWatchList(productWatchList, savingProductToPass, bugsList) {
    return productWatchList.map(function (product) {
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
                to={
                  bugsList.length <= 0
                    ? "/dashboard/productPage"
                    : bugsList.bugsList.some(
                        (b) => b.bugName === "ProductWatchlistLink Bug"
                      )
                    ? "/dashboard/signInToAAP"
                    : "/dashboard/productPage"
                }
              >
                {product.title}
              </Link>
            </div>
            <div
              style={{
                position: "relative",
                zIndex: 99,
                top: -20,
                marginLeft: 50 + "px",
                fontSize: 15 + "px",
                color: "gray",
              }}
            >
              Price: ${product.unitPrice}
            </div>

            <div
              style={{
                position: "relative",
                zIndex: 100,
                top: -25,
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
                top: -15,
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

  productsDropDown(products, amount, savingProductToPass, bugsList) {
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
                to={
                  bugsList.length <= 0
                    ? "/dashboard/productPage"
                    : bugsList.bugsList.some(
                        (b) => b.bugName === "ProductMenuLink Bug"
                      )
                    ? "/dashboard"
                    : "/dashboard/productPage"
                }
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
            position: "relative",
            zIndex: 2,
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
          <div className="dropDown-menu" style={{ height: "200px" }}>
            <div>
              <div
                style={{
                  display: "inline-block",
                  position: "absolute",
                  marginTop: "5px",
                }}
              >
                <img
                  src="https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg"
                  id="image-default"
                  style={{ height: "100px", width: "100px" }}
                ></img>
              </div>
              <div
                style={{
                  display: "inline-block",
                  position: "relative",
                  marginLeft: "120px",
                  marginTop: "10px",
                }}
              >
                {this.props.authAAP.userAAP.firstName}&nbsp;
                {this.props.authAAP.userAAP.lastName}
              </div>
            </div>

            <div
              className="profile-option"
              style={{ marginTop: "-10px", marginLeft: "-10px" }}
            >
              <hr
                style={{
                  position: "relative",
                  borderColor: "rgb(255, 255, 255)",
                  borderWidth: 0.2,
                  borderBottom: "thin",
                  marginLeft: 1 + "px",
                  marginRight: 25 + "px",
                  marginTop: "55px",
                  zIndex: -2,
                }}
              ></hr>
              <div
                id="profile-buttons-nav"
                style={{ position: "absolute", zIndex: 1, marginTop: "2px" }}
              >
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
        <div className="Watchlist-dropDown" style={{ marginLeft: "630px" }}>
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
              className="watchlist-content"
              style={{
                minHeight: 50 + "px",
                maxHeight: 300 + "px",
                height: "flex",
                overflowY: "scroll",
                display: this.props.authAAP.isSignIn ? "block" : "none",
              }}
            >
              {this.props.watchlist.Watchlist.length > 0
                ? this.dropDownWatchList(
                    this.props.watchlist.Watchlist,
                    this.props.savePassingProduct,
                    this.props.bugsList
                  )
                : "you have nothing in your watchlist"}
            </div>
          </div>
        </div>
        {/*watchlist drop down*/}
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
            <Link
              className="dropdown_aap_content"
              onClick={this.handleWatchlist}
              to={
                this.props.authAAP.isSignIn
                  ? "/dashboard/productsList"
                  : "/dashboard/signInToAAP"
              }
              href="url"
            >
              Summary
            </Link>
            <Link
              className="dropdown_aap_content"
              onClick={this.handleRecentleyViewed}
              to={
                this.props.authAAP.isSignIn
                  ? "/dashboard/productsList"
                  : "/dashboard/signInToAAP"
              }
            >
              Recently Viewed
            </Link>

            <Link
              className="dropdown_aap_content"
              onClick={this.handleWatchlist}
              to={
                this.props.authAAP.isSignIn
                  ? "/dashboard/productsList"
                  : "/dashboard/signInToAAP"
              }
            >
              Watchlist
            </Link>
            <Link
              className="dropdown_aap_content"
              onClick={this.handlePurchaseHistory}
              to={
                this.props.authAAP.isSignIn
                  ? "/dashboard/history"
                  : "/dashboard/signInToAAP"
              }
            >
              Purchase History
            </Link>
            <Link
              className="dropdown_aap_content"
              onClick={this.handleBuyAgain}
              to={
                this.props.authAAP.isSignIn
                  ? "/dashboard/history"
                  : "/dashboard/signInToAAP"
              }
              href="url"
            >
              Buy again
            </Link>

            <Link
              className="dropdown_aap_content"
              to={
                this.props.authAAP.isSignIn
                  ? "/dashboard/savedSearches"
                  : "/dashboard/signInToAAP"
              }
            >
              Saved Searches
            </Link>
          </div>
        </div>
        {/*notification drop down*/}
        <div className="dropDown3">
          <Button
            id="notification"
            icon="pi pi-bell"
            className="p-button-secondary p-button-text"
          />
          <div
            id="msg_notifications"
            class="dropdown_notofication"
            style={{
              height:
                this.state.historyPurchList.length <= 1
                  ? 90 + "px"
                  : 150 + "px",
              overflowY: "scroll",
            }}
          >
            <div
              id="notfication-p"
              style={{
                display: this.props.authAAP.isSignIn ? "none" : "block",
                marginTop: -15 + "px",
              }}
            >
              Please&nbsp;
              <a id="sign-in-msg2" href="/dashboard/signInToAAP">
                Sign In
              </a>
              &nbsp;to view<br></br> notification.
            </div>
            <div
              id="notfication-p2"
              style={{
                display: this.props.authAAP.isSignIn ? "block" : "none",
                height: "flex",
              }}
            >
              {this.state.historyPurchList.length == 0
                ? "You're all caught out"
                : this.dropDownNotifactions(this.state.historyPurchList)}
            </div>
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
                    this.props.savePassingProduct,
                    this.props.bugsList
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
    saveWatchlist: (watchlist) => dispatch(saveWatchlist(watchlist)),
    saveLastChoice: (choice) => dispatch(saveLastChoice(choice)),
    saveBugsList: (bugsList) => dispatch(saveBugsList(bugsList)),
  };
}

const mapStateToProps = (state) => {
  return {
    authAAP: state.authAAP,
    cart: state.cart,
    productToPass: state.productToPass,
    watchlist: state.watchlist,
    choice: state.choice,
    bugsList: state.bugsList,
  };
};

const NavigationBarAAP1 = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBarAAP);

export default connect()(NavigationBarAAP1);
