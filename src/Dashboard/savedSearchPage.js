import React, { Component } from "react";
import { connect } from "react-redux";
import { saveUserAAP } from "../Actions/authAAPActions";
import { saveProductsByCategoryID } from "../Actions/productByCategoryIDAAP";
import NavigationBarAAP from "./NavigationBarAAP";
import HomeSearch from "./homeSearch";
import SearchesList from "./SearchesList/searchesList";
import { Redirect } from "react-router-dom";
import { domainUrl } from "../requests";

class savedSearchList1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      searches: [],
      title: "saved searches",
      isMoveToProductPage: false,
    };

    this.props.saveUserAAP({
      userAAP: this.props.authAAP.userAAP,
      isLoggedIn: this.props.authAAP.isLoggedIn,
      isSignIn: this.props.authAAP.isSignIn,
    });

    this.props.saveProductsByCategoryID({
      categoryID: this.props.productsByCategory.categoryID,
      productsById: this.props.productsByCategory.productsById,
    });

    this.fillSearchesArray();
  }

  fillSearchesArray = async () => {
    await fetch(
        domainUrl+"/acs/searchList/getSearchList/" +
        this.props.authAAP.userAAP.email
    )
      .then((response) => {
        if (response.status === 200) {
          response.json().then((d) => {
            const savedSearches = d;
            this.setState({
              id: savedSearches.searchListID,
              searches: savedSearches.searches,
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

  handleMoveToProductPage() {
    if (this.state.isMoveToProductPage) {
      this.setState({
        isMoveToProductPage: false,
      });
      return <Redirect to="/dashboard/productByCategory" />;
    }
  }

  render() {
    const handleRemoveAll = async () => {
      const data = {
        searchListID: this.state.id,
      };
      const dataJson = JSON.stringify(data);
      await fetch(domainUrl+ "/acs/searchList/clearSearchList", {
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

      window.location.reload();
    };

    const handleDeleteClick = async (search) => {
      const data = {
        searchListID: this.state.id,
        text: search,
      };
      const dataJson = JSON.stringify(data);
      await fetch(
        domainUrl+"/acs/searchList/removeSearchFromSearchList",
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
      setTimeout(() => {
        window.location.reload();
      }, 100);
    };

    const handleItemClick = async (search) => {
      var data = {
        keyword: search,
        page: 0,
        size: 100,
      };

      const dataJson = JSON.stringify(data);
      const searchByKeyWordLink =
       domainUrl+"/acs/products/getByKeyword";
      await fetch(searchByKeyWordLink, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: dataJson,
      }).then(
        (response) => {
          if (response.status === 200) {
            response.json().then((d) => {
              const productsArray = d;

              this.props.saveProductsByCategoryID({
                categoryID: search,
                productsById: productsArray,
              });
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

      setTimeout(() => {
        this.setState({
          isMoveToProductPage: true,
        });
      }, 50);
    };
    return (
      <div>
        {" "}
        <NavigationBarAAP />
        <div>
          <hr id="border16" align="right" />
        </div>
        <HomeSearch />
        <div>
          <hr id="border3" align="right" style={{ marginTop: "0px" }} />
        </div>
        <SearchesList
          title={this.state.title}
          searchesList={this.state.searches}
          onClickItem={handleItemClick}
          onRemoveSearch={handleDeleteClick}
          onRemoveAll={handleRemoveAll}
        ></SearchesList>
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
        {this.handleMoveToProductPage()}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveUserAAP: (userAAP) => dispatch(saveUserAAP(userAAP)),
    saveProductsByCategoryID: (productsById) =>
      dispatch(saveProductsByCategoryID(productsById)),
  };
}

const mapStateToProps = (state) => {
  return {
    authAAP: state.authAAP,
    productsByCategory: state.productsByCategory,
  };
};

const savedSearchList = connect(
  mapStateToProps,
  mapDispatchToProps
)(savedSearchList1);

export default connect()(savedSearchList);
