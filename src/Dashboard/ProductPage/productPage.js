import React, { Component } from "react";
import { connect } from "react-redux";
import { savePassingProduct } from "../../Actions/passProduct";
import { saveCart } from "../../Actions/shoppingCart";
import { saveWatchlist } from "../../Actions/addToWatchlist";
import NavigationBarAAP from "../NavigationBarAAP";
import { saveCartID } from "../../Actions/savingCartId";
import { saveUserAAP } from "../../Actions/authAAPActions";
import { saveBugsList } from "../../Actions/saveBugsList";
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

    console.log(this.state);

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

    this.props.saveBugsList({
      bugsList: this.props.bugsList.bugsList,
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
    console.log(this.props.bugsList.bugsList);
    console.log(this.props.productToPass.productToPass);
    this.updateState = this.updateState.bind(this);
    this.updateState();
    this.saveToRecentlyViewed();
    this.checkIfBugExist();
  }

  updateState() {
    this.setState({ images: this.props.productToPass.productToPass.images });
  }

  checkIfBugExist() {
    if (this.props.bugsList.bugsList.length > 0) {
      var isExist = this.props.bugsList.bugsList.some(
        (b) => b.bugName === "ProductPage Bug"
      );
      this.setState({
        isProductPageBug: isExist,
      });
    }
    // this.saveToRecentlyViewed();
  }

  saveToRecentlyViewed = async () => {
    if (this.props.authAAP.isSignIn) {
      await fetch(
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
  };

  addProductToRecentlyViewed = async (product) => {
    var isOk = false;
    while (!isOk) {
      const main = "http://localhost:8092/";
      const recentlyViewdLink = main + "/acs/viewedlist/addProductToViewedList";
      const viewedList = {
        productID: this.props.productToPass.productToPass.productID,
        viewedListID: product.viewedListID,
      };

      const dataJson = JSON.stringify(viewedList);

      await fetch(recentlyViewdLink, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: dataJson,
      }).then(
        (response) => {
          if (response.status === 200) {
            console.log("success add to recentley viewed");
            isOk = true;
          } else {
            console.log("failed to fetch server");
          }
        },
        (error) => {
          console.log(error);
          isOk = false;
        }
      );
    }
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
    var isExistBugQuantity = false;
    var isUnitStockBug = false;

    if (this.props.bugsList.bugsList.length > 0) {
      isExistBugQuantity = this.props.bugsList.bugsList.some(
        (b) => b.bugName === "Quantity Bug"
      );
      isUnitStockBug = this.props.bugsList.bugsList.some(
        (b) => b.bugName === "Stock Bug"
      );
    }
    if (isExistBugQuantity) {
      this.setState({ quantity: 1 });
    } else {
      if (isUnitStockBug) {
        this.setState({
          quantityError: "",
        });
        this.setState({ quantity: e.target.value });
      } else {
        if (e.target.value > 0 && e.target.value <= this.state.unitInStock) {
          this.setState({
            quantityError: "",
          });
          this.setState({ quantity: e.target.value });
        } else {
          this.setState({
            quantityError: "Invalid Quantity!",
          });
        }
      }
    }
  };

  handleAddToCart = async (e) => {
    var isExistBugAdvenced = false;
    var isExistBugs = false;
    var isQuantityAdvancedBug = false;
    var isUnitStockBug = false;

    if (this.props.bugsList.bugsList.length > 0) {
      isExistBugs = this.props.bugsList.bugsList.some(
        (b) => b.bugName === "ProductPage Bug"
      );
      console.log("Product page bug:" + isExistBugs);
      isExistBugAdvenced = this.props.bugsList.bugsList.some(
        (b) => b.bugName === "ProductPageAdvanced Bug"
      );
      isUnitStockBug = this.props.bugsList.bugsList.some(
        (b) => b.bugName === "Stock Bug"
      );
      console.log("Product page bug advanced:" + isExistBugAdvenced);
      isQuantityAdvancedBug = this.props.bugsList.bugsList.some(
        (b) => b.bugName === "QuantityAdvanced Bug"
      );
      console.log("Qantity bug advanced:" + isQuantityAdvancedBug);
    }
    if (isExistBugs || isExistBugAdvenced) {
      if (isExistBugs) {
        this.handleAddProductBug();
      }
      if (isExistBugAdvenced) {
        this.handleAddProductBugAdvnced();
      }
    } else {
      if (this.state.quantity <= this.state.unitInStock || isUnitStockBug) {
        var tempTotalPrice = 0;
        var tempTotalNum = 0;
        if (isQuantityAdvancedBug) {
          tempTotalPrice =
            this.props.cart.totalPrice + this.state.unitPrice * 1;
          tempTotalNum = parseInt(this.props.cart.totalNumOfProducts) + 1;
        } else {
          tempTotalPrice =
            this.props.cart.totalPrice +
            this.state.unitPrice * this.state.quantity;
          tempTotalNum =
            parseInt(this.props.cart.totalNumOfProducts) +
            parseInt(this.state.quantity);
        }

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
              item.productID ===
              this.props.productToPass.productToPass.productID
          );
          console.log(index);
          var calc = tempAmountOfproducts[index];
          if (isQuantityAdvancedBug) {
            tempAmountOfproducts[index] = 1 + parseInt(calc);
          } else {
            tempAmountOfproducts[index] =
              parseInt(this.state.quantity) + parseInt(calc);
          }
        } else {
          tempCart.push(this.props.productToPass.productToPass);
          if (isQuantityAdvancedBug) {
            tempAmountOfproducts.push(1);
          } else {
            tempAmountOfproducts.push(this.state.quantity);
          }
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

        if (!isAlreadyExist) {
          const addProductLink = main + "/acs/products/addProductToCart";

          const addingProduct = {
            productID: this.props.productToPass.productToPass.productID,
            cartID: this.props.cartId.id,
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
                console.log("success add product to cart");
              } else {
                console.log("failed to fetch server");
              }
            },
            (error) => {
              console.log(error);
            }
          );
        }

        const addQuantity = main + "/acs/carts/updateCartQuantity";

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
              console.log("success update quantity");
            } else {
              console.log("failed to fetch server");
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  };

  handleAddProductBugAdvnced = (e) => {
    var tempTotalPrice =
      this.props.cart.totalPrice + this.state.unitPrice * this.state.quantity;
    var tempTotalNum =
      parseInt(this.props.cart.totalNumOfProducts) +
      parseInt(this.state.quantity);

    this.props.saveCart({
      cartId: this.props.cart.cartID,
      lastPosition: this.props.cart.lastPosition,
      totalPrice: tempTotalPrice,
      totalNumOfProducts: tempTotalNum,
      cart: this.props.cart.cart,
      amountOfproducts: this.props.cart.amountOfproducts,
    });
    /**need to fetch server */
  };

  handleAddProductBug = (e) => {
    console.log("Add to cart succeed!");
  };

  handleAddToWatchlist = async (e) => {
    if (this.props.authAAP.isSignIn) {
      var isWatchlistBug = this.props.bugsList.bugsList.some(
        (b) => b.bugName === "Watchlist Product Page Bug"
      );
      if (isWatchlistBug) {
        if (this.props.cart.cart.length > 0) {
          var array = this.props.watchlist.Watchlist;
          if (array.length != 0) {
            var isExist = array.some(
              (item) => item.title === this.props.cart.cart[0].title
            );
            if (isExist) {
              console.log("the product already exist");
            } else {
              this.props.watchlist.Watchlist.push(this.props.cart.cart[0]);
              this.props.saveWatchlist({
                Watchlist: this.props.watchlist.Watchlist,
              });
              console.log(this.props.watchlist.Watchlist);
            }
          } else {
            this.props.watchlist.Watchlist.push(this.props.cart.cart[0]);
            this.props.saveWatchlist({
              watchlist: this.props.watchlist.Watchlist,
            });
            console.log(this.props.watchlist.Watchlist);
          }
          if (!isExist) {
            await fetch(
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
                      productID: this.props.cart.cart[0].productID,
                      watchListID: watchlist.watchListID,
                    };

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
      } else {
        var array = this.props.watchlist.Watchlist;
        if (array.length != 0) {
          var isExist = array.some(
            (item) =>
              item.title === this.props.productToPass.productToPass.title
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
          await fetch(
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
        <hr id="border3" align="right" style={{ marginTop: "0px" }} />
        <div id="context-container">
          <div
            style={{
              display: "inline-block",
              position: "relative",
              zIndex: "2",
              top: -140,
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
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDczLjk0IDQ3My45NCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDczLjk0IDQ3My45NDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGNpcmNsZSBzdHlsZT0iZmlsbDojMjdBREU0OyIgY3g9IjIzNi45NyIgY3k9IjIzNi45NyIgcj0iMjM2Ljk3Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojMkQ3OEJDOyIgZD0iTTgwLjg1OSwxOTQuNzQ0bC03LjM5Ny0xOC4yNjRsLTcuMzUzLDE4LjI2NCBNMjQzLjcyNywxODcuNDdjLTEuNDg1LDAuOTE3LTMuMjQsMC45NDctNS4zNDMsMC45NDcNCgloLTEzLjEyNnYtMTAuMTc0aDEzLjMwMmMxLjg4MiwwLDMuODQ3LDAuMDc5LDUuMTIyLDAuODE5YzEuMzk5LDAuNjc0LDIuMjY0LDIuMDk1LDIuMjY0LDQuMDU2DQoJQzI0NS45NSwxODUuMTE2LDI0NS4xMjMsMTg2LjcyOSwyNDMuNzI3LDE4Ny40NyBNMzM3LjMzNSwxOTQuNzQ0bC03LjQ3Mi0xOC4yNjRsLTcuNDMxLDE4LjI2NEwzMzcuMzM1LDE5NC43NDRMMzM3LjMzNSwxOTQuNzQ0eg0KCSBNMTYyLjg0MSwyMTQuNTExaC0xMS4wNzZsLTAuMDQxLTM1Ljg4M2wtMTUuNjYzLDM1Ljg4M2gtOS40ODVsLTE1LjctMzUuOTEzdjM1LjkxM0g4OC45MDRsLTQuMTUtMTAuMjE5SDYyLjI2N2wtNC4xOTUsMTAuMjE5DQoJaC0xMS43M2wxOS4zNDEtNDUuODE0aDE2LjA1MmwxOC4zNjgsNDMuMzc0di00My4zNzRoMTcuNjI3bDE0LjEzNiwzMS4wNzlsMTIuOTg0LTMxLjA3OWgxNy45OXY0NS44MTRMMTYyLjg0MSwyMTQuNTExDQoJTDE2Mi44NDEsMjE0LjUxMXogTTIwNi45NzUsMjE0LjUxMUgxNzAuODl2LTQ1LjgxNGgzNi4wODZ2OS41NDVoLTI1LjI3OXY4LjI1OGgyNC42NzN2OS4zOTJoLTI0LjY3M3Y5LjEzN2gyNS4yNzlMMjA2Ljk3NSwyMTQuNTExDQoJTDIwNi45NzUsMjE0LjUxMXogTTI1Ny44NTIsMTgxLjA0MWMwLDcuMjk2LTQuODEyLDExLjA3OS03LjYxNCwxMi4yMDZjMi4zNjUsMC45MTcsNC4zODUsMi41MjYsNS4zNDMsMy44NjUNCgljMS41MjcsMi4yNzEsMS43OTIsNC4zMTEsMS43OTIsOC4zOTZ2OS4wMDNoLTEwLjg5NmwtMC4wNDEtNS43NzdjMC0yLjc1OCwwLjI1OC02LjcyOC0xLjcwNi04LjkyOA0KCWMtMS41NzktMS42MDktMy45ODEtMS45NjEtNy44NzMtMS45NjFoLTExLjU5OXYxNi42NjZoLTEwLjgwMnYtNDUuODE0aDI0Ljg0OWM1LjUyMywwLDkuNTksMC4xNDYsMTMuMDc3LDIuMTkzDQoJQzI1NS44MDIsMTcyLjk0NCwyNTcuODUyLDE3NS45MjYsMjU3Ljg1MiwxODEuMDQxIE0yNzUuMTM5LDIxNC41MTFoLTExLjAydi00NS44MWgxMS4wMlYyMTQuNTExeiBNNDAyLjk5OSwyMTQuNTExaC0xNS4zMTENCglsLTIwLjQ3MS0zNC4zODd2MzQuMzg3aC0yMi4wMDJsLTQuMTk4LTEwLjIxOWgtMjIuNDM5bC00LjA4MiwxMC4yMTloLTEyLjY0Yy01LjI0NiwwLTExLjg5OS0xLjE3OS0xNS42NjMtNS4wNw0KCWMtMy43OTgtMy44ODgtNS43Ny05LjE1Ni01Ljc3LTE3LjQ4OWMwLTYuNzg4LDEuMTc1LTEzLjAxLDUuODI2LTE3LjkwOGMzLjQ5MS0zLjY1OSw4Ljk2MS01LjM0NywxNi40MDQtNS4zNDdoMTAuNDU0djkuODE1SDMwMi44Nw0KCWMtMy45NCwwLTYuMTYzLDAuNTk1LTguMzEsMi43MTdjLTEuODQxLDEuOTM0LTMuMTA2LDUuNTc5LTMuMTA2LDEwLjM4YzAsNC45MDUsMC45NjUsOC40NDUsMi45NzUsMTAuNzU0DQoJYzEuNjU4LDEuODE1LDQuNjgxLDIuMzY1LDcuNTI1LDIuMzY1aDQuODQ5bDE1LjIyNS0zNi4wMjZoMTYuMTg3bDE4LjI4Niw0My4zMzN2LTQzLjMzM2gxNi40NDlsMTguOTg2LDMxLjkwMnYtMzEuOTAySDQwMw0KCUw0MDIuOTk5LDIxNC41MTFMNDAyLjk5OSwyMTQuNTExeiBNNDYuMjE4LDIyMy41MWgxOC40NTRsNC4xNjEtMTAuMTc4aDkuMzEzbDQuMTUsMTAuMTc4aDM2LjMxNHYtNy43NzlsMy4yNDQsNy44MDloMTguODQ3DQoJbDMuMjQtNy45MjV2Ny44OTVoOTAuMjQ0bC0wLjA0NS0xNi43MDdoMS43NDdjMS4yMjQsMC4wNDUsMS41NzksMC4xNjEsMS41NzksMi4yMDh2MTQuNDk5aDQ2LjY3NXYtMy44ODgNCgljMy43NjgsMi4wNDcsOS42MjQsMy44ODgsMTcuMzMyLDMuODg4aDE5LjYzM2w0LjIwMi0xMC4xNzhoOS4zMTdsNC4xMDgsMTAuMTc4aDM3LjgzN3YtOS42NjlsNS43MzIsOS42NjloMzAuMzIzdi02My44OTRoLTMwLjAxMw0KCXY3LjU0N2wtNC4xOTgtNy41NDdoLTMwLjc5NXY3LjU0N2wtMy44NTQtNy41NDdIMzAyLjE3Yy02Ljk1NiwwLTEzLjA3NywwLjk4OC0xOC4wMjQsMy43MzF2LTMuNzMxaC0yOC43MDN2My43MzENCgljLTMuMTQzLTIuODI5LTcuNDI3LTMuNzMxLTEyLjE5OC0zLjczMUgxMzguMzgybC03LjAzNSwxNi41MDFsLTcuMjI1LTE2LjUwMUg5MS4wODl2Ny41NDdsLTMuNjMtNy41NDdINTkuMjk2bC0xMy4wODUsMzAuMzc5DQoJTDMxLjIxLDIyMy41MUg0Ni4yMTh6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTgwLjg1OSwxOTguNDg1bC03LjM5Ny0xOC4yNjRsLTcuMzUzLDE4LjI2NCBNMjQzLjcyNywxOTEuMjExYy0xLjQ4NSwwLjkxNy0zLjI0LDAuOTQ3LTUuMzQzLDAuOTQ3DQoJaC0xMy4xMjZ2LTEwLjE3NGgxMy4zMDJjMS44ODIsMCwzLjg0NywwLjA3OSw1LjEyMiwwLjgxOWMxLjM5OSwwLjY3NCwyLjI2NCwyLjA5NSwyLjI2NCw0LjA1Ng0KCUMyNDUuOTUsMTg4Ljg1OCwyNDUuMTIzLDE5MC40NzEsMjQzLjcyNywxOTEuMjExIE0zMzcuMzM1LDE5OC40ODVsLTcuNDcyLTE4LjI2NGwtNy40MzEsMTguMjY0TDMzNy4zMzUsMTk4LjQ4NUwzMzcuMzM1LDE5OC40ODV6DQoJIE0xNjIuODQxLDIxOC4yNTNoLTExLjA3NmwtMC4wNDEtMzUuODgzbC0xNS42NjMsMzUuODgzaC05LjQ4NWwtMTUuNy0zNS45MTN2MzUuOTEzSDg4LjkwNGwtNC4xNS0xMC4yMTlINjIuMjY3bC00LjE5NSwxMC4yMTkNCgloLTExLjczbDE5LjM0MS00NS44MTRoMTYuMDUybDE4LjM2OCw0My4zNzR2LTQzLjM3NGgxNy42MjdsMTQuMTM2LDMxLjA3OWwxMi45ODQtMzEuMDc5aDE3Ljk5djQ1LjgxNEwxNjIuODQxLDIxOC4yNTMNCglMMTYyLjg0MSwyMTguMjUzeiBNMjA2Ljk3NSwyMTguMjUzSDE3MC44OXYtNDUuODE0aDM2LjA4NnY5LjU0NWgtMjUuMjc5djguMjU4aDI0LjY3M3Y5LjM5MmgtMjQuNjczdjkuMTM3aDI1LjI3OUwyMDYuOTc1LDIxOC4yNTMNCglMMjA2Ljk3NSwyMTguMjUzeiBNMjU3Ljg1MiwxODQuNzgzYzAsNy4yOTYtNC44MTIsMTEuMDc5LTcuNjE0LDEyLjIwNmMyLjM2NSwwLjkxNyw0LjM4NSwyLjUyNiw1LjM0MywzLjg2NQ0KCWMxLjUyNywyLjI3MSwxLjc5Miw0LjMxMSwxLjc5Miw4LjM5NnY5LjAwM2gtMTAuODk2bC0wLjA0MS01Ljc3N2MwLTIuNzU4LDAuMjU4LTYuNzI4LTEuNzA2LTguOTI4DQoJYy0xLjU3OS0xLjYwOS0zLjk4MS0xLjk2MS03Ljg3My0xLjk2MWgtMTEuNTk5djE2LjY2NmgtMTAuODAydi00NS44MTRoMjQuODQ5YzUuNTIzLDAsOS41OSwwLjE0NiwxMy4wNzcsMi4xOTMNCglDMjU1LjgwMiwxNzYuNjg2LDI1Ny44NTIsMTc5LjY2OCwyNTcuODUyLDE4NC43ODMgTTI3NS4xMzksMjE4LjI1M2gtMTEuMDJ2LTQ1LjgxaDExLjAyVjIxOC4yNTN6IE00MDIuOTk5LDIxOC4yNTNoLTE1LjMxMQ0KCWwtMjAuNDcxLTM0LjM4N3YzNC4zODdoLTIyLjAwMmwtNC4xOTgtMTAuMjE5aC0yMi40MzlsLTQuMDgyLDEwLjIxOWgtMTIuNjRjLTUuMjQ2LDAtMTEuODk5LTEuMTc5LTE1LjY2My01LjA3DQoJYy0zLjc5OC0zLjg4OC01Ljc3LTkuMTU2LTUuNzctMTcuNDg5YzAtNi43ODgsMS4xNzUtMTMuMDEsNS44MjYtMTcuOTA4YzMuNDkxLTMuNjU5LDguOTYxLTUuMzQ3LDE2LjQwNC01LjM0N2gxMC40NTR2OS44MTVIMzAyLjg3DQoJYy0zLjk0LDAtNi4xNjMsMC41OTUtOC4zMSwyLjcxN2MtMS44NDEsMS45MzQtMy4xMDYsNS41NzktMy4xMDYsMTAuMzhjMCw0LjkwNSwwLjk2NSw4LjQ0NSwyLjk3NSwxMC43NTQNCgljMS42NTgsMS44MTUsNC42ODEsMi4zNjUsNy41MjUsMi4zNjVoNC44NDlsMTUuMjI1LTM2LjAyNmgxNi4xODdsMTguMjg2LDQzLjMzM3YtNDMuMzMzaDE2LjQ0OWwxOC45ODYsMzEuOTAydi0zMS45MDJINDAzDQoJTDQwMi45OTksMjE4LjI1M0w0MDIuOTk5LDIxOC4yNTN6IE00Ni4yMTgsMjI3LjI1MmgxOC40NTRsNC4xNjEtMTAuMTc4aDkuMzEzbDQuMTUsMTAuMTc4aDM2LjMxNHYtNy43NzlsMy4yNDQsNy44MDloMTguODQ3DQoJbDMuMjQtNy45MjV2Ny44OTVoOTAuMjQ0bC0wLjA0NS0xNi43MDdoMS43NDdjMS4yMjQsMC4wNDUsMS41NzksMC4xNjEsMS41NzksMi4yMDh2MTQuNDk5aDQ2LjY3NXYtMy44ODgNCgljMy43NjgsMi4wNDcsOS42MjQsMy44ODgsMTcuMzMyLDMuODg4aDE5LjYzM2w0LjIwMi0xMC4xNzhoOS4zMTdsNC4xMDgsMTAuMTc4aDM3LjgzN3YtOS42NjlsNS43MzIsOS42NjloMzAuMzIzdi02My44OTRoLTMwLjAxMw0KCXY3LjU0N2wtNC4xOTgtNy41NDdoLTMwLjc5NXY3LjU0N2wtMy44NTQtNy41NDdIMzAyLjE3Yy02Ljk1NiwwLTEzLjA3NywwLjk4OC0xOC4wMjQsMy43MzF2LTMuNzMxaC0yOC43MDN2My43MzENCgljLTMuMTQzLTIuODI5LTcuNDI3LTMuNzMxLTEyLjE5OC0zLjczMUgxMzguMzgybC03LjAzNSwxNi41MDFsLTcuMjI1LTE2LjUwMUg5MS4wODl2Ny41NDdsLTMuNjMtNy41NDdINTkuMjk2bC0xMy4wODUsMzAuMzc5DQoJTDMxLjIxLDIyNy4yNTJINDYuMjE4eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6IzJENzhCQzsiIGQ9Ik00MzYuODU4LDI2Ni43MDl2LTI5LjMxM2gtNy40NzZsMCwwaC0xOS41ODRjLTYuMDM1LDAtMTAuNDI1LDEuNDYzLTEzLjUyNiwzLjczNHYtMy43MzRIMzY2LjY5DQoJYy00LjczLDAtMTAuMjg2LDEuMTgyLTEyLjkwNSwzLjczNHYtMy43MzRIMzAwLjk1djMuNzM0Yy00LjIwMi0zLjA2OC0xMS4zLTMuNzM0LTE0LjU3LTMuNzM0aC0zNC44NDd2My43MzQNCgljLTMuMzI2LTMuMjU5LTEwLjcyLTMuNzM0LTE1LjIyOS0zLjczNGgtMzguOTk3bC04LjkyNCw5Ljc3N2wtOC4zNTktOS43NzdoLTU4LjI1NXY2My44ODdoNTcuMTU1bDkuMTk3LTkuOTMxbDguNjU4LDkuOTMxDQoJbDM1LjIzNiwwLjAzN3YtMTUuMDM0aDMuNDYxYzQuNjczLDAuMDc1LDEwLjE4NS0wLjExNiwxNS4wNDktMi4yNDV2MTcuMjM4aDI5LjA2MnYtMTYuNjU1aDEuNDA3YzEuNzg5LDAsMS45NjEsMC4wNzksMS45NjEsMS44ODYNCgl2MTQuNzY5aDg4LjI3NmM1LjYwOSwwLDExLjQ2OS0xLjQ1NiwxNC43MTYtNC4wODZ2NC4wODZoMjcuOTk2YzUuODMsMCwxMS41MjEtMC44MjcsMTUuODUtMi45NDV2LTAuMDY3DQoJYzYuMzI0LTQuMDc5LDEwLjUyOS0xMS4yMjUsMTAuNTI5LTE5LjM4MkM0NDAuMzMsMjc0LjQwOSw0MzkuMDUxLDI3MC4yMzcsNDM2Ljg1OCwyNjYuNzA5eiBNMjM1Ljk1OSwyNzYuOTMxaC0xMy40ODV2MTUuMzZoLTIxLjAwMw0KCWwtMTMuMzA5LTE1LjE2MmwtMTMuODI2LDE1LjE2MmgtNDIuODA5VjI0Ni41aDQzLjQ2OGwxMy4yOTQsMTUuMDA4bDEzLjc0Ny0xNS4wMDhoMzQuNTMzYzguNTcyLDAsMTguMjA3LDIuNDA2LDE4LjIwNywxNS4wODMNCglDMjU0Ljc3NiwyNzQuMzA4LDI0NS40MDMsMjc2LjkzMSwyMzUuOTU5LDI3Ni45MzF6IE0zMDAuOTk1LDI3NC44NTVjMS41MjcsMi4yMzQsMS43NDcsNC4zMTgsMS43OTIsOC4zNTl2OS4wNzhoLTEwLjg0NHYtNS43MjkNCgljMC0yLjc1NCwwLjI1OC02LjgzMi0xLjc1MS04Ljk2NWMtMS41ODMtMS42MzktMy45ODEtMi4wMzYtNy45MjktMi4wMzZoLTExLjU1MXYxNi43MjloLTEwLjg1NVYyNDYuNWgyNC45NQ0KCWM1LjQ3LDAsOS40NTIsMC4yNDMsMTMuMDAzLDIuMTYzYzMuNDEzLDIuMDg0LDUuNTU3LDQuOTM5LDUuNTU3LDEwLjE2NmMwLDcuMzA4LTQuODE2LDExLjA0Mi03LjY1OSwxMi4xODMNCglDMjk4LjEwMiwyNzEuOTEsMzAwLjA3NCwyNzMuNTE5LDMwMC45OTUsMjc0Ljg1NXogTTM0NS40MjEsMjU1Ljk3NGgtMjUuMzA5djguMzI1aDI0LjY5MnY5LjM0M2gtMjQuNjkydjkuMTExbDI1LjMwOSwwLjA0NXY5LjUNCgloLTM2LjA2N1YyNDYuNWgzNi4wNjdMMzQ1LjQyMSwyNTUuOTc0TDM0NS40MjEsMjU1Ljk3NHogTTM3Mi45NDEsMjkyLjI5NWgtMjEuMDQ3di05LjgyMmgyMC45NjljMi4wNSwwLDMuNTAyLTAuMjY5LDQuNDE1LTEuMTM3DQoJYzAuNzM3LTAuNzAzLDEuMjc2LTEuNzM2LDEuMjc2LTIuOTc4YzAtMS4zMzYtMC41NzYtMi4zOTgtMS4zMjEtMy4wMzVjLTAuODMxLTAuNzAzLTEuOTY0LTEuMDE0LTMuODQ3LTEuMDE0DQoJYy0xMC4xMDctMC4zNDQtMjIuNzY1LDAuMzE0LTIyLjc2NS0xNC4xNzhjMC02LjY0Miw0LjEyMy0xMy42MzEsMTUuNDUtMTMuNjMxaDIxLjY2OXY5Ljc0N2gtMTkuODI0DQoJYy0xLjk2NCwwLTMuMjQ0LDAuMDc1LTQuMzMzLDAuODIzYy0xLjE3OSwwLjc0NS0xLjYyNCwxLjg0MS0xLjYyNCwzLjNjMCwxLjcyNSwxLjAxLDIuOSwyLjM2NSwzLjQxMw0KCWMxLjE0NSwwLjM5NywyLjM2NSwwLjUxMyw0LjIwNiwwLjUxM2w1LjgyMiwwLjE2OGM1Ljg2MywwLjEzOCw5Ljg5MywxLjE3MSwxMi4zNCwzLjY3OGMyLjEwNywyLjIsMy4yMjksNC45ODQsMy4yMjksOS42OTUNCglDMzg5LjkxOCwyODcuNjkzLDM4My44NDUsMjkyLjI5NSwzNzIuOTQxLDI5Mi4yOTV6IE00MjguNTYzLDI4Ny44NzJjLTIuODQ3LDIuOTE1LTcuNDM5LDQuNDIzLTEzLjQyOSw0LjQyM2gtMjAuODcydi05LjgyMmgyMC43ODUNCgljMi4wNjUsMCwzLjUxLTAuMjY5LDQuMzc4LTEuMTM3YzAuNzUyLTAuNzAzLDEuMjc2LTEuNzM2LDEuMjc2LTIuOTc4YzAtMS4zMzYtMC41MjQtMi4zOTgtMS4zMjEtMy4wMzUNCgljLTAuNzgyLTAuNzAzLTEuOTIzLTEuMDE0LTMuODA5LTEuMDE0Yy0xMC4xNDgtMC4zNDQtMjIuODA2LDAuMzE0LTIyLjgwNi0xNC4xNzhjMC02LjY0Miw0LjE2MS0xMy42MzEsMTUuNTA2LTEzLjYzMWgyMS4xMTV2OS43NDQNCgloLTE5LjI4MWMtMS45NjEsMC0zLjI3LDAuMDc5LTQuMzc0LDAuODI3Yy0xLjE0MSwwLjc0MS0xLjU3OSwxLjg0MS0xLjU3OSwzLjI5M2MwLDEuNzMyLDAuOTYyLDIuOSwyLjM2NSwzLjQxMw0KCWMxLjE0NSwwLjQwNCwyLjM2NSwwLjUyLDQuMTYxLDAuNTJsNS44NTYsMC4xNjFjNS45MTIsMC4xNDYsOS44NiwxLjE3NSwxMi4yNTgsMy42ODZjMC40MzgsMC4zNDgsMC43MDMsMC43NDEsMS4wMSwxLjEzDQoJYy0wLjEyMy0wLjE2MS0wLjI0My0wLjMxNC0wLjM3LTAuNDc1YzEuODcxLDIuNTA3LDIuOTk3LDUuNjI0LDIuOTk3LDkuMDFDNDMyLjQyOCwyODEuNjkxLDQzMC45NSwyODUuMjEyLDQyOC41NjMsMjg3Ljg3MnoNCgkgTTE2OS4zODYsMjU1Ljk3NGwxMS44MjQsMTMuMzQzbC0xMi4zNDgsMTMuNDMzaC0yNi41NzR2LTkuMTExaDIzLjcyN3YtOS4zNDNoLTIzLjcyN3YtOC4zMjJMMTY5LjM4NiwyNTUuOTc0TDE2OS4zODYsMjU1Ljk3NHoNCgkgTTE5NS4xMjIsMjY5LjQ3NGwxNi41OTUtMTguMDU0djM2LjcxTDE5NS4xMjIsMjY5LjQ3NHogTTI0My4xODEsMjYxLjU4NmMwLDMuOTctMi41ODYsNi4wNDctNi43MzksNi4wNDdoLTEzLjk2NHYtMTEuNjU5aDE0LjA5NQ0KCUMyNDAuNDY4LDI1NS45NzQsMjQzLjE4MSwyNTcuNTc5LDI0My4xODEsMjYxLjU4NnogTTI5MS40MTIsMjYwLjkyYzAsMS45NTctMC44MzgsMy41MzYtMi4yNDEsNC4zOTMNCgljLTEuNDQ0LDAuODY4LTMuMjMzLDAuOTQzLTUuMzMyLDAuOTQzaC0xMy4xMzR2LTEwLjI4MmgxMy4zMDZjMS45MjcsMCwzLjg1NCwwLjA0MSw1LjE2LDAuODI3DQoJQzI5MC41NzgsMjU3LjUzOCwyOTEuNDEyLDI1OC45NTYsMjkxLjQxMiwyNjAuOTJ6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTQzNi44NTgsMjcwLjQ1MXYtMjkuMzEzaC03LjQ3NmwwLDBoLTE5LjU4NGMtNi4wMzUsMC0xMC40MjUsMS40NjMtMTMuNTI2LDMuNzM0di0zLjczNEgzNjYuNjkNCgljLTQuNzMsMC0xMC4yODYsMS4xODItMTIuOTA1LDMuNzM0di0zLjczNEgzMDAuOTV2My43MzRjLTQuMjAyLTMuMDY4LTExLjMtMy43MzQtMTQuNTctMy43MzRoLTM0Ljg0N3YzLjczNA0KCWMtMy4zMjYtMy4yNTktMTAuNzItMy43MzQtMTUuMjI5LTMuNzM0aC0zOC45OTdsLTguOTI0LDkuNzc3bC04LjM1OS05Ljc3N2gtNTguMjU1djYzLjg4N2g1Ny4xNTVsOS4xOTctOS45MzFsOC42NTgsOS45MzENCglsMzUuMjM2LDAuMDM3di0xNS4wMzRoMy40NjFjNC42NzMsMC4wNzUsMTAuMTg1LTAuMTE2LDE1LjA0OS0yLjI0NXYxNy4yMzhoMjkuMDYydi0xNi42NTVoMS40MDdjMS43ODksMCwxLjk2MSwwLjA3OSwxLjk2MSwxLjg4Ng0KCXYxNC43NjloODguMjc2YzUuNjA5LDAsMTEuNDY5LTEuNDU2LDE0LjcxNi00LjA4NnY0LjA4NmgyNy45OTZjNS44MywwLDExLjUyMS0wLjgyNywxNS44NS0yLjk0NXYtMC4wNjcNCgljNi4zMjQtNC4wNzksMTAuNTI5LTExLjIyNSwxMC41MjktMTkuMzgyQzQ0MC4zMywyNzguMTUxLDQzOS4wNTEsMjczLjk3OSw0MzYuODU4LDI3MC40NTF6IE0yMzUuOTU5LDI4MC42NzNoLTEzLjQ4NXYxNS4zNmgtMjEuMDAzDQoJbC0xMy4zMDktMTUuMTYybC0xMy44MjYsMTUuMTYyaC00Mi44MDl2LTQ1Ljc5Mmg0My40NjhsMTMuMjk0LDE1LjAwOGwxMy43NDctMTUuMDA4aDM0LjUzM2M4LjU3MiwwLDE4LjIwNywyLjQwNiwxOC4yMDcsMTUuMDgzDQoJQzI1NC43NzYsMjc4LjA1LDI0NS40MDMsMjgwLjY3MywyMzUuOTU5LDI4MC42NzN6IE0zMDAuOTk1LDI3OC41OTZjMS41MjcsMi4yMzQsMS43NDcsNC4zMTgsMS43OTIsOC4zNTl2OS4wNzhoLTEwLjg0NHYtNS43MjkNCgljMC0yLjc1NCwwLjI1OC02LjgzMi0xLjc1MS04Ljk2NWMtMS41ODMtMS42MzktMy45ODEtMi4wMzYtNy45MjktMi4wMzZoLTExLjU1MXYxNi43MjloLTEwLjg1NVYyNTAuMjRoMjQuOTUNCgljNS40NywwLDkuNDUyLDAuMjQzLDEzLjAwMywyLjE2M2MzLjQxMywyLjA4NCw1LjU1Nyw0LjkzOSw1LjU1NywxMC4xNjZjMCw3LjMwOC00LjgxNiwxMS4wNDItNy42NTksMTIuMTgzDQoJQzI5OC4xMDIsMjc1LjY1MiwzMDAuMDc0LDI3Ny4yNjEsMzAwLjk5NSwyNzguNTk2eiBNMzQ1LjQyMSwyNTkuNzE2aC0yNS4zMDl2OC4zMjVoMjQuNjkydjkuMzQzaC0yNC42OTJ2OS4xMTFsMjUuMzA5LDAuMDQ1djkuNQ0KCWgtMzYuMDY3di00NS43OTloMzYuMDY3TDM0NS40MjEsMjU5LjcxNkwzNDUuNDIxLDI1OS43MTZ6IE0zNzIuOTQxLDI5Ni4wMzdoLTIxLjA0N3YtOS44MjJoMjAuOTY5YzIuMDUsMCwzLjUwMi0wLjI2OSw0LjQxNS0xLjEzNw0KCWMwLjczNy0wLjcwMywxLjI3Ni0xLjczNiwxLjI3Ni0yLjk3OGMwLTEuMzM2LTAuNTc2LTIuMzk4LTEuMzIxLTMuMDM1Yy0wLjgzMS0wLjcwMy0xLjk2NC0xLjAxNC0zLjg0Ny0xLjAxNA0KCWMtMTAuMTA3LTAuMzQ0LTIyLjc2NSwwLjMxNC0yMi43NjUtMTQuMTc4YzAtNi42NDIsNC4xMjMtMTMuNjMxLDE1LjQ1LTEzLjYzMWgyMS42Njl2OS43NDdoLTE5LjgyNA0KCWMtMS45NjQsMC0zLjI0NCwwLjA3NS00LjMzMywwLjgyM2MtMS4xNzksMC43NDUtMS42MjQsMS44NDEtMS42MjQsMy4zYzAsMS43MjUsMS4wMSwyLjksMi4zNjUsMy40MTMNCgljMS4xNDUsMC4zOTcsMi4zNjUsMC41MTMsNC4yMDYsMC41MTNsNS44MjIsMC4xNjhjNS44NjMsMC4xMzgsOS44OTMsMS4xNzEsMTIuMzQsMy42NzhjMi4xMDcsMi4yLDMuMjI5LDQuOTg0LDMuMjI5LDkuNjk1DQoJQzM4OS45MTgsMjkxLjQzNCwzODMuODQ1LDI5Ni4wMzcsMzcyLjk0MSwyOTYuMDM3eiBNNDI4LjU2MywyOTEuNjE0Yy0yLjg0NywyLjkxNS03LjQzOSw0LjQyMy0xMy40MjksNC40MjNoLTIwLjg3MnYtOS44MjJoMjAuNzg1DQoJYzIuMDY1LDAsMy41MS0wLjI2OSw0LjM3OC0xLjEzN2MwLjc1Mi0wLjcwMywxLjI3Ni0xLjczNiwxLjI3Ni0yLjk3OGMwLTEuMzM2LTAuNTI0LTIuMzk4LTEuMzIxLTMuMDM1DQoJYy0wLjc4Mi0wLjcwMy0xLjkyMy0xLjAxNC0zLjgwOS0xLjAxNGMtMTAuMTQ4LTAuMzQ0LTIyLjgwNiwwLjMxNC0yMi44MDYtMTQuMTc4YzAtNi42NDIsNC4xNjEtMTMuNjMxLDE1LjUwNi0xMy42MzFoMjEuMTE1djkuNzQ0DQoJaC0xOS4yODFjLTEuOTYxLDAtMy4yNywwLjA3OS00LjM3NCwwLjgyN2MtMS4xNDEsMC43NDEtMS41NzksMS44NDEtMS41NzksMy4yOTNjMCwxLjczMiwwLjk2MiwyLjksMi4zNjUsMy40MTMNCgljMS4xNDUsMC40MDQsMi4zNjUsMC41Miw0LjE2MSwwLjUybDUuODU2LDAuMTYxYzUuOTEyLDAuMTQ2LDkuODYsMS4xNzUsMTIuMjU4LDMuNjg2YzAuNDM4LDAuMzQ4LDAuNzAzLDAuNzQxLDEuMDEsMS4xMw0KCWMtMC4xMjMtMC4xNjEtMC4yNDMtMC4zMTQtMC4zNy0wLjQ3NWMxLjg3MSwyLjUwNywyLjk5Nyw1LjYyNCwyLjk5Nyw5LjAxQzQzMi40MjgsMjg1LjQzMyw0MzAuOTUsMjg4Ljk1NCw0MjguNTYzLDI5MS42MTR6DQoJIE0xNjkuMzg2LDI1OS43MTZsMTEuODI0LDEzLjM0M2wtMTIuMzQ4LDEzLjQzM2gtMjYuNTc0di05LjExMWgyMy43Mjd2LTkuMzQzaC0yMy43Mjd2LTguMzIyTDE2OS4zODYsMjU5LjcxNkwxNjkuMzg2LDI1OS43MTZ6DQoJIE0xOTUuMTIyLDI3My4yMTZsMTYuNTk1LTE4LjA1NHYzNi43MUwxOTUuMTIyLDI3My4yMTZ6IE0yNDMuMTgxLDI2NS4zMjhjMCwzLjk3LTIuNTg2LDYuMDQ3LTYuNzM5LDYuMDQ3aC0xMy45NjR2LTExLjY1OWgxNC4wOTUNCglDMjQwLjQ2OCwyNTkuNzE2LDI0My4xODEsMjYxLjMyMSwyNDMuMTgxLDI2NS4zMjh6IE0yOTEuNDEyLDI2NC42NjJjMCwxLjk1Ny0wLjgzOCwzLjUzNi0yLjI0MSw0LjM5Mw0KCWMtMS40NDQsMC44NjgtMy4yMzMsMC45NDMtNS4zMzIsMC45NDNoLTEzLjEzNHYtMTAuMjgyaDEzLjMwNmMxLjkyNywwLDMuODU0LDAuMDQxLDUuMTYsMC44MjcNCglDMjkwLjU3OCwyNjEuMjgsMjkxLjQxMiwyNjIuNjk4LDI5MS40MTIsMjY0LjY2MnoiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
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
    saveBugsList: (bugsList) => dispatch(saveBugsList(bugsList)),
  };
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    productToPass: state.productToPass,
    watchlist: state.watchlist,
    authAAP: state.authAAP,
    cartId: state.cartId,
    bugsList: state.bugsList,
  };
};

const productPage = connect(mapStateToProps, mapDispatchToProps)(productPage1);

export default connect()(productPage);
