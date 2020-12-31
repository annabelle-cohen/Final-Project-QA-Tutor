import React, { Component, useCallback } from "react";
import { connect } from "react-redux";
import { saveAllCategories } from "../Actions/allCategoriesAAP";
import { savePassingProduct } from "../Actions/passProduct";
import { saveProductsByCategoryID } from "../Actions/productByCategoryIDAAP";
import { saveShoppingCart } from "../Actions/cartShop";
import NavigationBarAAP from "./NavigationBarAAP";
import HomeSearch from "./homeSearch";
import "./productByCategory.css";
import Products from "./Products/Products";

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

    const products = [];

    this.props.saveShoppingCart({
      numberOfProduct: this.props.shoppingCart.numberOfProduct,
      products: this.props.shoppingCart.products,
      totalPrice: this.props.shoppingCart.totalPrice,
      lastPosition: this.props.shoppingCart.lastPosition,
    });

    this.fillProductsArray = this.fillProductsArray.bind(this);
    this.fillCategoryName = this.fillCategoryName.bind(this);
    this.fillCategoryName();
    this.fillProductsArray();
  }

  componentDidUpdate(prevProps) {
    window.scrollTo({
      top: this.props.shoppingCart.lastPosition,
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
      var numbers = this.props.shoppingCart.numberOfProduct + quantity;
      var products = this.props.shoppingCart.products;
      products.push(product);
      var price = this.props.shoppingCart.totalPrice + product.unitPrice;
      var lastPosition = window.pageYOffset;

      this.props.saveShoppingCart({
        numberOfProduct: numbers,
        products: products,
        totalPrice: price,
        lastPosition: lastPosition,
      });

      console.log(this.props.shoppingCart.products);
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
    saveShoppingCart: (shoppingCart) =>
      dispatch(saveShoppingCart(shoppingCart)),
  };
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    productsByCategory: state.productsByCategory,
    productToPass: state.productToPass,
    shoppingCart: state.shoppingCart,
  };
};

const productByCategoryAAP1 = connect(
  mapStateToProps,
  mapDispatchToProps
)(productByCategoryAAP);

export default connect()(productByCategoryAAP1);
