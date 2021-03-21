import React, { Component } from "react";
import { connect } from "react-redux";
import { saveLastChoice } from "../Actions/saveLastChoice";
import { saveUserAAP } from "../Actions/authAAPActions";
import { savePassingProduct } from "../Actions/passProduct";
import { saveWatchlist } from "../Actions/addToWatchlist";
import NavigationBarAAP from "./NavigationBarAAP";
import HomeSearch from "./homeSearch";
import Listing from "./pageList/productsList";

class genericList1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  loadProductByChoice() {
    console.log("im here in load product by choice");
    if (this.props.choice.choice === "watchlist") {
      fetch(
        "http://localhost:8092/acs/watchlist/getwatchList/" +
          this.props.authAAP.userAAP.email
      )
        .then((response) => {
          if (response.status === 200) {
            response.json().then((d) => {
              const watchList = d;
              console.log(watchList.products);
              this.setState({
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
      fetch(
        "http://localhost:8092/acs/viewedlist/getViewedList/" +
          this.props.authAAP.userAAP.email
      )
        .then((response) => {
          if (response.status === 200) {
            response.json().then((d) => {
              const recentleyViewed = d;
              console.log(recentleyViewed.products);
              this.setState({
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

    if (this.props.choice.choice === "history") {
      //need change to history link when ali will acomplish the task
      fetch(
        "http://localhost:8092/acs/viewedlist/getViewedList/" +
          this.props.authAAP.userAAP.email
      )
        .then((response) => {
          if (response.status === 200) {
            response.json().then((d) => {
              const recentleyViewed = d;
              console.log(recentleyViewed.products);
              this.setState({
                products: recentleyViewed.products,
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
  }

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
        fetch(
          "http://localhost:8092/acs/watchlist/removeProductFromWatchList",
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
        fetch(
          "http://localhost:8092/acs/viewedlist/removeProductFromViewedList",
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

      //do the same for purchase history
      window.location.reload();
    };

    const handleRemoveAll = async () => {
      if (this.props.choice.choice === "watchlist") {
        const data = {
          watchListID: this.state.id,
        };
        const dataJson = JSON.stringify(data);
        fetch("http://localhost:8092/acs/watchlist/clearwatchList", {
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
        fetch("http://localhost:8092/acs/viewedlist/clearViewedList", {
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

      //do the same for purchase history
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
          choice={this.props.choice.choice}
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
