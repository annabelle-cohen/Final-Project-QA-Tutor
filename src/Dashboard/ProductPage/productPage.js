import React, { Component } from "react";
import { connect } from "react-redux";
import { savePassingProduct } from "../../Actions/passProduct";
import { saveCart } from "../../Actions/shoppingCart";
import NavigationBarAAP from "../NavigationBarAAP";
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
    this.updateState = this.updateState.bind(this);
    console.log(this.state.unitsOnOrder);
    this.updateState();
  }

  updateState() {
    this.setState({ images: this.props.productToPass.productToPass.images });
  }

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

  render() {
    return (
      <div>
        <NavigationBarAAP />
        <div>
          <hr id="border16" align="right" />
        </div>
        <HomeSearch />
        <div id="context-container">
          <div style={{ display: "inline-block" }}>
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
                  height: "100px",
                }}
              >
                <div style={{ marginTop: "-20px", marginLeft: "50px" }}>
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
                    <Button id="addToCart" label="Add To Cart" />
                  </div>
                  <div style={{ marginTop: "-30px", marginLeft: "238px" }}>
                    <Button
                      id="add-to-watchlist"
                      label="Add to watchlist"
                      icon="pi pi-eye"
                    ></Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
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
  };
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    productToPass: state.productToPass,
  };
};

const productPage = connect(mapStateToProps, mapDispatchToProps)(productPage1);

export default connect()(productPage);
