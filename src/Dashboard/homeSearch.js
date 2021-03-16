import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import "./style.css";
import { Dropdown } from "primereact/dropdown";
import "./DropdownDemo.css";
import { Button } from "primereact/button";
import { saveUserAAP } from "../Actions/authAAPActions";
import "./ButtonDemo.css";
import "./CarouselDemo.css";
import { TabView, TabPanel } from "primereact/tabview";
import "./TabViewDemo.css";
import { Carousel } from "primereact/carousel";
import clothes2 from "./img/clothes2.jpg";
import Sony from "./img/sony.jpg";
import { Link, Route, NavLink } from "react-router-dom";
import NavigationBarAAP from "./NavigationBarAAP";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { saveProductsByCategoryID } from "../Actions/productByCategoryIDAAP";

class HomeSearch1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: null,
      selectedCategories: "All Categories",
      isSearchClicked: false,
    };

    this.categories = [
      { name: "All Categories" },
      { name: "Art" },
      { name: "Baby" },
      { name: "Books" },
      { name: "Digital Cameras & Photo" },
      { name: "Cell Phones & Accessories" },
      { name: "Smart Watches" },
      { name: "Clothing, Shoes & Accessorise" },
      { name: "Computers& Tablets & Networking" },
      { name: "Healthy & Beauty" },
      { name: "Home & Garden" },
      { name: "Jewelry & Watches" },
      { name: "Music" },
      { name: "Sport" },
      { name: "Toys & Hobbies" },
      { name: "Travel" },
      { name: "Video Games & Consoles" },
    ];

    this.props.saveProductsByCategoryID({
      categoryID: this.props.productsByCategory.categoryID,
      productsById: this.props.productsByCategory.productsById,
    });

    this.props.saveUserAAP({
      userAAP: this.props.authAAP.userAAP,
      isLoggedIn: this.props.authAAP.isLoggedIn,
      isSignIn: this.props.authAAP.isSignIn,
    });
    console.log(this.props.authAAP);
    this.onCategoryChange = this.onCategoryChange.bind(this);
  }
  onCategoryChange = (e) => {
    this.setState({ selectedCategories: e.value.name });
    console.log(e.value.name);
  };

  handleSearch = (e) => {
    console.log(e.target.value);
    this.setState({
      search: e.target.value,
    });
  };

  saveSearchKeywordWithServer() {
    if (this.props.authAAP.isSignIn) {
      fetch(
        "http://localhost:8092/acs/searchList/getSearchList/" +
          this.props.authAAP.userAAP.email
      )
        .then((response) => {
          if (response.status === 200) {
            response.json().then((d) => {
              const historySearch = d;
              console.log(historySearch.searchListID);
              var data = {
                searchListID: historySearch.searchListID,
                text: this.state.search,
              };

              const dataJson = JSON.stringify(data);

              fetch(
                "http://localhost:8092/acs/searchList/addSearchToSearchList",
                {
                  method: "POST", // or 'PUT'
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: dataJson,
                }
              ).then(
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

  handleClick = (e) => {
    if (this.state.search != null && this.state.search != "") {
      var data = {
        keyword: this.state.search,
        page: 0,
        size: 100,
      };

      const dataJson = JSON.stringify(data);
      const searchByKeyWordLink =
        "http://localhost:8092/acs/products/getByKeyword";
      fetch(searchByKeyWordLink, {
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
              if (this.state.selectedCategories !== "All Categories") {
                var ArrayByCategory = [];
                for (var i = 0; i < d.length; i++) {
                  if (
                    productsArray[i].categories[0].catgeroyName ===
                    this.state.selectedCategories
                  ) {
                    ArrayByCategory.push(productsArray[i]);
                  }
                }
                this.props.saveProductsByCategoryID({
                  categoryID: this.state.search,
                  productsById: ArrayByCategory,
                });
              } else {
                this.props.saveProductsByCategoryID({
                  categoryID: this.state.search,
                  productsById: productsArray,
                });
              }
              setTimeout(() => {
                this.saveSearchKeywordWithServer();
              }, 500);
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
    }
    setTimeout(() => {
      console.log(this.props.productsByCategory);
      this.setState({
        isSearchClicked: true,
      });
    }, 500);
  };

  isMoveToProductPage() {
    if (this.state.isSearchClicked) {
      this.setState({
        isSearchClicked: false,
      });
      return <Redirect to="/dashboard/productByCategory" />;
    }
  }
  render() {
    return (
      <div>
        <span id="home_search" className="p-input-icon-left">
          <i
            id="icon_search"
            className="pi pi-search"
            style={{ fontSize: "1.2em" }}
          />
          <InputText
            id="home_search1"
            onChange={this.handleSearch}
            placeholder="Search for anything"
          ></InputText>
          <Dropdown
            id="selecet_category"
            value={this.state.selectedCategories}
            options={this.categories}
            onChange={this.onCategoryChange}
            optionLabel="name"
            placeholder={this.state.selectedCategories}
          />
          <Button
            id="home_Search_button"
            label="Search"
            onClick={this.handleClick}
          />
          {this.isMoveToProductPage()}
          <Link to="/dashboard/advanced" id="advanced">
            Advanced
          </Link>
        </span>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveProductsByCategoryID: (productsById) =>
      dispatch(saveProductsByCategoryID(productsById)),
    saveUserAAP: (userAAP) => dispatch(saveUserAAP(userAAP)),
  };
}

const mapStateToProps = (state) => {
  return {
    productsByCategory: state.productsByCategory,
    authAAP: state.authAAP,
  };
};

const HomeSearch = connect(mapStateToProps, mapDispatchToProps)(HomeSearch1);

export default HomeSearch;
