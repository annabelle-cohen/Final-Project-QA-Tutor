import React, { Component, useCallback } from "react";
import { connect } from "react-redux";
import { saveAllCategories } from "../Actions/allCategoriesAAP";
import { savePassingProduct } from "../Actions/passProduct";
import { saveProductsByCategoryID } from "../Actions/productByCategoryIDAAP";
import { saveUserAAP } from "../Actions/authAAPActions";
import NavigationBarAAP from "./NavigationBarAAP";
import HomeSearch from "./homeSearch";
import "./productByCategory.css";
import Products from "./Products/Products";
import { saveCart } from "../Actions/shoppingCart";
import { saveCartID } from "../Actions/savingCartId";

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

  fillCategoryName = (e) => {
    const data = {
      categoryID: this.props.productsByCategory.categoryID,
    };

    const main = "http://localhost:8092//";
    const getCategoryById = main + "/acs/category";
    const dataJson = JSON.stringify(data);

    fetch(getCategoryById, {
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

  render() {
    const handleAddToCart = async (product, quantity) => {
      /*total number of all products in the cart*/
      var totalNum = this.props.cart.totalNumOfProducts + quantity;
      var price =
        this.props.cart.totalPrice +
        product.unitPrice +
        product.shippingServiceCost;
      var cart = this.props.cart.cart;
      /**for the array of amount of each product */
      var amountOfproducts = this.props.cart.amountOfproducts;
      var lastPosition = window.pageYOffset;
      var isExist = cart.some((item) => item.title === product.title);
      console.log(amountOfproducts);
      console.log(totalNum);
      console.log(isExist);
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
       
        const main = "http://localhost:8092//";
       
        if (!isExist){
        const addProductLink = main + "/acs/products/addProductToCart";

        const addingProduct = {
          productID: product.productID,
          cartID: this.props.cartId.id,
        };

        console.log(addingProduct);
        const dataJson = JSON.stringify(addingProduct);

      await  fetch(addProductLink, {
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
      this.props.savePassingProduct({
        productToPass: product,
      });

      console.log(this.props.productToPass);
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
              There is no result for your search!
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
  };
};

const productByCategoryAAP1 = connect(
  mapStateToProps,
  mapDispatchToProps
)(productByCategoryAAP);

export default connect()(productByCategoryAAP1);
