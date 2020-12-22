import React, { Component } from "react";
import { connect } from "react-redux";
import { saveAllCategories } from "../Actions/allCategoriesAAP";
import { savePassingProduct } from "../Actions/passProduct";
import Product from "./Product/Product";
import { saveProductsByCategoryID } from "../Actions/productByCategoryIDAAP";
import NavigationBarAAP from "./NavigationBarAAP";
import HomeSearch from "./homeSearch";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import "./productByCategory.css";

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
});

export class productByCategoryAAP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: "",
    };

    this.props.saveProductsByCategoryID({
      categoryID: this.props.productsByCategory.categoryID,
      productsById: this.props.productsByCategory.productsById,
    });
    this.props.savePassingProduct({
      productToPass: "",
    });

    const products = [];
    this.fillProductsArray = this.fillProductsArray.bind(this);
    this.fillCategoryName = this.fillCategoryName.bind(this);
    this.fillCategoryName();
    this.fillProductsArray();
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

  handleClick = (e) => {
    console.log(e);
  };

  render() {
    const { classes } = this.props;
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
        </div>
        <div id="grid-container">
          <Grid
            container
            justify="center"
            item
            xs={10}
            sm={12}
            md={10}
            lg={12}
            spacing={1}
          >
            {this.products.map((product) => (
              <Grid
                key={product.productID}
                item
                xs={4}
                sm={4}
                md={4}
                lg={3}
              ></Grid>
            ))}
          </Grid>
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
  };
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    productsByCategory: state.productsByCategory,
    productToPass: state.productToPass,
  };
};

const productByCategoryAAP1 = connect(
  mapStateToProps,
  mapDispatchToProps
)(productByCategoryAAP);

export default connect()(withStyles(styles)(productByCategoryAAP1));
