import React, { Component } from "react";
import { connect } from "react-redux";
import { saveLastChoice } from "../Actions/saveLastChoice";
import { saveUserAAP } from "../Actions/authAAPActions";
import { savePassingProduct } from "../Actions/passProduct";
import { saveWatchlist } from "../Actions/addToWatchlist";
import NavigationBarAAP from "./NavigationBarAAP";
import HomeSearch from "./homeSearch";
import Listing from "./pageList/productsList";
import { domainUrl } from "../requests";

class genericList1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.choice.choice,
      products: [],
      id: "",
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
    this.props.saveWatchlist({
      Watchlist: this.props.watchlist.Watchlist,
    });

    this.loadProductByChoice();
  }

  handleChanges() {
    if (this.state.title !== this.props.choice.choice) {
      this.loadProductByChoice();
    }
  }

  loadProductByChoice = async () => {
    console.log("im here in load product by choice");
    if (this.props.choice.choice === "watchlist") {
      await fetch(
          domainUrl+ "/acs/watchlist/getwatchList/" +
          this.props.authAAP.userAAP.email
      )
        .then((response) => {
          if (response.status === 200) {
            response.json().then((d) => {
              const watchList = d;
              console.log(watchList.products);
              this.setState({
                title: this.props.choice.choice,
                products: watchList.products,
                id: watchList.watchListID,
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

      setTimeout(() => {
        this.props.saveWatchlist({
          Watchlist: this.state.products,
        });
      }, 500);
    }

    if (this.props.choice.choice === "viewed") {
      await fetch(
          domainUrl+"/acs/viewedlist/getViewedList/" +
          this.props.authAAP.userAAP.email
      )
        .then((response) => {
          if (response.status === 200) {
            response.json().then((d) => {
              const recentleyViewed = d;
              console.log(recentleyViewed.products);
              this.setState({
                title: this.props.choice.choice,
                products: recentleyViewed.products,
                id: recentleyViewed.viewedListID,
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
    }
  };

  render() {
    const handleItemClick = async (product) => {
      this.props.savePassingProduct({
        productToPass: product,
      });

      console.log(this.props.productToPass);
    };
    const handleDeleteClick = async (product) => {
      if (this.props.choice.choice === "watchlist") {
        const data = {
          productID: product.productID,
          watchListID: this.state.id,
        };
        const dataJson = JSON.stringify(data);
        await fetch(
          domainUrl+"/acs/watchlist/removeProductFromWatchList",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: dataJson,
          }
        ).then(
          (response) => {
            if (response.status === 200) {
              console.log("Deleted!");
            } else {
              console.log("failed delete");
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }

      if (this.props.choice.choice === "viewed") {
        const data = {
          productID: product.productID,
          viewedListID: this.state.id,
        };
        const dataJson = JSON.stringify(data);
        await fetch(
          domainUrl+"/acs/viewedlist/removeProductFromViewedList",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: dataJson,
          }
        ).then(
          (response) => {
            if (response.status === 200) {
              console.log("Deleted!");
            } else {
              console.log("failed delete");
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }

      window.location.reload();
    };

    const handleRemoveAll = async () => {
      if (this.props.choice.choice === "watchlist") {
        const data = {
          watchListID: this.state.id,
        };
        const dataJson = JSON.stringify(data);
        await fetch(domainUrl+"/acs/watchlist/clearwatchList", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: dataJson,
        }).then(
          (response) => {
            if (response.status === 200) {
              console.log("Deleted!");
            } else {
              console.log("failed delete");
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }

      if (this.props.choice.choice === "viewed") {
        const data = {
          viewedListID: this.state.id,
        };
        const dataJson = JSON.stringify(data);
        await fetch(domainUrl+"/acs/viewedlist/clearViewedList", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: dataJson,
        }).then(
          (response) => {
            if (response.status === 200) {
              console.log("Deleted!");
            } else {
              console.log("failed delete");
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }

      window.location.reload();
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
        <Listing
          choice={this.state.title}
          token={this.state.products}
          onClickItem={handleItemClick}
          onRemoveProduct={handleDeleteClick}
          onRemoveAll={handleRemoveAll}
        ></Listing>
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
        {this.handleChanges()}
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
    saveWatchlist: (watchlist) => dispatch(saveWatchlist(watchlist)),
  };
}

const mapStateToProps = (state) => {
  return {
    authAAP: state.authAAP,
    productToPass: state.productToPass,
    choice: state.choice,
    watchlist: state.watchlist,
  };
};

const genericList = connect(mapStateToProps, mapDispatchToProps)(genericList1);

export default connect()(genericList);
