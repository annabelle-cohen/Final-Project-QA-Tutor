import React, { Component } from "react";
import { connect } from "react-redux";
import { StaySignIn } from "./staySignIn";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { saveUserAAP } from "../Actions/authAAPActions";
import { saveCartID } from "../Actions/savingCartId";
import { saveCart } from "../Actions/shoppingCart";
import { saveWatchlist } from "../Actions/addToWatchlist";
import { Redirect } from "react-router-dom";
import "./signintoaapwithpass.css";
import { Link } from "react-router-dom";
import "./ButtonDemo.css";

export class SignInToAAPWithPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      succededLog: false,
      isSucced: false,
      logError: "Oops! that's not a match",
    };

    this.props.saveUserAAP({
      userAAP: this.props.authAAP.userAAP,
      isLoggedIn: this.props.authAAP.isLoggedIn,
      isSignIn: false,
    });
    this.props.saveCart({
      cartId: this.props.cart.cartID,
      lastPosition: this.props.cart.lastPosition,
      totalPrice: this.props.cart.totalPrice,
      totalNumOfProducts: this.props.cart.totalNumOfProducts,
      cart: this.props.cart.cart,
      amountOfproducts: this.props.cart.amountOfproducts,
    });

    this.props.saveCartID({
      id: this.props.cartId.id,
    });

    this.props.saveWatchlist({
      Watchlist: this.props.watchlist.Watchlist,
    });

    console.log(this.props.cartId.id);
    this.signInContinue = this.signInContinue.bind(this);
  }

  checkCartAccordingServer = async () => {
    await fetch(
      "http://localhost:8092/acs/carts/getCart/" +
        this.props.authAAP.userAAP.email
    )
      .then((response) => {
        if (response.status === 200) {
          response.json().then((d) => {
            const cartFromServer = d;
            console.log("cart from server: ");
            console.log(cartFromServer);
            if (cartFromServer.products.length > this.props.cart.cart.length) {
              this.props.saveCart({
                cartId: cartFromServer.cartID,
                lastPosition: this.props.cart.lastPosition,
                totalPrice: cartFromServer.totalPrice,
                totalNumOfProducts: cartFromServer.products.length,
                cart: cartFromServer.products,
                amountOfproducts: cartFromServer.quantity,
              });
            } else {
              this.addProductToCart(cartFromServer.cartID);
            }

            this.props.saveCartID({
              id: cartFromServer.cartID,
            });
            console.log(cartFromServer.cartID);
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
  addProductToCart = async (id) => {
    const data = {
      cartID: id,
    };
    const dataJson = JSON.stringify(data);
    await fetch("http://localhost:8092/acs/carts/clearCart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: dataJson,
    }).then(
      (response) => {
        if (response.status === 200) {
          console.log("Deleted!");
        } else {
          console.log("failed delete");
        }
      },
      (error) => {
        console.log(error);
      }
    );

    this.props.cart.cart.map(async function (product) {
      const main = "http://localhost:8092//";
      const addProductLink = main + "/acs/products/addProductToCart";

      const addingProduct = {
        productID: product.productID,
        cartID: id,
      };
      console.log(addingProduct);
      const dataJson = JSON.stringify(addingProduct);

      await fetch(addProductLink, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: dataJson,
      }).then(
        (response) => {
          if (response.status === 200) {
            console.log("success");
          } else {
            console.log("failed to fetch server");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    });

    const addQuantity = "http://localhost:8092//acs/carts/updateCartQuantity";

    const addingQuantity = {
      cartID: this.props.cartId.id,
      quantity: this.props.cart.amountOfproducts,
    };

    console.log(addingQuantity);
    const dataJson2 = JSON.stringify(addingQuantity);

    await fetch(addQuantity, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: dataJson2,
    }).then(
      (response) => {
        if (response.status === 200) {
          console.log("success");
        } else {
          console.log("failed to fetch server");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  checkWatchListAccoridingServer = async () => {
    await fetch(
      "http://localhost:8092/acs/watchlist/getwatchList/" +
        this.props.authAAP.userAAP.email
    )
      .then((response) => {
        if (response.status === 200) {
          response.json().then((d) => {
            const watchList = d;
            console.log("watchlist from server: ");
            console.log(watchList.products);
            this.props.saveWatchlist({
              Watchlist: watchList.products,
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

  signInContinue = (e) => {
    if (this.props.authAAP.userAAP.password === this.state.password) {
      this.setState({ succededLog: false });
      this.checkCartAccordingServer();
      this.checkWatchListAccoridingServer();
      const userAAP = this.props.authAAP.userAAP;

      console.log(userAAP);

      this.props.saveUserAAP({
        userAAP,
        isLoggedIn: this.props.authAAP.isLoggedIn,
        isSignIn: true,
      });

      console.log("im in log in success");
      setTimeout(() => {
        this.setState({ isSucced: true });
      }, 500);
    } else {
      this.setState({ succededLog: true });

      const userAAP = this.props.authAAP.userAAP;

      this.props.saveUserAAP({
        userAAP,
        isLoggedIn: this.props.authAAP.isLoggedIn,
        isSignIn: false,
      });
    }
  };

  SignedIn = (e) => {
    const isLoggedIn = this.state.isSucced;
    if (isLoggedIn) {
      console.log(this.props.authAAP);
      return <Redirect to="/dashboard" />;
    }
  };

  render() {
    return (
      <div className="signInToAAPWithPass-container">
        <h3>Welcome</h3>
        {/**the email from local storage */}
        {this.props.authAAP.userAAP.email}

        {/**switch account to sign in again*/}
        <div>
          <br></br>Not you?{" "}
          <Link id="switch-account" to="/dashboard/signInToAAP">
            Switch Account
          </Link>
        </div>

        {/**enter password*/}
        <span id="password-span" className="p-float-label">
          <InputText
            id="password1"
            style={{ color: "black" }}
            placeholder="Enter Password"
            value={this.state.password}
            type="password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </span>
        <div>
          {/**password error*/}
          <div
            id="err-div"
            style={{ display: this.state.succededLog ? "block" : "none" }}
          >
            <label style={{ color: "red" }}>{this.state.logError}</label>
          </div>

          {/**forgot password button*/}
          <Link
            id="forgot-pass"
            to="/dashboard/signInToAAPWithPassword/forgotPassword"
          >
            Forgot Password?
          </Link>
        </div>

        {/**Signed In*/}
        <Button
          id="SignInToAAP-button"
          label="Sign In"
          onClick={this.signInContinue}
        />
        {this.SignedIn()}
        <div>
          {/**Stay Signed in*/}
          <StaySignIn></StaySignIn>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveUserAAP: (userAAP) => dispatch(saveUserAAP(userAAP)),
    saveCart: (cart) => dispatch(saveCart(cart)),
    saveCartID: (cartId) => dispatch(saveCartID(cartId)),
    saveWatchlist: (watchlist) => dispatch(saveWatchlist(watchlist)),
  };
}

const mapStateToProps = (state) => {
  return {
    authAAP: state.authAAP,
    cart: state.cart,
    cartId: state.cartId,
    watchlist: state.watchlist,
  };
};

const SignInToAAPWithPassword1 = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInToAAPWithPassword);

export default connect()(SignInToAAPWithPassword1);
