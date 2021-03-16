import React, { Component } from "react";
import { connect } from "react-redux";
import { savePassingProduct } from "../../Actions/passProduct";
import { saveCart } from "../../Actions/shoppingCart";
import { saveWatchlist } from "../../Actions/addToWatchlist";
import NavigationBarAAP from "../NavigationBarAAP";
import { saveCartID } from "../../Actions/savingCartId";
import { saveUserAAP } from "../../Actions/authAAPActions";
import HomeSearch from "../homeSearch";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import GalleryPage from "./gallery";
import "./productPage.css";

class productPage1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.productToPass.productToPass.images,
      isUpdated: true,
      title: this.props.productToPass.productToPass.title,
      location: this.props.productToPass.productToPass.location,
      unitInStock: this.props.productToPass.productToPass.unitsInStock,
      condition: this.props.productToPass.productToPass.productCondition,
      shipping: this.props.productToPass.productToPass.shippingServiceCost,
      unitPrice: this.props.productToPass.productToPass.unitPrice,
      category: this.props.productToPass.productToPass.categories.categoryName,
      unitsOnOrder: this.props.productToPass.productToPass.unitsOnOrder,
      quantity: 1,
      quantityError: "",
      watchlistArray: [],
    };

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

    this.props.saveWatchlist({
      Watchlist: this.props.watchlist.Watchlist,
    });

    this.props.saveUserAAP({
      userAAP: this.props.authAAP.userAAP,
      isLoggedIn: this.props.authAAP.isLoggedIn,
      isSignIn: this.props.authAAP.isSignIn,
    });

    this.props.saveCartID({
      id: this.props.cartId.id,
    });

    this.responsiveOptions = [
      {
        breakpoint: "1024px",
        numVisible: 5,
      },
      {
        breakpoint: "768px",
        numVisible: 3,
      },
      {
        breakpoint: "560px",
        numVisible: 1,
      },
    ];
    console.log(this.props.watchlist.Watchlist);
    this.updateState = this.updateState.bind(this);
    this.updateState();
    this.saveToRecentlyViewed();
  }

  updateState() {
    this.setState({ images: this.props.productToPass.productToPass.images });
  }
  saveToRecentlyViewed() {
    if (this.props.authAAP.isSignIn) {
      fetch(
        "http://localhost:8092/acs/viewedlist/getViewedList/" +
          this.props.authAAP.userAAP.email
      )
        .then((response) => {
          if (response.status === 200) {
            response.json().then((d) => {
              const viewed = d;
              this.addProductToRecentlyViewed(viewed);
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
  }

  addProductToRecentlyViewed = (product) => {
    console.log(product);

    const main = "http://localhost:8092//";
    const recentlyViewdLink = main + "/acs/viewedlist/addProductToViewedList";

    const viewedList = {
      productID: this.props.productToPass.productToPass.productID,
      viewedListID: product.viewedListID,
    };

    const dataJson = JSON.stringify(viewedList);

    fetch(recentlyViewdLink, {
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
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.productToPass.productToPass.title !==
      this.props.productToPass.productToPass.title
    ) {
      window.location.reload();
    }
  }

  handleQuantity = (e) => {
    this.setState({ quantity: e.target.value });
    if (e.target.value > 0 && e.target.value <= this.state.unitInStock) {
      this.setState({
        quantityError: "",
      });
    } else {
      this.setState({
        quantityError: "Invalid Quantity!",
      });
    }
  };

  handleAddToCart = (e) => {
    if (this.state.quantity <= this.state.unitInStock) {
      var tempTotalPrice =
        this.props.cart.totalPrice + this.state.unitPrice * this.state.quantity;
      var tempTotalNum =
        parseInt(this.props.cart.totalNumOfProducts) +
        parseInt(this.state.quantity);
      var tempCart = this.props.cart.cart;
      var tempAmountOfproducts = this.props.cart.amountOfproducts;
      var tempLastPosition = this.props.cart.lastPosition;
      var isAlreadyExist = tempCart.some(
        (item) => item.title === this.props.productToPass.productToPass.title
      );
      console.log(tempTotalNum);

      if (isAlreadyExist) {
        var index = tempCart.findIndex(
          (item) =>
            item.productID === this.props.productToPass.productToPass.productID
        );
        console.log(index);
        var calc = tempAmountOfproducts[index];
        tempAmountOfproducts[index] =
          parseInt(this.state.quantity) + parseInt(calc);
      } else {
        tempCart.push(this.props.productToPass.productToPass);
        tempAmountOfproducts.push(this.state.quantity);
      }
      console.log(this.state.quantity);

      this.props.saveCart({
        cartId: "",
        lastPosition: tempLastPosition,
        totalPrice: tempTotalPrice,
        totalNumOfProducts: tempTotalNum,
        cart: tempCart,
        amountOfproducts: tempAmountOfproducts,
      });
      var updateUnitInStock = this.state.unitInStock - this.state.quantity;
      this.setState({
        unitInStock: updateUnitInStock,
      });
    } else {
      console.log(
        "the number of quantity is much bigger then what in the stock"
      );
    }

    console.log(this.props.cart);
    if (this.props.authAAP.isSignIn) {
      const main = "http://localhost:8092//";
      const addProductLink = main + "/acs/products/addProductToCart";

      const addingProduct = {
        productID: this.props.productToPass.productToPass.productID,
        cartID: this.props.cartId.id,
      };
      console.log(addingProduct);
      const dataJson = JSON.stringify(addingProduct);

      fetch(addProductLink, {
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

      const addQuantity = main + "/acs/carts/updateCartQuantity";

      const addingQuantity = {
        cartID: this.props.cartId.id,
        quantity: this.props.cart.amountOfproducts,
      };

      console.log(addingQuantity);
      const dataJson2 = JSON.stringify(addingQuantity);

      fetch(addQuantity, {
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
    }
  };

  handleAddToWatchlist = (e) => {
    if (this.props.authAAP.isSignIn) {
      var array = this.props.watchlist.Watchlist;
      if (array.length != 0) {
        var isExist = array.some(
          (item) => item.title === this.props.productToPass.productToPass.title
        );
        if (isExist) {
          console.log("the product already exist");
        } else {
          this.props.watchlist.Watchlist.push(
            this.props.productToPass.productToPass
          );
          this.props.saveWatchlist({
            Watchlist: this.props.watchlist.Watchlist,
          });
          console.log(this.props.watchlist.Watchlist);
        }
      } else {
        this.props.watchlist.Watchlist.push(
          this.props.productToPass.productToPass
        );
        this.props.saveWatchlist({
          watchlist: this.props.watchlist.Watchlist,
        });
        console.log(this.props.watchlist.Watchlist);
      }
      if (!isExist) {
        fetch(
          "http://localhost:8092/acs/watchlist/getwatchList/" +
            this.props.authAAP.userAAP.email
        )
          .then((response) => {
            if (response.status === 200) {
              response.json().then((d) => {
                const watchlist = d;

                const main = "http://localhost:8092//";
                const addToWatchListLink =
                  main + "/acs/watchlist/addProductToWatchList";

                const watchListUpdated = {
                  productID: this.props.productToPass.productToPass.productID,
                  watchListID: watchlist.watchListID,
                };

                console.log(watchListUpdated);

                const dataJson = JSON.stringify(watchListUpdated);

                fetch(addToWatchListLink, {
                  method: "POST", // or 'PUT'
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: dataJson,
                }).then(
                  (response) => {
                    if (response.status === 200) {
                      console.log("success adding Watchlist");
                    } else {
                      console.log("failed to fetch server watchlist");
                    }
                  },
                  (error) => {
                    console.log(error);
                  }
                );
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
    }
  };

  render() {
    return (
      <div>
        <NavigationBarAAP />
        <div>
          <hr id="border16" align="right" />
        </div>
        <HomeSearch />
        <div id="context-container">
          <div
            style={{
              display: "inline-block",
              position: "relative",
              zIndex: "2",
              top: -195,
            }}
          >
            <GalleryPage
              images={this.state.images}
              responsiveOptions={this.responsiveOptions}
            />
          </div>
          <div
            style={{
              display: "inline-block",
              width: "600px",
              marginLeft: "10px",
              position: "relative",
              zIndex: "0",
            }}
          >
            <h5 style={{ fontWeight: "bold" }}>{this.state.title}</h5>✤
            {this.unitInStock > 0 ? " In stock " : " Out of stock "}✤
            {" " + this.state.location} Seller ✤
            {this.state.shipping <= 0 ? " FREE Shipping ✤" : ""}
            <div>
              <hr id="border17" align="right" />
            </div>
            <div
              style={{
                marginLeft: "40px",
                fontWeight: "bold",
                color: "gray",
              }}
            >
              Condition:
              <p
                style={{
                  display: "inline-block",
                  marginLeft: "-25px",
                  fontSize: "14px",
                }}
              >
                {" " + this.state.condition}
              </p>
            </div>
            <div
              style={{
                marginLeft: "40px",
                fontWeight: "bold",
                color: "gray",
                marginTop: "-35px",
              }}
            >
              Quantity:
              <div
                style={{
                  display: "inline-block",
                }}
              >
                <InputText
                  id="quantity"
                  value={this.state.quantity}
                  onChange={this.handleQuantity}
                  aria-describedby="quantity-help"
                  className="p-invalid p-d-block"
                />
              </div>
              <div
                style={{
                  display: "inline-block",
                }}
              >
                <p
                  style={{
                    color: "gray",
                    marginTop: "-10px",
                    marginBottom: "-73px",
                  }}
                >
                  {this.state.unitInStock} Available
                </p>
                <p style={{ color: "red", textDecoration: "underline" }}>
                  {this.props.productToPass.productToPass.unitsOnOrder} Sold
                </p>
              </div>
              <div>
                <small id="quantity-help" className="p-invalid p-d-block">
                  {this.state.quantityError}
                </small>
              </div>
            </div>
            <div>
              <Card
                style={{
                  marginBottom: "2em",
                  background: "lightgray",
                  width: "600px",
                  height: "150px",
                }}
              >
                <div
                  style={{
                    marginTop: "-20px",
                    marginLeft: "50px",
                    position: "relative",
                    zIndex: "0",
                  }}
                >
                  Price:
                  <div
                    style={{
                      display: "inline-block",
                      marginTop: "-30px",
                      marginLeft: "-20px",
                    }}
                  >
                    <p
                      style={{
                        color: "black",
                        fontWeight: "bolder",
                        fontSize: "16px",
                      }}
                    >
                      US ${this.state.unitPrice}
                    </p>
                  </div>
                  <div style={{ display: "inline-block" }}>
                    <Button
                      id="addToCart"
                      onClick={this.handleAddToCart}
                      label="Add To Cart"
                    />
                  </div>
                  <div
                    style={{
                      marginTop: "-30px",
                      marginLeft: "220px",
                      position: "relative",
                      zIndex: "2",
                    }}
                  >
                    <Button
                      id="add-to-watchlist"
                      label="Add to watchlist"
                      icon="pi pi-eye"
                      onClick={this.handleAddToWatchlist}
                    ></Button>
                  </div>
                  <div
                    style={{
                      width: "200px",
                      background: "white",
                      height: "47px",
                    }}
                  >
                    <h6
                      style={{
                        color: "green",
                        marginLeft: "65px",
                        paddingTop: "10px",
                      }}
                    >
                      Longtime
                    </h6>
                    <div
                      style={{
                        color: "black",
                        fontSize: "12px",
                        marginLeft: "80px",
                        marginTop: "-7px",
                      }}
                    >
                      Member
                    </div>
                  </div>
                  <div
                    style={{
                      width: "200px",
                      background: "white",
                      height: "47px",
                      display: "inline-block",
                      marginLeft: "201px",
                      top: -47,
                      position: "relative",
                      zIndex: "2",
                    }}
                  >
                    <h6
                      style={{
                        color: "green",
                        marginLeft: "65px",
                      }}
                    >
                      Fast and safe
                    </h6>
                    <div
                      style={{
                        color: "black",
                        fontSize: "12px",
                        marginLeft: "80px",
                        marginTop: "-7px",
                      }}
                    >
                      Shipping
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "inline-block",
                    marginLeft: "650px",
                    zIndex: "2",
                    position: "relative",
                    top: -400,
                    width: "270px",
                    border: "1px solid gray",
                    background: "white",
                    padding: "10px",
                    paddingRight: "30px",
                  }}
                >
                  <h6 style={{ color: "black" }}>Shop with confidence</h6>

                  <div>
                    <img
                      alt="star"
                      width="30"
                      height="30"
                      style={{
                        position: "absolute",
                        zIndex: "0",
                        marginTop: "7px",
                      }}
                      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNTExcHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iLTM4IDAgNTExIDUxMS45OTk1NiIgd2lkdGg9IjUxMXB0Ij4KPGcgaWQ9InN1cmZhY2UxIj4KPHBhdGggZD0iTSA0MTMuNDc2NTYyIDM0MS45MTAxNTYgQyAzOTkuNzE0ODQ0IDM3OS4yMDcwMzEgMzc4LjkwMjM0NCA0MTEuNjM2NzE5IDM1MS42MDkzNzUgNDM4LjI4OTA2MiBDIDMyMC41NDI5NjkgNDY4LjYyNSAyNzkuODYzMjgxIDQ5Mi43MzA0NjkgMjMwLjY5OTIxOSA1MDkuOTI1NzgxIEMgMjI5LjA4NTkzOCA1MTAuNDg4MjgxIDIyNy40MDIzNDQgNTEwLjk0OTIxOSAyMjUuNzEwOTM4IDUxMS4yODkwNjIgQyAyMjMuNDc2NTYyIDUxMS43MzA0NjkgMjIxLjIwMzEyNSA1MTEuOTY4NzUgMjE4Ljk0OTIxOSA1MTIgTCAyMTguNTA3ODEyIDUxMiBDIDIxNi4xMDU0NjkgNTEyIDIxMy42OTE0MDYgNTExLjc1NzgxMiAyMTEuMjk2ODc1IDUxMS4yODkwNjIgQyAyMDkuNjA1NDY5IDUxMC45NDkyMTkgMjA3Ljk0NTMxMiA1MTAuNDg4MjgxIDIwNi4zMzk4NDQgNTA5LjkzNzUgQyAxNTcuMTE3MTg4IDQ5Mi43Njk1MzEgMTE2LjM4NjcxOSA0NjguNjc1NzgxIDg1LjI4OTA2MiA0MzguMzM5ODQ0IEMgNTcuOTg0Mzc1IDQxMS42ODc1IDM3LjE3NTc4MSAzNzkuMjc3MzQ0IDIzLjQzMzU5NCAzNDEuOTgwNDY5IEMgLTEuNTU0Njg4IDI3NC4xNjc5NjkgLTAuMTMyODEyIDE5OS40NjQ4NDQgMS4wMTE3MTkgMTM5LjQzMzU5NCBMIDEuMDMxMjUgMTM4LjUxMTcxOSBDIDEuMjYxNzE5IDEzMy41NTQ2ODggMS40MTAxNTYgMTI4LjM0NzY1NiAxLjQ5MjE4OCAxMjIuNTk3NjU2IEMgMS45MTAxNTYgOTQuMzY3MTg4IDI0LjM1NTQ2OSA3MS4wMTE3MTkgNTIuNTg5ODQ0IDY5LjQzNzUgQyAxMTEuNDU3MDMxIDY2LjE1MjM0NCAxNTYuOTk2MDk0IDQ2Ljk1MzEyNSAxOTUuOTA2MjUgOS4wMjczNDQgTCAxOTYuMjQ2MDk0IDguNzE0ODQ0IEMgMjAyLjcwNzAzMSAyLjc4OTA2MiAyMTAuODQ3NjU2IC0wLjExNzE4OCAyMTguOTQ5MjE5IDAuMDAzOTA2MjUgQyAyMjYuNzYxNzE5IDAuMTA1NDY5IDIzNC41NDI5NjkgMy4wMDc4MTIgMjQwLjc3MzQzOCA4LjcxNDg0NCBMIDI0MS4xMDU0NjkgOS4wMjczNDQgQyAyODAuMDIzNDM4IDQ2Ljk1MzEyNSAzMjUuNTYyNSA2Ni4xNTIzNDQgMzg0LjQyOTY4OCA2OS40Mzc1IEMgNDEyLjY2NDA2MiA3MS4wMTE3MTkgNDM1LjEwOTM3NSA5NC4zNjcxODggNDM1LjUyNzM0NCAxMjIuNTk3NjU2IEMgNDM1LjYwOTM3NSAxMjguMzg2NzE5IDQzNS43NTc4MTIgMTMzLjU4NTkzOCA0MzUuOTg4MjgxIDEzOC41MTE3MTkgTCA0MzYgMTM4LjkwMjM0NCBDIDQzNy4xNDA2MjUgMTk5LjA0Njg3NSA0MzguNTU0Njg4IDI3My44OTg0MzggNDEzLjQ3NjU2MiAzNDEuOTEwMTU2IFogTSA0MTMuNDc2NTYyIDM0MS45MTAxNTYgIiBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6cmdiKDAlLDg2LjY2NjY2NyUsNTAuMTk2MDc4JSk7ZmlsbC1vcGFjaXR5OjE7IiAvPgo8cGF0aCBkPSJNIDQxMy40NzY1NjIgMzQxLjkxMDE1NiBDIDM5OS43MTQ4NDQgMzc5LjIwNzAzMSAzNzguOTAyMzQ0IDQxMS42MzY3MTkgMzUxLjYwOTM3NSA0MzguMjg5MDYyIEMgMzIwLjU0Mjk2OSA0NjguNjI1IDI3OS44NjMyODEgNDkyLjczMDQ2OSAyMzAuNjk5MjE5IDUwOS45MjU3ODEgQyAyMjkuMDg1OTM4IDUxMC40ODgyODEgMjI3LjQwMjM0NCA1MTAuOTQ5MjE5IDIyNS43MTA5MzggNTExLjI4OTA2MiBDIDIyMy40NzY1NjIgNTExLjczMDQ2OSAyMjEuMjAzMTI1IDUxMS45Njg3NSAyMTguOTQ5MjE5IDUxMiBMIDIxOC45NDkyMTkgMC4wMDM5MDYyNSBDIDIyNi43NjE3MTkgMC4xMDU0NjkgMjM0LjU0Mjk2OSAzLjAwNzgxMiAyNDAuNzczNDM4IDguNzE0ODQ0IEwgMjQxLjEwNTQ2OSA5LjAyNzM0NCBDIDI4MC4wMjM0MzggNDYuOTUzMTI1IDMyNS41NjI1IDY2LjE1MjM0NCAzODQuNDI5Njg4IDY5LjQzNzUgQyA0MTIuNjY0MDYyIDcxLjAxMTcxOSA0MzUuMTA5Mzc1IDk0LjM2NzE4OCA0MzUuNTI3MzQ0IDEyMi41OTc2NTYgQyA0MzUuNjA5Mzc1IDEyOC4zODY3MTkgNDM1Ljc1NzgxMiAxMzMuNTg1OTM4IDQzNS45ODgyODEgMTM4LjUxMTcxOSBMIDQzNiAxMzguOTAyMzQ0IEMgNDM3LjE0MDYyNSAxOTkuMDQ2ODc1IDQzOC41NTQ2ODggMjczLjg5ODQzOCA0MTMuNDc2NTYyIDM0MS45MTAxNTYgWiBNIDQxMy40NzY1NjIgMzQxLjkxMDE1NiAiIHN0eWxlPSIgc3Ryb2tlOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDpyZ2IoMCUsNjYuNjY2NjY3JSwzOC44MjM1MjklKTtmaWxsLW9wYWNpdHk6MTsiIC8+CjxwYXRoIGQ9Ik0gMzQ2LjEwMTU2MiAyNTYgQyAzNDYuMTAxNTYyIDMyNi4yMDcwMzEgMjg5LjA5NzY1NiAzODMuMzU1NDY5IDIxOC45NDkyMTkgMzgzLjYwNTQ2OSBMIDIxOC41IDM4My42MDU0NjkgQyAxNDguMTQ0NTMxIDM4My42MDU0NjkgOTAuODk0NTMxIDMyNi4zNTkzNzUgOTAuODk0NTMxIDI1NiBDIDkwLjg5NDUzMSAxODUuNjQ0NTMxIDE0OC4xNDQ1MzEgMTI4LjM5ODQzOCAyMTguNSAxMjguMzk4NDM4IEwgMjE4Ljk0OTIxOSAxMjguMzk4NDM4IEMgMjg5LjA5NzY1NiAxMjguNjQ4NDM4IDM0Ni4xMDE1NjIgMTg1Ljc5Njg3NSAzNDYuMTAxNTYyIDI1NiBaIE0gMzQ2LjEwMTU2MiAyNTYgIiBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6cmdiKDEwMCUsMTAwJSwxMDAlKTtmaWxsLW9wYWNpdHk6MTsiIC8+CjxwYXRoIGQ9Ik0gMzQ2LjEwMTU2MiAyNTYgQyAzNDYuMTAxNTYyIDMyNi4yMDcwMzEgMjg5LjA5NzY1NiAzODMuMzU1NDY5IDIxOC45NDkyMTkgMzgzLjYwNTQ2OSBMIDIxOC45NDkyMTkgMTI4LjM5ODQzOCBDIDI4OS4wOTc2NTYgMTI4LjY0ODQzOCAzNDYuMTAxNTYyIDE4NS43OTY4NzUgMzQ2LjEwMTU2MiAyNTYgWiBNIDM0Ni4xMDE1NjIgMjU2ICIgc3R5bGU9IiBzdHJva2U6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOnJnYig4OC4yMzUyOTQlLDkyLjE1Njg2MyUsOTQuMTE3NjQ3JSk7ZmlsbC1vcGFjaXR5OjE7IiAvPgo8cGF0aCBkPSJNIDI3Ni40MTc5NjkgMjM3LjYyNSBMIDIxOC45NDkyMTkgMjk1LjEwMTU2MiBMIDIwNi41MzEyNSAzMDcuNTE5NTMxIEMgMjAzLjU5NzY1NiAzMTAuNDUzMTI1IDE5OS43NSAzMTEuOTE3OTY5IDE5NS45MDYyNSAzMTEuOTE3OTY5IEMgMTkyLjA1ODU5NCAzMTEuOTE3OTY5IDE4OC4yMTQ4NDQgMzEwLjQ1MzEyNSAxODUuMjc3MzQ0IDMwNy41MTk1MzEgTCAxNTguNTc4MTI1IDI4MC44MDg1OTQgQyAxNTIuNzEwOTM4IDI3NC45NDE0MDYgMTUyLjcxMDkzOCAyNjUuNDM3NSAxNTguNTc4MTI1IDI1OS41NjY0MDYgQyAxNjQuNDM3NSAyNTMuNjk5MjE5IDE3My45NTMxMjUgMjUzLjY5OTIxOSAxNzkuODIwMzEyIDI1OS41NjY0MDYgTCAxOTUuOTA2MjUgMjc1LjY1MjM0NCBMIDI1NS4xNzU3ODEgMjE2LjM4MjgxMiBDIDI2MS4wNDI5NjkgMjEwLjUxMTcxOSAyNzAuNTU4NTk0IDIxMC41MTE3MTkgMjc2LjQxNzk2OSAyMTYuMzgyODEyIEMgMjgyLjI4NTE1NiAyMjIuMjUgMjgyLjI4NTE1NiAyMzEuNzY1NjI1IDI3Ni40MTc5NjkgMjM3LjYyNSBaIE0gMjc2LjQxNzk2OSAyMzcuNjI1ICIgc3R5bGU9IiBzdHJva2U6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOnJnYig3MC41ODgyMzUlLDgyLjM1Mjk0MSUsODQuMzEzNzI1JSk7ZmlsbC1vcGFjaXR5OjE7IiAvPgo8cGF0aCBkPSJNIDI3Ni40MTc5NjkgMjM3LjYyNSBMIDIxOC45NDkyMTkgMjk1LjEwMTU2MiBMIDIxOC45NDkyMTkgMjUyLjYwNTQ2OSBMIDI1NS4xNzU3ODEgMjE2LjM4MjgxMiBDIDI2MS4wNDI5NjkgMjEwLjUxMTcxOSAyNzAuNTU4NTk0IDIxMC41MTE3MTkgMjc2LjQxNzk2OSAyMTYuMzgyODEyIEMgMjgyLjI4NTE1NiAyMjIuMjUgMjgyLjI4NTE1NiAyMzEuNzY1NjI1IDI3Ni40MTc5NjkgMjM3LjYyNSBaIE0gMjc2LjQxNzk2OSAyMzcuNjI1ICIgc3R5bGU9IiBzdHJva2U6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOnJnYig0My41Mjk0MTIlLDY0LjcwNTg4MiUsNjYuNjY2NjY3JSk7ZmlsbC1vcGFjaXR5OjE7IiAvPgo8L2c+Cjwvc3ZnPg=="
                    />
                    <div
                      style={{
                        display: "inline-block",
                        top: 0,
                        position: "relative",
                        zIndex: "2",
                        marginLeft: "35px",
                        color: "black",
                      }}
                    >
                      AAP Money Back Guarantee
                    </div>
                    <div
                      style={{
                        display: "inline-block",
                        top: 0,
                        position: "relative",
                        zIndex: "2",
                        marginLeft: "35px",
                        fontSize: "12px",
                      }}
                    >
                      Get the item you ordered or get your money back.
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        <div style={{ marginLeft: "420px", marginTop: "-180px" }}>
          <div
            style={{
              color: "gray",
              display: "inline-block",
              position: "absolute",
              zIndex: 1,
            }}
          >
            Payments:
          </div>
          <div
            style={{
              display: "inline-block",
              marginLeft: "5px",
              position: "relative",
              zIndex: 1,
              marginLeft: "70px",
              marginTop: "-8px",
              backgroundColor: "white",
            }}
          >
            <img
              height="30"
              width="33"
              style={{ marginTop: "5px", border: "1px solid gray" }}
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDg4LjggNDg4LjgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ4OC44IDQ4OC44OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBzdHlsZT0iZmlsbDojMzJBNkNFOyIgZD0iTTM4MS42LDIwMC40Yy0xMiwwLTIxLjYsMy4yLTI5LjYsNC44bC0yLjQsMTguNGM0LTEuNiwxNS4yLTQuOCwyNC44LTUuNmM5LjYsMCwxNS4yLDEuNiwxMy42LDEwLjQNCgljLTI4LjgsMC00OCw1LjYtNTIsMjQuOGMtNS42LDMyLDI5LjYsMzIuOCw0My4yLDE4LjRsLTEuNiw4LjhoMjUuNmwxMS4yLTUyQzQxOC40LDIwNi44LDM5OS4yLDE5OS42LDM4MS42LDIwMC40eiBNMzgzLjIsMjU0DQoJYy0xLjYsNi40LTcuMiw4LjgtMTMuNiw5LjZjLTUuNiwwLTEwLjQtMy4yLTcuMi05LjZjMy4yLTQuOCwxMC40LTQuOCwxNi00LjhjMS42LDAsNCwwLDYuNCwwQzM4NCwyNDguNCwzODMuMiwyNTEuNiwzODMuMiwyNTR6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojMUE4MEFEOyIgZD0iTTM0OS42LDIyMy42YzQtMS42LDE1LjItNC44LDI0LjgtNS42YzkuNiwwLDE1LjIsMS42LDEzLjYsMTAuNGMtMjguOCwwLTQ4LDUuNi01MiwyNC44DQoJYy01LjYsMzIsMjkuNiwzMi44LDQzLjIsMTguNGwtMS42LDguOGgyNS42bDExLjItNTJjNC44LTIxLjYtMTUuMi0yNy4yLTMyLjgtMjcuMiBNMzgzLjIsMjU0Yy0xLjYsNi40LTcuMiw4LjgtMTMuNiw5LjYNCgljLTUuNiwwLTEwLjQtMy4yLTcuMi05LjZjMy4yLTQuOCwxMC40LTQuOCwxNi00LjhjMS42LDAsNCwwLDYuNCwwQzM4NCwyNDguNCwzODMuMiwyNTEuNiwzODMuMiwyNTR6Ii8+DQo8cG9seWdvbiBzdHlsZT0iZmlsbDojMzJBNkNFOyIgcG9pbnRzPSI0MzYsMTc2LjQgNDE1LjIsMjgwLjQgNDQwLjgsMjgwLjQgNDYyLjQsMTc2LjQgIi8+DQo8cG9seWdvbiBzdHlsZT0iZmlsbDojMUE4MEFEOyIgcG9pbnRzPSI0NTQuNCwxNzYuNCA0MTUuMiwyODAuNCA0NDAuOCwyODAuNCA0NjIuNCwxNzYuNCA0MzYsMTc2LjQgNDM2LDE3Ni40ICIvPg0KPHBhdGggc3R5bGU9ImZpbGw6IzMyQTZDRTsiIGQ9Ik0zMTYuOCwxNzYuNGgtNDcuMmwtMjAuOCwxMDRoMjhsNy4yLTMyaDIwYzE5LjIsMCwzNS4yLTExLjIsMzkuMi0zMS4yDQoJQzM0Ny4yLDE5NCwzMzAuNCwxNzYuNCwzMTYuOCwxNzYuNHogTTMxNiwyMTIuNGMtMS42LDcuMi04LjgsMTItMTYsMTJoLTEyLjhsNS42LTI0aDEzLjZDMzEzLjYsMjAwLjQsMzE3LjYsMjA1LjIsMzE2LDIxMi40eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6IzFBODBBRDsiIGQ9Ik0zMTYuOCwxNzYuNGgtMzJsLTM2LjgsMTA0aDI4bDcuMi0zMmgyMGMxOS4yLDAsMzUuMi0xMS4yLDM5LjItMzEuMg0KCUMzNDcuMiwxOTQsMzMwLjQsMTc2LjQsMzE2LjgsMTc2LjR6IE0zMTYsMjEyLjRjLTEuNiw3LjItOC44LDEyLTE2LDEyaC0xMi44bDUuNi0yNGgxMy42QzMxMy42LDIwMC40LDMxNy42LDIwNS4yLDMxNiwyMTIuNHoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiMyMTc4OUU7IiBkPSJNMTMyLDIwMC40Yy0xMiwwLTIxLjYsMy4yLTI4LjgsNC44bC0yLjQsMTguNGMzLjItMS42LDE1LjItNC44LDI0LjgtNS42YzkuNiwwLDE1LjIsMS42LDEzLjYsMTAuNA0KCWMtMjgsMC00Ny4yLDUuNi01MS4yLDI0LjhjLTUuNiwzMiwyOC44LDMyLjgsNDIuNCwxOC40bC0xLjYsOC44aDI1LjZsMTEuMi01MkMxNjkuNiwyMDYuOCwxNDkuNiwxOTkuNiwxMzIsMjAwLjR6IE0xMzQuNCwyNTQNCgljLTEuNiw2LjQtNy4yLDguOC0xMy42LDkuNmMtNS42LDAtMTAuNC0zLjItNi40LTkuNmMzLjItNC44LDEwLjQtNC44LDE1LjItNC44YzIuNCwwLDQsMCw2LjQsMEMxMzUuMiwyNDguNCwxMzQuNCwyNTEuNiwxMzQuNCwyNTR6DQoJIi8+DQo8cGF0aCBzdHlsZT0iZmlsbDojMUE1QjgwOyIgZD0iTTEwMS42LDIyMy42YzMuMi0xLjYsMTUuMi00LjgsMjQuOC01LjZjOS42LDAsMTUuMiwxLjYsMTMuNiwxMC40Yy0yOCwwLTQ3LjIsNS42LTUxLjIsMjQuOA0KCWMtNS42LDMyLDI4LjgsMzIuOCw0Mi40LDE4LjRsLTIuNCw4LjhoMjUuNmwxMS4yLTUyYzQuOC0yMS42LTE1LjItMjcuMi0zMi44LTI3LjIgTTEzNC40LDI1NGMtMS42LDYuNC03LjIsOC44LTEzLjYsOS42DQoJYy01LjYsMC0xMC40LTMuMi02LjQtOS42YzMuMi00LjgsMTAuNC00LjgsMTUuMi00LjhjMi40LDAsNCwwLDYuNCwwQzEzNS4yLDI0OC40LDEzNC40LDI1MS42LDEzNC40LDI1NHoiLz4NCjxwb2x5Z29uIHN0eWxlPSJmaWxsOiMyMTc4OUU7IiBwb2ludHM9IjE3NiwyMDAuNCAyMDEuNiwyMDAuNCAyMDUuNiwyNDUuMiAyMzEuMiwyMDAuNCAyNTcuNiwyMDAuNCAxOTYuOCwzMTIuNCAxNjgsMzEyLjQgDQoJMTg2LjQsMjc4LjggIi8+DQo8cG9seWxpbmUgc3R5bGU9ImZpbGw6IzFBNUI4MDsiIHBvaW50cz0iMjAxLjYsMjAyIDIwNS42LDI0NiAyMzEuMiwyMDAuNCAyNTcuNiwyMDAuNCAxOTYuOCwzMTIuNCAxNjgsMzEyLjQgMTg2LjQsMjc5LjYgIi8+DQo8cGF0aCBzdHlsZT0iZmlsbDojMjE3ODlFOyIgZD0iTTY4LjgsMTc2LjRoLTQ4TDAsMjgwLjRoMjhsNy4yLTMyaDIwYzE5LjIsMCwzNS4yLTExLjIsMzkuMi0zMS4yQzk5LjIsMTk0LDgyLjQsMTc2LjQsNjguOCwxNzYuNHoNCgkgTTY4LDIxMi40Yy0xLjYsNy4yLTguOCwxMi0xNiwxMkgzOS4ybDUuNi0yNGgxMy42QzY1LjYsMjAwLjQsNjkuNiwyMDUuMiw2OCwyMTIuNHoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiMxQTVCODA7IiBkPSJNNjguOCwxNzYuNEg0Ny4yTDAsMjgwLjRoMjhsNy4yLTMyaDIwYzE5LjIsMCwzNS4yLTExLjIsMzkuMi0zMS4yQzk5LjIsMTk0LDgyLjQsMTc2LjQsNjguOCwxNzYuNHoNCgkgTTY4LDIxMi40Yy0xLjYsNy4yLTguOCwxMi0xNiwxMkgzOS4ybDUuNi0yNGgxMy42QzY1LjYsMjAwLjQsNjkuNiwyMDUuMiw2OCwyMTIuNHoiLz4NCjxnPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiMwNjQzNUU7IiBkPSJNMTI3LjIsMjI4LjRjLTIxLjYsMS42LTM2LDgtMzkuMiwyNGMtNS42LDMyLDI4LjgsMzIuOCw0Mi40LDE4LjRsLTEuNiw5LjZoMjUuNmw0LTE5LjJMMTI3LjIsMjI4LjQNCgkJeiBNMTM0LjQsMjU0Yy0xLjYsNi40LTcuMiw4LjgtMTMuNiw5LjZjLTUuNiwwLTEwLjQtMy4yLTYuNC05LjZjMy4yLTQuOCwxMC40LTQuOCwxNS4yLTQuOGMyLjQsMCw0LDAsNi40LDANCgkJQzEzNS4yLDI0OC40LDEzNC40LDI1MS42LDEzNC40LDI1NHoiLz4NCgk8cG9seWdvbiBzdHlsZT0iZmlsbDojMDY0MzVFOyIgcG9pbnRzPSIyMDcuMiwyNDQuNCAyMDUuNiwyNDYuOCAyMjIuNCwyNjIuOCAyNTcuNiwyMDAuNCAyMzEuMiwyMDAuNCAJIi8+DQoJPHBvbHlnb24gc3R5bGU9ImZpbGw6IzA2NDM1RTsiIHBvaW50cz0iMjgsMjgwLjQgMzUuMiwyNDguNCAyLjQsMjgwLjQgCSIvPg0KPC9nPg0KPGc+DQoJPHBvbHlnb24gc3R5bGU9ImZpbGw6IzIyNzNBQTsiIHBvaW50cz0iMjc2LDI4MC40IDI4My4yLDI0Ni44IDI4My4yLDI0Ny42IDI1MC40LDI4MC40IAkiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojMjI3M0FBOyIgZD0iTTM3NiwyMjguNGMtMjEuNiwxLjYtMzYsOC0zOS4yLDI0Yy01LjYsMzIsMjkuNiwzMi44LDQzLjIsMTguNGwtMi40LDkuNmgyNS42bDQtMTkuMkwzNzYsMjI4LjR6DQoJCSBNMzgzLjIsMjU0Yy0xLjYsNi40LTcuMiw4LjgtMTMuNiw5LjZjLTUuNiwwLTEwLjQtMy4yLTcuMi05LjZjMy4yLTQuOCwxMC40LTQuOCwxNi00LjhjMS42LDAsNCwwLDYuNCwwDQoJCUMzODQsMjQ4LjQsMzgzLjIsMjUxLjYsMzgzLjIsMjU0eiIvPg0KCTxwb2x5Z29uIHN0eWxlPSJmaWxsOiMyMjczQUE7IiBwb2ludHM9IjQzMy42LDIzMy4yIDQxNS4yLDI4MC40IDQ0MC44LDI4MC40IDQ0OCwyNDguNCAJIi8+DQo8L2c+DQo8Zz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojMzJBNkNFOyIgZD0iTTQ2OCwxOTMuMlYxODJoLTR2LTEuNmgxMC40djEuNmgtNHYxMS4ySDQ2OHoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojMzJBNkNFOyIgZD0iTTQ3NiwxOTMuMnYtMTIuOGgyLjRsMy4yLDguOGMwLDAuOCwwLjgsMS42LDAuOCwxLjZjMC0wLjgsMC0wLjgsMC44LTIuNGwzLjItOC44aDIuNHYxMi44aC0xLjYNCgkJdi0xMS4ybC00LDExLjJoLTIuNGwtNC0xMS4ydjExLjJINDc2VjE5My4yeiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo="
            />
          </div>
          <div
            style={{
              display: "inline-block",
              marginLeft: "5px",
              position: "relative",
              zIndex: 1,
              marginLeft: "2px",
              marginTop: "-8px",
              backgroundColor: "white",
            }}
          >
            <img
              height="30"
              width="33"
              style={{ marginTop: "5px", border: "1px solid gray" }}
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTA0IDUwNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTA0IDUwNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBvbHlnb24gc3R5bGU9ImZpbGw6IzNDNThCRjsiIHBvaW50cz0iMTg0LjgsMzI0LjQgMjEwLjQsMTgwLjQgMjUwLjQsMTgwLjQgMjI1LjYsMzI0LjQgIi8+DQo8cG9seWdvbiBzdHlsZT0iZmlsbDojMjkzNjg4OyIgcG9pbnRzPSIxODQuOCwzMjQuNCAyMTcuNiwxODAuNCAyNTAuNCwxODAuNCAyMjUuNiwzMjQuNCAiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiMzQzU4QkY7IiBkPSJNMzcwLjQsMTgyYy04LTMuMi0yMC44LTYuNC0zNi44LTYuNGMtNDAsMC02OC44LDIwLTY4LjgsNDguOGMwLDIxLjYsMjAsMzIuOCwzNiw0MA0KCXMyMC44LDEyLDIwLjgsMTguNGMwLDkuNi0xMi44LDE0LjQtMjQsMTQuNGMtMTYsMC0yNC44LTIuNC0zOC40LThsLTUuNi0yLjRsLTUuNiwzMi44YzkuNiw0LDI3LjIsOCw0NS42LDgNCgljNDIuNCwwLDcwLjQtMjAsNzAuNC01MC40YzAtMTYuOC0xMC40LTI5LjYtMzQuNC00MGMtMTQuNC03LjItMjMuMi0xMS4yLTIzLjItMTguNGMwLTYuNCw3LjItMTIuOCwyMy4yLTEyLjgNCgljMTMuNiwwLDIzLjIsMi40LDMwLjQsNS42bDQsMS42TDM3MC40LDE4MkwzNzAuNCwxODJ6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojMjkzNjg4OyIgZD0iTTM3MC40LDE4MmMtOC0zLjItMjAuOC02LjQtMzYuOC02LjRjLTQwLDAtNjEuNiwyMC02MS42LDQ4LjhjMCwyMS42LDEyLjgsMzIuOCwyOC44LDQwDQoJczIwLjgsMTIsMjAuOCwxOC40YzAsOS42LTEyLjgsMTQuNC0yNCwxNC40Yy0xNiwwLTI0LjgtMi40LTM4LjQtOGwtNS42LTIuNGwtNS42LDMyLjhjOS42LDQsMjcuMiw4LDQ1LjYsOA0KCWM0Mi40LDAsNzAuNC0yMCw3MC40LTUwLjRjMC0xNi44LTEwLjQtMjkuNi0zNC40LTQwYy0xNC40LTcuMi0yMy4yLTExLjItMjMuMi0xOC40YzAtNi40LDcuMi0xMi44LDIzLjItMTIuOA0KCWMxMy42LDAsMjMuMiwyLjQsMzAuNCw1LjZsNCwxLjZMMzcwLjQsMTgyTDM3MC40LDE4MnoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiMzQzU4QkY7IiBkPSJNNDM5LjIsMTgwLjRjLTkuNiwwLTE2LjgsMC44LTIwLjgsMTAuNGwtNjAsMTMzLjZoNDMuMmw4LTI0aDUxLjJsNC44LDI0SDUwNGwtMzMuNi0xNDRINDM5LjJ6DQoJIE00MjAuOCwyNzYuNGMyLjQtNy4yLDE2LTQyLjQsMTYtNDIuNHMzLjItOC44LDUuNi0xNC40bDIuNCwxMy42YzAsMCw4LDM2LDkuNiw0NGgtMzMuNlYyNzYuNHoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiMyOTM2ODg7IiBkPSJNNDQ4LjgsMTgwLjRjLTkuNiwwLTE2LjgsMC44LTIwLjgsMTAuNGwtNjkuNiwxMzMuNmg0My4ybDgtMjRoNTEuMmw0LjgsMjRINTA0bC0zMy42LTE0NEg0NDguOHoNCgkgTTQyMC44LDI3Ni40YzMuMi04LDE2LTQyLjQsMTYtNDIuNHMzLjItOC44LDUuNi0xNC40bDIuNCwxMy42YzAsMCw4LDM2LDkuNiw0NGgtMzMuNlYyNzYuNHoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiMzQzU4QkY7IiBkPSJNMTExLjIsMjgxLjJsLTQtMjAuOGMtNy4yLTI0LTMwLjQtNTAuNC01Ni02My4ybDM2LDEyOGg0My4ybDY0LjgtMTQ0SDE1MkwxMTEuMiwyODEuMnoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiMyOTM2ODg7IiBkPSJNMTExLjIsMjgxLjJsLTQtMjAuOGMtNy4yLTI0LTMwLjQtNTAuNC01Ni02My4ybDM2LDEyOGg0My4ybDY0LjgtMTQ0SDE2MEwxMTEuMiwyODEuMnoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRkJDMDA7IiBkPSJNMCwxODAuNGw3LjIsMS42YzUxLjIsMTIsODYuNCw0Mi40LDEwMCw3OC40bC0xNC40LTY4Yy0yLjQtOS42LTkuNi0xMi0xOC40LTEySDB6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRjc5ODFEOyIgZD0iTTAsMTgwLjRMMCwxODAuNGM1MS4yLDEyLDkzLjYsNDMuMiwxMDcuMiw3OS4ybC0xMy42LTU2LjhjLTIuNC05LjYtMTAuNC0xNS4yLTE5LjItMTUuMkwwLDE4MC40eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0VEN0MwMDsiIGQ9Ik0wLDE4MC40TDAsMTgwLjRjNTEuMiwxMiw5My42LDQzLjIsMTA3LjIsNzkuMmwtOS42LTMxLjJjLTIuNC05LjYtNS42LTE5LjItMTYuOC0yMy4yTDAsMTgwLjR6Ii8+DQo8Zz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojMDUxMjQ0OyIgZD0iTTE1MS4yLDI3Ni40TDEyNCwyNDkuMmwtMTIuOCwzMC40bC0zLjItMjBjLTcuMi0yNC0zMC40LTUwLjQtNTYtNjMuMmwzNiwxMjhoNDMuMkwxNTEuMiwyNzYuNHoiLz4NCgk8cG9seWdvbiBzdHlsZT0iZmlsbDojMDUxMjQ0OyIgcG9pbnRzPSIyMjUuNiwzMjQuNCAxOTEuMiwyODkuMiAxODQuOCwzMjQuNCAJIi8+DQoJPHBhdGggc3R5bGU9ImZpbGw6IzA1MTI0NDsiIGQ9Ik0zMTcuNiwyNzQuOEwzMTcuNiwyNzQuOGMzLjIsMy4yLDQuOCw1LjYsNCw4LjhjMCw5LjYtMTIuOCwxNC40LTI0LDE0LjRjLTE2LDAtMjQuOC0yLjQtMzguNC04DQoJCWwtNS42LTIuNGwtNS42LDMyLjhjOS42LDQsMjcuMiw4LDQ1LjYsOGMyNS42LDAsNDYuNC03LjIsNTguNC0yMEwzMTcuNiwyNzQuOHoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojMDUxMjQ0OyIgZD0iTTM2NCwzMjQuNGgzNy42bDgtMjRoNTEuMmw0LjgsMjRINTA0TDQ5MC40LDI2NmwtNDgtNDYuNGwyLjQsMTIuOGMwLDAsOCwzNiw5LjYsNDRoLTMzLjYNCgkJYzMuMi04LDE2LTQyLjQsMTYtNDIuNHMzLjItOC44LDUuNi0xNC40Ii8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="
            />
          </div>

          <div
            style={{
              display: "inline-block",
              marginLeft: "5px",
              position: "relative",
              zIndex: 1,
              marginLeft: "2px",
              marginTop: "-8px",
              backgroundColor: "white",
            }}
          >
            <img
              height="30"
              width="33"
              style={{ marginTop: "5px", border: "1px solid gray" }}
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTA0IDUwNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTA0IDUwNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQjYwMDsiIGQ9Ik01MDQsMjUyYzAsODMuMi02Ny4yLDE1MS4yLTE1MS4yLDE1MS4yYy04My4yLDAtMTUxLjItNjgtMTUxLjItMTUxLjJsMCwwDQoJYzAtODMuMiw2Ny4yLTE1MS4yLDE1MC40LTE1MS4yQzQzNi44LDEwMC44LDUwNCwxNjguOCw1MDQsMjUyTDUwNCwyNTJ6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRjc5ODFEOyIgZD0iTTM1Mi44LDEwMC44YzgzLjIsMCwxNTEuMiw2OCwxNTEuMiwxNTEuMmwwLDBjMCw4My4yLTY3LjIsMTUxLjItMTUxLjIsMTUxLjINCgljLTgzLjIsMC0xNTEuMi02OC0xNTEuMi0xNTEuMiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGODUwMDsiIGQ9Ik0zNTIuOCwxMDAuOGM4My4yLDAsMTUxLjIsNjgsMTUxLjIsMTUxLjJsMCwwYzAsODMuMi02Ny4yLDE1MS4yLTE1MS4yLDE1MS4yIi8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkY1MDUwOyIgZD0iTTE0OS42LDEwMC44QzY3LjIsMTAxLjYsMCwxNjguOCwwLDI1MnM2Ny4yLDE1MS4yLDE1MS4yLDE1MS4yYzM5LjIsMCw3NC40LTE1LjIsMTAxLjYtMzkuMmwwLDBsMCwwDQoJYzUuNi00LjgsMTAuNC0xMC40LDE1LjItMTZoLTMxLjJjLTQtNC44LTgtMTAuNC0xMS4yLTE1LjJoNTMuNmMzLjItNC44LDYuNC0xMC40LDguOC0xNmgtNzEuMmMtMi40LTQuOC00LjgtMTAuNC02LjQtMTZoODMuMg0KCWM0LjgtMTUuMiw4LTMxLjIsOC00OGMwLTExLjItMS42LTIxLjYtMy4yLTMyaC05Mi44YzAuOC01LjYsMi40LTEwLjQsNC0xNmg4My4yYy0xLjYtNS42LTQtMTEuMi02LjQtMTZIMjE2DQoJYzIuNC01LjYsNS42LTEwLjQsOC44LTE2aDUzLjZjLTMuMi01LjYtNy4yLTExLjItMTItMTZoLTI5LjZjNC44LTUuNiw5LjYtMTAuNCwxNS4yLTE1LjJjLTI2LjQtMjQuOC02Mi40LTM5LjItMTAxLjYtMzkuMg0KCUMxNTAuNCwxMDAuOCwxNTAuNCwxMDAuOCwxNDkuNiwxMDAuOHoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNFNTI4MzY7IiBkPSJNMCwyNTJjMCw4My4yLDY3LjIsMTUxLjIsMTUxLjIsMTUxLjJjMzkuMiwwLDc0LjQtMTUuMiwxMDEuNi0zOS4ybDAsMGwwLDANCgljNS42LTQuOCwxMC40LTEwLjQsMTUuMi0xNmgtMzEuMmMtNC00LjgtOC0xMC40LTExLjItMTUuMmg1My42YzMuMi00LjgsNi40LTEwLjQsOC44LTE2aC03MS4yYy0yLjQtNC44LTQuOC0xMC40LTYuNC0xNmg4My4yDQoJYzQuOC0xNS4yLDgtMzEuMiw4LTQ4YzAtMTEuMi0xLjYtMjEuNi0zLjItMzJoLTkyLjhjMC44LTUuNiwyLjQtMTAuNCw0LTE2aDgzLjJjLTEuNi01LjYtNC0xMS4yLTYuNC0xNkgyMTYNCgljMi40LTUuNiw1LjYtMTAuNCw4LjgtMTZoNTMuNmMtMy4yLTUuNi03LjItMTEuMi0xMi0xNmgtMjkuNmM0LjgtNS42LDkuNi0xMC40LDE1LjItMTUuMmMtMjYuNC0yNC44LTYyLjQtMzkuMi0xMDEuNi0zOS4yaC0wLjgiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNDQjIwMjY7IiBkPSJNMTUxLjIsNDAzLjJjMzkuMiwwLDc0LjQtMTUuMiwxMDEuNi0zOS4ybDAsMGwwLDBjNS42LTQuOCwxMC40LTEwLjQsMTUuMi0xNmgtMzEuMg0KCWMtNC00LjgtOC0xMC40LTExLjItMTUuMmg1My42YzMuMi00LjgsNi40LTEwLjQsOC44LTE2aC03MS4yYy0yLjQtNC44LTQuOC0xMC40LTYuNC0xNmg4My4yYzQuOC0xNS4yLDgtMzEuMiw4LTQ4DQoJYzAtMTEuMi0xLjYtMjEuNi0zLjItMzJoLTkyLjhjMC44LTUuNiwyLjQtMTAuNCw0LTE2aDgzLjJjLTEuNi01LjYtNC0xMS4yLTYuNC0xNkgyMTZjMi40LTUuNiw1LjYtMTAuNCw4LjgtMTZoNTMuNg0KCWMtMy4yLTUuNi03LjItMTEuMi0xMi0xNmgtMjkuNmM0LjgtNS42LDkuNi0xMC40LDE1LjItMTUuMmMtMjYuNC0yNC44LTYyLjQtMzkuMi0xMDEuNi0zOS4yaC0wLjgiLz4NCjxnPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMjA0LjgsMjkwLjRsMi40LTEzLjZjLTAuOCwwLTIuNCwwLjgtNCwwLjhjLTUuNiwwLTYuNC0zLjItNS42LTQuOGw0LjgtMjhoOC44bDIuNC0xNS4yaC04bDEuNi05LjYNCgkJaC0xNmMwLDAtOS42LDUyLjgtOS42LDU5LjJjMCw5LjYsNS42LDEzLjYsMTIuOCwxMy42QzE5OS4yLDI5Mi44LDIwMy4yLDI5MS4yLDIwNC44LDI5MC40eiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMjEwLjQsMjY0LjhjMCwyMi40LDE1LjIsMjgsMjgsMjhjMTIsMCwxNi44LTIuNCwxNi44LTIuNGwzLjItMTUuMmMwLDAtOC44LDQtMTYuOCw0DQoJCWMtMTcuNiwwLTE0LjQtMTIuOC0xNC40LTEyLjhIMjYwYzAsMCwyLjQtMTAuNCwyLjQtMTQuNGMwLTEwLjQtNS42LTIzLjItMjMuMi0yMy4yQzIyMi40LDIyNy4yLDIxMC40LDI0NC44LDIxMC40LDI2NC44eg0KCQkgTTIzOC40LDI0MS42YzguOCwwLDcuMiwxMC40LDcuMiwxMS4ySDIyOEMyMjgsMjUyLDIyOS42LDI0MS42LDIzOC40LDI0MS42eiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMzQwLDI5MC40bDMuMi0xNy42YzAsMC04LDQtMTMuNiw0Yy0xMS4yLDAtMTYtOC44LTE2LTE4LjRjMC0xOS4yLDkuNi0yOS42LDIwLjgtMjkuNg0KCQljOCwwLDE0LjQsNC44LDE0LjQsNC44bDIuNC0xNi44YzAsMC05LjYtNC0xOC40LTRjLTE4LjQsMC0zNi44LDE2LTM2LjgsNDYuNGMwLDIwLDkuNiwzMy42LDI4LjgsMzMuNg0KCQlDMzMxLjIsMjkyLjgsMzQwLDI5MC40LDM0MCwyOTAuNHoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTExNi44LDIyNy4yYy0xMS4yLDAtMTkuMiwzLjItMTkuMiwzLjJMOTUuMiwyNDRjMCwwLDcuMi0zLjIsMTcuNi0zLjJjNS42LDAsMTAuNCwwLjgsMTAuNCw1LjYNCgkJYzAsMy4yLTAuOCw0LTAuOCw0cy00LjgsMC03LjIsMGMtMTMuNiwwLTI4LjgsNS42LTI4LjgsMjRjMCwxNC40LDkuNiwxNy42LDE1LjIsMTcuNmMxMS4yLDAsMTYtNy4yLDE2LjgtNy4ybC0wLjgsNi40SDEzMmw2LjQtNDQNCgkJQzEzOC40LDIyOCwxMjIuNCwyMjcuMiwxMTYuOCwyMjcuMnogTTEyMCwyNjMuMmMwLDIuNC0xLjYsMTUuMi0xMS4yLDE1LjJjLTQuOCwwLTYuNC00LTYuNC02LjRjMC00LDIuNC05LjYsMTQuNC05LjYNCgkJQzExOS4yLDI2My4yLDEyMCwyNjMuMiwxMjAsMjYzLjJ6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0xNTMuNiwyOTJjNCwwLDI0LDAuOCwyNC0yMC44YzAtMjAtMTkuMi0xNi0xOS4yLTI0YzAtNCwzLjItNS42LDguOC01LjZjMi40LDAsMTEuMiwwLjgsMTEuMiwwLjgNCgkJbDIuNC0xNC40YzAsMC01LjYtMS42LTE1LjItMS42Yy0xMiwwLTI0LDQuOC0yNCwyMC44YzAsMTguNCwyMCwxNi44LDIwLDI0YzAsNC44LTUuNiw1LjYtOS42LDUuNmMtNy4yLDAtMTQuNC0yLjQtMTQuNC0yLjQNCgkJbC0yLjQsMTQuNEMxMzYsMjkwLjQsMTQwLDI5MiwxNTMuNiwyOTJ6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik00NzIuOCwyMTQuNGwtMy4yLDIxLjZjMCwwLTYuNC04LTE1LjItOGMtMTQuNCwwLTI3LjIsMTcuNi0yNy4yLDM4LjRjMCwxMi44LDYuNCwyNi40LDIwLDI2LjQNCgkJYzkuNiwwLDE1LjItNi40LDE1LjItNi40bC0wLjgsNS42aDE2bDEyLTc2LjhMNDcyLjgsMjE0LjR6IE00NjUuNiwyNTYuOGMwLDguOC00LDIwLTEyLjgsMjBjLTUuNiwwLTguOC00LjgtOC44LTEyLjgNCgkJYzAtMTIuOCw1LjYtMjAuOCwxMi44LTIwLjhDNDYyLjQsMjQzLjIsNDY1LjYsMjQ3LjIsNDY1LjYsMjU2Ljh6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0yOS42LDI5MS4ybDkuNi01Ny42bDEuNiw1Ny42SDUybDIwLjgtNTcuNkw2NCwyOTEuMmgxNi44bDEyLjgtNzYuOEg2Ny4ybC0xNiw0Ny4ybC0wLjgtNDcuMkgyNy4yDQoJCWwtMTIuOCw3Ni44SDI5LjZ6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0yNzcuNiwyOTEuMmM0LjgtMjYuNCw1LjYtNDgsMTYuOC00NGMxLjYtMTAuNCw0LTE0LjQsNS42LTE4LjRjMCwwLTAuOCwwLTMuMiwwDQoJCWMtNy4yLDAtMTIuOCw5LjYtMTIuOCw5LjZsMS42LTguOGgtMTUuMkwyNjAsMjkyaDE3LjZWMjkxLjJ6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zNzYuOCwyMjcuMmMtMTEuMiwwLTE5LjIsMy4yLTE5LjIsMy4ybC0yLjQsMTMuNmMwLDAsNy4yLTMuMiwxNy42LTMuMmM1LjYsMCwxMC40LDAuOCwxMC40LDUuNg0KCQljMCwzLjItMC44LDQtMC44LDRzLTQuOCwwLTcuMiwwYy0xMy42LDAtMjguOCw1LjYtMjguOCwyNGMwLDE0LjQsOS42LDE3LjYsMTUuMiwxNy42YzExLjIsMCwxNi03LjIsMTYuOC03LjJsLTAuOCw2LjRIMzkybDYuNC00NA0KCQlDMzk5LjIsMjI4LDM4Mi40LDIyNy4yLDM3Ni44LDIyNy4yeiBNMzgwLjgsMjYzLjJjMCwyLjQtMS42LDE1LjItMTEuMiwxNS4yYy00LjgsMC02LjQtNC02LjQtNi40YzAtNCwyLjQtOS42LDE0LjQtOS42DQoJCUMzODAsMjYzLjIsMzgwLDI2My4yLDM4MC44LDI2My4yeiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNNDEyLDI5MS4yYzQuOC0yNi40LDUuNi00OCwxNi44LTQ0YzEuNi0xMC40LDQtMTQuNCw1LjYtMTguNGMwLDAtMC44LDAtMy4yLDANCgkJYy03LjIsMC0xMi44LDkuNi0xMi44LDkuNmwxLjYtOC44aC0xNS4yTDM5NC40LDI5Mkg0MTJWMjkxLjJ6Ii8+DQo8L2c+DQo8Zz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRENFNUU1OyIgZD0iTTE4MCwyNzkuMmMwLDkuNiw1LjYsMTMuNiwxMi44LDEzLjZjNS42LDAsMTAuNC0xLjYsMTItMi40bDIuNC0xMy42Yy0wLjgsMC0yLjQsMC44LTQsMC44DQoJCWMtNS42LDAtNi40LTMuMi01LjYtNC44bDQuOC0yOGg4LjhsMi40LTE1LjJoLThsMS42LTkuNiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNEQ0U1RTU7IiBkPSJNMjE4LjQsMjY0LjhjMCwyMi40LDcuMiwyOCwyMCwyOGMxMiwwLDE2LjgtMi40LDE2LjgtMi40bDMuMi0xNS4yYzAsMC04LjgsNC0xNi44LDQNCgkJYy0xNy42LDAtMTQuNC0xMi44LTE0LjQtMTIuOEgyNjBjMCwwLDIuNC0xMC40LDIuNC0xNC40YzAtMTAuNC01LjYtMjMuMi0yMy4yLTIzLjJDMjIyLjQsMjI3LjIsMjE4LjQsMjQ0LjgsMjE4LjQsMjY0Ljh6DQoJCSBNMjM4LjQsMjQxLjZjOC44LDAsMTAuNCwxMC40LDEwLjQsMTEuMkgyMjhDMjI4LDI1MiwyMjkuNiwyNDEuNiwyMzguNCwyNDEuNnoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRENFNUU1OyIgZD0iTTM0MCwyOTAuNGwzLjItMTcuNmMwLDAtOCw0LTEzLjYsNGMtMTEuMiwwLTE2LTguOC0xNi0xOC40YzAtMTkuMiw5LjYtMjkuNiwyMC44LTI5LjYNCgkJYzgsMCwxNC40LDQuOCwxNC40LDQuOGwyLjQtMTYuOGMwLDAtOS42LTQtMTguNC00Yy0xOC40LDAtMjguOCwxNi0yOC44LDQ2LjRjMCwyMCwxLjYsMzMuNiwyMC44LDMzLjYNCgkJQzMzMS4yLDI5Mi44LDM0MCwyOTAuNCwzNDAsMjkwLjR6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0RDRTVFNTsiIGQ9Ik05NS4yLDI0NC44YzAsMCw3LjItMy4yLDE3LjYtMy4yYzUuNiwwLDEwLjQsMC44LDEwLjQsNS42YzAsMy4yLTAuOCw0LTAuOCw0cy00LjgsMC03LjIsMA0KCQljLTEzLjYsMC0yOC44LDUuNi0yOC44LDI0YzAsMTQuNCw5LjYsMTcuNiwxNS4yLDE3LjZjMTEuMiwwLDE2LTcuMiwxNi44LTcuMmwtMC44LDYuNEgxMzJsNi40LTQ0YzAtMTguNC0xNi0xOS4yLTIyLjQtMTkuMg0KCQkgTTEyOCwyNjMuMmMwLDIuNC05LjYsMTUuMi0xOS4yLDE1LjJjLTQuOCwwLTYuNC00LTYuNC02LjRjMC00LDIuNC05LjYsMTQuNC05LjZDMTE5LjIsMjYzLjIsMTI4LDI2My4yLDEyOCwyNjMuMnoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRENFNUU1OyIgZD0iTTEzNiwyOTAuNGMwLDAsNC44LDEuNiwxOC40LDEuNmM0LDAsMjQsMC44LDI0LTIwLjhjMC0yMC0xOS4yLTE2LTE5LjItMjRjMC00LDMuMi01LjYsOC44LTUuNg0KCQljMi40LDAsMTEuMiwwLjgsMTEuMiwwLjhsMi40LTE0LjRjMCwwLTUuNi0xLjYtMTUuMi0xLjZjLTEyLDAtMTYsNC44LTE2LDIwLjhjMCwxOC40LDEyLDE2LjgsMTIsMjRjMCw0LjgtNS42LDUuNi05LjYsNS42Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0RDRTVFNTsiIGQ9Ik00NjkuNiwyMzZjMCwwLTYuNC04LTE1LjItOGMtMTQuNCwwLTE5LjIsMTcuNi0xOS4yLDM4LjRjMCwxMi44LTEuNiwyNi40LDEyLDI2LjQNCgkJYzkuNiwwLDE1LjItNi40LDE1LjItNi40bC0wLjgsNS42aDE2bDEyLTc2LjggTTQ2OC44LDI1Ni44YzAsOC44LTcuMiwyMC0xNiwyMGMtNS42LDAtOC44LTQuOC04LjgtMTIuOGMwLTEyLjgsNS42LTIwLjgsMTIuOC0yMC44DQoJCUM0NjIuNCwyNDMuMiw0NjguOCwyNDcuMiw0NjguOCwyNTYuOHoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRENFNUU1OyIgZD0iTTI5LjYsMjkxLjJsOS42LTU3LjZsMS42LDU3LjZINTJsMjAuOC01Ny42TDY0LDI5MS4yaDE2LjhsMTIuOC03Ni44aC0yMGwtMjIuNCw0Ny4ybC0wLjgtNDcuMmgtOC44DQoJCWwtMjcuMiw3Ni44SDI5LjZ6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0RDRTVFNTsiIGQ9Ik0yNjAuOCwyOTEuMmgxNi44YzQuOC0yNi40LDUuNi00OCwxNi44LTQ0YzEuNi0xMC40LDQtMTQuNCw1LjYtMTguNGMwLDAtMC44LDAtMy4yLDANCgkJYy03LjIsMC0xMi44LDkuNi0xMi44LDkuNmwxLjYtOC44Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0RDRTVFNTsiIGQ9Ik0zNTUuMiwyNDQuOGMwLDAsNy4yLTMuMiwxNy42LTMuMmM1LjYsMCwxMC40LDAuOCwxMC40LDUuNmMwLDMuMi0wLjgsNC0wLjgsNHMtNC44LDAtNy4yLDANCgkJYy0xMy42LDAtMjguOCw1LjYtMjguOCwyNGMwLDE0LjQsOS42LDE3LjYsMTUuMiwxNy42YzExLjIsMCwxNi03LjIsMTYuOC03LjJsLTAuOCw2LjRIMzkybDYuNC00NGMwLTE4LjQtMTYtMTkuMi0yMi40LTE5LjINCgkJIE0zODgsMjYzLjJjMCwyLjQtOS42LDE1LjItMTkuMiwxNS4yYy00LjgsMC02LjQtNC02LjQtNi40YzAtNCwyLjQtOS42LDE0LjQtOS42QzM4MCwyNjMuMiwzODgsMjYzLjIsMzg4LDI2My4yeiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNEQ0U1RTU7IiBkPSJNMzk1LjIsMjkxLjJINDEyYzQuOC0yNi40LDUuNi00OCwxNi44LTQ0YzEuNi0xMC40LDQtMTQuNCw1LjYtMTguNGMwLDAtMC44LDAtMy4yLDANCgkJYy03LjIsMC0xMi44LDkuNi0xMi44LDkuNmwxLjYtOC44Ii8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="
            />
          </div>
          <div style={{ fontSize: "10px", marginLeft: "70px" }}>
            Any international shipping and import charges are paid in part to
            Pitney Bowes Inc.
          </div>
          <div
            style={{
              color: "gray",
              marginLeft: "18px",
            }}
          >
            Return:
            <div
              style={{
                display: "inline-block",
                color: "black",
                fontSize: "12px",
                marginLeft: "2px",
              }}
            >
              Seller does not accept returns
            </div>
          </div>
        </div>

        {/*copy right*/}
        <hr id="border3" align="right" />
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
    savePassingProduct: (productToPass) =>
      dispatch(savePassingProduct(productToPass)),
    saveWatchlist: (watchlist) => dispatch(saveWatchlist(watchlist)),
    saveUserAAP: (userAAP) => dispatch(saveUserAAP(userAAP)),
    saveCartID: (cartId) => dispatch(saveCartID(cartId)),
  };
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    productToPass: state.productToPass,
    watchlist: state.watchlist,
    authAAP: state.authAAP,
    cartId: state.cartId,
  };
};

const productPage = connect(mapStateToProps, mapDispatchToProps)(productPage1);

export default connect()(productPage);
