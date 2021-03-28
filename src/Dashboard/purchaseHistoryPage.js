import React, { Component } from "react";
import { connect } from "react-redux";
import { saveUserAAP } from "../Actions/authAAPActions";
import { savePassingProduct } from "../Actions/passProduct";
import NavigationBarAAP from "./NavigationBarAAP";
import HomeSearch from "./homeSearch";
import HistoryList from "./PurchaseHistory/PurchaseGeneral";

class purchaseHistoryList1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyList: [],
    };

    this.props.saveUserAAP({
      userAAP: this.props.authAAP.userAAP,
      isLoggedIn: this.props.authAAP.isLoggedIn,
      isSignIn: this.props.authAAP.isSignIn,
    });

    this.props.savePassingProduct({
      productToPass: this.props.productToPass.productToPass,
    });

    this.fillHistoryList();
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
  };
}

const mapStateToProps = (state) => {
  return {
    authAAP: state.authAAP,
    productToPass: state.productToPass,
  };
};

const purchaseHistoryList = connect(
  mapStateToProps,
  mapDispatchToProps
)(purchaseHistoryList1);

export default connect()(purchaseHistoryList);
