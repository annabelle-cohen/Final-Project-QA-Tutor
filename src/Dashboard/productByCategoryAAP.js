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

export class productByCategoryAAP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: "",
      lastPosition: 0,
    };

    this.props.saveProductsByCategoryID({
      categoryID: this.props.productsByCategory.categoryID,
      productsById: this.props.productsByCategory.productsById,
    });
    this.props.savePassingProduct({
      productToPass: "",
    });

    this.props.saveCart({
      lastPosition: 0,
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
      var totalNum = this.props.cart.totalNumOfProducts + quantity;
      var price =
        this.props.cart.totalPrice +
        product.unitPrice +
        product.shippingServiceCost;
      var cart = this.props.cart.cart;
      var amountOfproducts = this.props.cart.amountOfproducts;
      var lastPosition = window.pageYOffset;
      var isExist = cart.some((item) => item.title === product.title);

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
        </div>
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
  };
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    productsByCategory: state.productsByCategory,
    productToPass: state.productToPass,
    cart: state.cart,
    authAAP: state.authAAP,
  };
};

const productByCategoryAAP1 = connect(
  mapStateToProps,
  mapDispatchToProps
)(productByCategoryAAP);

export default connect()(productByCategoryAAP1);
