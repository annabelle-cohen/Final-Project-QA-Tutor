import React, { Component, useCallback } from "react";
import { connect } from "react-redux";
import { saveAllCategories } from "../Actions/allCategoriesAAP";
import { savePassingProduct } from "../Actions/passProduct";
import { saveProductsByCategoryID } from "../Actions/productByCategoryIDAAP";
import { saveUserAAP } from "../Actions/authAAPActions";
import { saveMessage } from "../Actions/LoadingMessage";
import NavigationBarAAP from "./NavigationBarAAP";
import HomeSearch from "./homeSearch";
import "./productByCategory.css";
import Products from "./Products/Products";
import { saveCart } from "../Actions/shoppingCart";
import { saveCartID } from "../Actions/savingCartId";
import { saveBugsList } from "../Actions/saveBugsList";
import { domainUrl } from "../requests";

export class productByCategoryAAP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: this.props.productsByCategory.categoryID,
      lastPosition: 0,
      categoryId: this.props.productsByCategory.categoryID,
    };

    this.props.saveProductsByCategoryID({
      categoryID: this.props.productsByCategory.categoryID,
      productsById: this.props.productsByCategory.productsById,
    });
    this.props.savePassingProduct({
      productToPass: "",
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

    console.log(this.props.cartId.id);

    this.props.saveUserAAP({
      userAAP: this.props.authAAP.userAAP,
      isLoggedIn: this.props.authAAP.isLoggedIn,
      isSignIn: this.props.authAAP.isSignIn,
    });

    this.props.saveMessage({
      message: this.props.messageUpdate.message,
    });

    this.props.saveBugsList({
      bugsList: this.props.bugsList.bugsList,
    });

    const products = [];

    this.fillProductsArray = this.fillProductsArray.bind(this);
    this.fillCategoryName = this.fillCategoryName.bind(this);
    this.fillCategoryName();
    this.fillProductsArray();
  }

  componentDidUpdate(prevProps) {
    window.scrollTo({
      top: this.props.cart.lastPosition,
    });
  }

  handleChanges() {
    if (this.state.categoryId !== this.props.productsByCategory.categoryID) {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }

  fillCategoryName = async (e) => {
    const data = {
      categoryID: this.props.productsByCategory.categoryID,
    };


    const getCategoryById = domainUrl + "/acs/category";
    const dataJson = JSON.stringify(data);

    await fetch(getCategoryById, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: dataJson,
    }).then(
      (response) => {
        if (response.status === 200) {
          response.json().then((d) => {
            const category = d.catgeroyName;
            this.setState({ categoryName: category });
          });
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
  };

  fillProductsArray = (e) => {
    this.products = this.props.productsByCategory.productsById;
  };

  handleAddProductBug = () => {
    console.log("Add to cart succeed!");
  };

  render() {
    const handleAddToCart = async (product, quantity) => {
      console.log("in add to cart");
      var isExistBugAdvenced = false;
      var isExistBugs = false;

      if (this.props.bugsList.bugsList.length > 0) {
        isExistBugs = this.props.bugsList.bugsList.some(
          (b) => b.bugName === "ProductsCategory Bug"
        );
        isExistBugAdvenced = this.props.bugsList.bugsList.some(
          (b) => b.bugName === "ProductsCategoryAdvanced Bug"
        );
      }
      if (isExistBugs) {
        this.handleAddProductBug();
      } else {
        console.log("in else");
        handleAddToCartAdvanced(product, quantity, isExistBugAdvenced);
      }
    };

    const handleAddToCartAdvanced = async (
      product,
      quantity,
      isBugAdvanced
    ) => {
      console.log("in handleAddToCartAdvanced");
      /*total number of all products in the cart*/
      var totalNum = parseInt(this.props.cart.totalNumOfProducts) + quantity;
      var price = 0;
      if (isBugAdvanced) {
        price =
          parseFloat(this.props.cart.totalPrice) +
          product.unitPrice +
          product.shippingServiceCost +
          52.34;
      } else {
        price =
          parseFloat(this.props.cart.totalPrice) +
          product.unitPrice +
          product.shippingServiceCost;
      }

      var cart = this.props.cart.cart;
      /**for the array of amount of each product */
      var amountOfproducts = this.props.cart.amountOfproducts;
      var lastPosition = window.pageYOffset;
      var isExist = cart.some((item) => item.title === product.title);

      if (isExist) {
        var index = cart.findIndex(
          (item) => item.productID === product.productID
        );
        console.log(index);
        amountOfproducts[index] += 1;
      } else {
        cart.push(product);
        var temp = {};
        temp = quantity;
        amountOfproducts.push(temp);
      }

      this.props.saveCart({
        lastPosition: lastPosition,
        totalPrice: price,
        totalNumOfProducts: totalNum,
        cart: cart,
        amountOfproducts: amountOfproducts,
      });

      if (this.props.authAAP.isSignIn) {
        console.log("in if add product advanced");
        

        if (!isExist) {
          const addProductLink = domainUrl + "/acs/products/addProductToCart";

          const addingProduct = {
            productID: product.productID,
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
        const addQuantity = domainUrl + "/acs/carts/updateCartQuantity";

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
    const handleItemClick = async (product) => {
      var isExisUnwantedtBug = false;
      var isProductLinkBugExist = this.props.bugsList.bugsList.some(
        (b) => b.bugName === "ProductLinkProductsPage Bug"
      );

      if (this.props.bugsList.bugsList.length > 0) {
        isExisUnwantedtBug = this.props.bugsList.bugsList.some(
          (b) => b.bugName === "Unwanted product Bug"
        );
      }
      if (isExisUnwantedtBug) {
        handleAddToCartAdvanced(product, 1, false);
      }
      if (!isProductLinkBugExist) {
        this.props.savePassingProduct({
          productToPass: product,
        });
      } else {
        var index = this.products.findIndex(
          (item) => item.productID === product.productID
        );

        if (index > 0) {
          var indexBug = index - 1;
          this.props.savePassingProduct({
            productToPass: this.products[indexBug],
          });
        } else {
          var indexBug = index + 1;
          this.props.savePassingProduct({
            productToPass: this.products[indexBug],
          });
        }
      }
    };

    return (
      <div>
        <NavigationBarAAP />
        <div>
          <hr id="border10" align="right" />
        </div>
        <HomeSearch />
        <div id="bread-crumb-div2">
          <ul class="breadcrumb">
            <li>
              <a href="/dashboard">Home</a>
            </li>
            <li>{this.state.categoryName}</li>
          </ul>
          <Products
            products={this.products}
            onAddToCart={handleAddToCart}
            onClickItem={handleItemClick}
          />

          <div
            style={{
              display: this.products.length == 0 ? "block" : "none",
              position: "relative",
              textAlign: "center",
              zIndex: 3,
              marginLeft: "30px",
              marginTop: "-100px",
              width: "1000px",
            }}
          >
            <h5 style={{ color: "gray", fontWeight: "bold" }}>
              {this.props.messageUpdate.message}
            </h5>
          </div>
        </div>
        {this.handleChanges()}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveAllCategories: (categories) => dispatch(saveAllCategories(categories)),
    saveProductsByCategoryID: (productsById) =>
      dispatch(saveProductsByCategoryID(productsById)),
    savePassingProduct: (productToPass) =>
      dispatch(savePassingProduct(productToPass)),
    saveCart: (cart) => dispatch(saveCart(cart)),
    saveUserAAP: (userAAP) => dispatch(saveUserAAP(userAAP)),
    saveCartID: (cartId) => dispatch(saveCartID(cartId)),
    saveMessage: (messageUpdate) => dispatch(saveMessage(messageUpdate)),
    saveBugsList: (bugsList) => dispatch(saveBugsList(bugsList)),
  };
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    productsByCategory: state.productsByCategory,
    productToPass: state.productToPass,
    cart: state.cart,
    authAAP: state.authAAP,
    cartId: state.cartId,
    messageUpdate: state.messageUpdate,
    bugsList: state.bugsList,
  };
};

const productByCategoryAAP1 = connect(
  mapStateToProps,
  mapDispatchToProps
)(productByCategoryAAP);

export default connect()(productByCategoryAAP1);
