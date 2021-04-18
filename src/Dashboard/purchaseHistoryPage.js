import React, { Component } from "react";
import { connect } from "react-redux";
import { saveUserAAP } from "../Actions/authAAPActions";
import { savePassingProduct } from "../Actions/passProduct";
import NavigationBarAAP from "./NavigationBarAAP";
import HomeSearch from "./homeSearch";
import { saveLastChoice } from "../Actions/saveLastChoice";
import HistoryList from "./PurchaseHistory/PurchaseGeneral";
import { saveCart } from "../Actions/shoppingCart";
import { saveCartID } from "../Actions/savingCartId";

class purchaseHistoryList1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyList: [],
      choice: this.props.choice.choice,
    };

    this.props.saveUserAAP({
      userAAP: this.props.authAAP.userAAP,
      isLoggedIn: this.props.authAAP.isLoggedIn,
      isSignIn: this.props.authAAP.isSignIn,
    });

    this.props.savePassingProduct({
      productToPass: this.props.productToPass.productToPass,
    });

    this.props.saveLastChoice({
      choice: this.props.choice.choice,
    });

    this.props.saveCart({
      cartId: this.props.cart.cartID,
      lastPosition: 0,
      totalPrice: this.props.cart.totalPrice,
      totalNumOfProducts: this.props.cart.totalNumOfProducts,
      cart: this.props.cart.cart,
      amountOfproducts: this.props.cart.amountOfproducts,
    });

    this.props.saveCartID({
      cartId: this.props.cartId.id,
    });

    console.log(this.props.choice.choice);

    this.fillHistoryList();
  }

  componentDidUpdate(prev) {
    if (this.state.choice !== this.props.choice.choice) {
      window.location.reload();
    }
  }
  fillHistoryList = async () => {
    await fetch(
      "http://localhost:8092/acs/orders/getOrderHistroy/" +
        this.props.authAAP.userAAP.email
    )
      .then((response) => {
        if (response.status === 200) {
          response.json().then((d) => {
            const orderInfo = d;
            this.setState({
              historyList: orderInfo,
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
    const handleClickOnItem = async (product) => {
      await this.props.savePassingProduct({
        productToPass: product,
      });
    };
    const handleBuyAgain = async (Order) => {
      var ArrayOfProducts = Order.products;
      var totalPrice = Order.totalPrice;
      const main = "http://localhost:8092//";

      if (this.props.cart.cart.length == 0) {
        this.props.saveCart({
          lastPosition: this.props.cart.lastPosition,
          totalPrice: totalPrice,
          totalNumOfProducts: ArrayOfProducts.length,
          cart: ArrayOfProducts,
          amountOfproducts: Order.quantity,
        });

        for (var i = 0; i < ArrayOfProducts.length; i++) {
          var productId = ArrayOfProducts[i].productID;

          const addProductLink = main + "/acs/products/addProductToCart";

          const addingProduct = {
            productID: productId,
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

        const addQuantity = main + "/acs/carts/updateCartQuantity";

        const addingQuantity = {
          cartID: this.props.cartId.id,
          quantity: Order.quantity,
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
      } else {
        var currentCart = this.props.cart.cart;
        var amountOfProducts = this.props.cart.amountOfproducts;
        var newPrice = this.props.cart.totalPrice;
        var totalNumberOfProducts = this.props.cart.totalNumOfProducts;
        newPrice += totalPrice;

        for (var i = 0; i < ArrayOfProducts.length; i++) {
          totalNumberOfProducts += Order.quantity[i];
          var isExist = currentCart.some(
            (item) => item.title === ArrayOfProducts[i].title
          );
          if (isExist) {
            var index = currentCart.findIndex(
              (item) => item.productID === ArrayOfProducts[i].productID
            );

            amountOfProducts[index] += 1;
          } else {
            currentCart.push(ArrayOfProducts[i]);
            var temp = {};
            temp = Order.quantity[i];
            amountOfProducts.push(temp);

            var productId = ArrayOfProducts[i].productID;

            const addProductLink = main + "/acs/products/addProductToCart";

            const addingProduct = {
              productID: productId,
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
        }

        this.props.saveCart({
          lastPosition: this.props.cart.lastPosition,
          totalPrice: newPrice,
          totalNumOfProducts: totalNumberOfProducts,
          cart: currentCart,
          amountOfproducts: amountOfProducts,
        });

        const addQuantity = main + "/acs/carts/updateCartQuantity";

        const addingQuantity = {
          cartID: this.props.cartId.id,
          quantity: amountOfProducts,
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
    return (
      <div>
        {" "}
        <NavigationBarAAP />
        <div>
          <hr id="border16" align="right" />
        </div>
        <HomeSearch />
        <hr id="border3" align="right" style={{ marginTop: "0px" }} />
        <HistoryList
          token={this.state.historyList}
          onItemClick={handleClickOnItem}
          onBuyAgain={this.state.choice}
          handleBuyAgain={handleBuyAgain}
        ></HistoryList>
        <div>
          <hr id="border16" align="right" />
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
    saveUserAAP: (userAAP) => dispatch(saveUserAAP(userAAP)),
    savePassingProduct: (productToPass) =>
      dispatch(savePassingProduct(productToPass)),
    saveLastChoice: (choice) => dispatch(saveLastChoice(choice)),
    saveCart: (cart) => dispatch(saveCart(cart)),
    saveCartID: (cartId) => dispatch(saveCartID(cartId)),
  };
}

const mapStateToProps = (state) => {
  return {
    authAAP: state.authAAP,
    productToPass: state.productToPass,
    choice: state.choice,
    cart: state.cart,
    cartId: state.cartId,
  };
};

const purchaseHistoryList = connect(
  mapStateToProps,
  mapDispatchToProps
)(purchaseHistoryList1);

export default connect()(purchaseHistoryList);
