import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import "./style.css";
import { Dropdown } from "primereact/dropdown";
import "./DropdownDemo.css";
import { Button } from "primereact/button";
import "./ButtonDemo.css";
import "./CarouselDemo.css";
import { TabView, TabPanel } from "primereact/tabview";
import "./TabViewDemo.css";
import { Carousel } from "primereact/carousel";
import clothes2 from "./img/clothes2.jpg";
import sneakers from "./img/sneakers.PNG";
import beauty from "./img/beauty.PNG";
import Sony from "./img/sony.jpg";
import electronic from "./img/example1.png";
import smartPhone from "./img/example2.png";
import accossorize from "./img/exmaple3.png";
import smartWatch from "./img/example4.png";
import bestOfMarch from "./img/example7.png";
import accos from "./img/accoss.PNG";
import fishing from "./img/fishing.PNG";
import apple from "./img/apple.PNG";
import samsung from "./img/samsung.PNG";
import sony from "./img/sony.PNG";
import xiaomi from "./img/xiaomi.PNG";
import nike from "./img/nike.PNG";
import nails from "./img/nails.PNG";
import AutoLovers from "./img/example6.png";
import SmartPhone from "./img/smartphone.PNG";
import Collectibles from "./img/collect.PNG";
import skinCar from "./img/example8.PNG";
import balm from "./img/example9.PNG";
import { Link, Route, NavLink } from "react-router-dom";
import NavigationBarAAP from "./NavigationBarAAP";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { saveAllCategories } from "../Actions/allCategoriesAAP";
import { saveProductsByCategoryID } from "../Actions/productByCategoryIDAAP";
import { saveLastChoice } from "../Actions/saveLastChoice";
import { saveBugsList } from "../Actions/saveBugsList";
import HomeSearch from "./homeSearch";
import { saveUserAAP } from "../Actions/authAAPActions";
import { saveUser } from "../Actions/authActions";
import { saveMessage } from "../Actions/LoadingMessage";
import { domainUrl } from "../requests";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: null,
      selectedCategories: "All Categories",
      isSuccessed: false,
      isMoveToWatchlist: false,
      ActiveIndex: 0,
    };

    this.categories = [
      { name: "All Categories" },
      { name: "Art" },
      { name: "Baby" },
      { name: "Books" },
      { name: "Cameras & Photos" },
      { name: "CellPhones & Accessorise" },
      { name: "Clothing, Shoes & Accessorise" },
      { name: "Computers/Tablets & Networking" },
      { name: "Healthy & Beauty" },
      { name: "Home & Garden" },
      { name: "Jewelry & Watches" },
      { name: "Music" },
      { name: "Sport" },
      { name: "Toys & Hobbies" },
      { name: "Travel" },
      { name: "Video Games & Consoles" },
    ];

    this.items = [
      { label: "Home" },
      { label: "Saved", icon: "pi pi-heart" },
      { label: "Electronics" },
      { label: "Fashion" },
      { label: "Health & Beauty" },
      { label: "Sports" },
      { label: "Home & Garden" },
      { label: "Deals" },
      { label: "Under $10" },
    ];

    this.Images = [electronic, smartPhone, accossorize, smartWatch];
    this.Images2 = [skinCar, bestOfMarch, balm, AutoLovers];
    this.index = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    this.props.saveAllCategories({
      categories: [],
    });

    this.props.saveProductsByCategoryID({
      categoryID: "",
      productsById: [],
    });

    this.props.saveUserAAP({
      userAAP: this.props.authAAP.userAAP,
      isLoggedIn: this.props.authAAP.isLoggedIn,
      isSignIn: this.props.authAAP.isSignIn,
    });

    this.props.saveMessage({
      message: "Loading...",
    });

    this.props.saveLastChoice({
      choice: this.props.choice.choice,
    });

    this.props.saveBugsList({
      bugsList: [],
    });

    this.props.saveUser({
      user: this.props.auth.user,
      isLoggedIn: this.props.auth.isLoggedIn,
    });

    console.log("user is:");
    console.log(this.props.authAAP);

    this.fillCategories = this.fillCategories.bind(this);
    this.productTemplate = this.productTemplate.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlecLinkSave = this.handlecLinkSave.bind(this);

    this.fillCategories();
    this.fillBugsList();
    console.log(this.props.bugsList.bugsList);
  }

  fillBugsList = async (e) => {
    await fetch(
     domainUrl+ "/acs/students/login/" + this.props.auth.user.email
    )
      .then((response) => {
        if (response.status === 200) {
          this.setState({ succeded: true });
          response.json().then((d) => {
            const user = d;
            this.props.saveBugsList({
              bugsList: user.bugs,
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

  fillCategories = async (e) => {
    const data = {
      page: 0,
      size: 30,
    };

    const getAllCategories = domainUrl+ "/acs/category/all";
    const dataJson = JSON.stringify(data);

    await fetch(getAllCategories, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: dataJson,
    }).then(
      (response) => {
        if (response.status === 200) {
          response.json().then((d) => {
            const categoriesArray = d;
            this.props.saveAllCategories({
              categories: categoriesArray,
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
  };

  handleClickOnSpecificCategory = async (e) => {
    var selectedCategory = e.target.innerText;
    var isCtaegoryBug = this.props.bugsList.bugsList.some(
      (b) => b.bugName === "Category Bug"
    );

    var isPopularCategoryBug = this.props.bugsList.bugsList.some(
      (b) => b.bugName === "PopularCategoriesAdvanced Bug"
    );

    if (selectedCategory === "Smartphones") {
      if (!isCtaegoryBug) {
        selectedCategory = "smartphone";
      } else {
        selectedCategory = "Fragrance";
      }
    }

    if (selectedCategory === "Collectibles") {
      if (!isCtaegoryBug) {
        selectedCategory = "Collectible";
      } else {
        selectedCategory = "smartphone";
      }
    }

    if (selectedCategory === "Fragrances") {
      if (!isCtaegoryBug) {
        selectedCategory = "Fragrance";
      } else {
        selectedCategory = "Collectible";
      }
    }

    if (selectedCategory === "Portable Audio & Headphones") {
      if (!isCtaegoryBug) {
        selectedCategory = "Headphones";
      } else {
        selectedCategory = "shave";
      }
    }

    if (selectedCategory === "Vehicle Electronics & GPS") {
      if (!isCtaegoryBug) {
        selectedCategory = "GPS";
      } else {
        selectedCategory = "Headphones";
      }
    }

    if (selectedCategory === "Shaving & Hair Removal") {
      if (!isCtaegoryBug) {
        selectedCategory = "shave";
      } else {
        selectedCategory = "GPS";
      }
    }

    if (selectedCategory === "Home D??cor") {
      if (!isCtaegoryBug) {
        selectedCategory = "Home Decor";
      } else {
        selectedCategory = "Pets";
      }
    }

    if (selectedCategory === "Art & Craft Supplies") {
      if (!isCtaegoryBug) {
        selectedCategory = "Art";
      } else {
        selectedCategory = "Home Decor";
      }
    }

    if (selectedCategory === "Pets Supplies") {
      if (!isCtaegoryBug) {
        selectedCategory = "Pets";
      } else {
        selectedCategory = "Art";
      }
    }

    if (selectedCategory === "Samsung") {
      if (isPopularCategoryBug) {
        selectedCategory = "Sneakers";
      }
    }

    if (selectedCategory === "Apple") {
      if (isPopularCategoryBug) {
        selectedCategory = "Beauty";
      }
    }

    if (selectedCategory === "Sony") {
      if (isPopularCategoryBug) {
        selectedCategory = "Fishing";
      }
    }

    if (selectedCategory === "Xiaomi") {
      if (isPopularCategoryBug) {
        selectedCategory = "Smartphones";
      }
    }

    if (selectedCategory === "Nails") {
      if (isPopularCategoryBug) {
        selectedCategory = "Collectibles";
      }
    }

    if (selectedCategory === "Nike") {
      if (isPopularCategoryBug) {
        selectedCategory = "Accessories";
      }
    }

    var data = {
      keyword: selectedCategory,
      page: 0,
      size: 500,
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
              categoryID: selectedCategory,
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
  };

  handleSelect(index) {
    console.log("Selected tab: " + index);
  }

  handleClick = (e) => {
    const selectedCategory = e.target.innerText;
    const allCategories = this.props.categories;
    const id = 0;

    for (var i = 0; i < allCategories.categories.length; i++) {
      if (selectedCategory === allCategories.categories[i].catgeroyName) {
        this.props.saveProductsByCategoryID({
          categoryID: allCategories.categories[i].categoryID,
          productsById: this.props.productsByCategory.productsById,
        });
      }
    }
    setTimeout(async () => {
      const data = {
        categoryID: this.props.productsByCategory.categoryID,
        page: 0,
        size: 100,
      };

      const getproductsByCategoryId = domainUrl + "/acs/products/getByCategory";
      const dataJson = JSON.stringify(data);

      await fetch(getproductsByCategoryId, {
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
                categoryID: this.props.productsByCategory.categoryID,
                productsById: productsArray,
              });
              setTimeout(() => {
                this.setState({ isSuccessed: true });
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
    }, 400);
  };

  isCategoryPageByTab() {
    if (this.state.isSuccessed) {
      return <Redirect push to="/dashboard/productByCategory" />;
    }
  }

  handlecLinkSave = (e) => {
    this.props.saveLastChoice({
      choice: "watchlist",
    });
  };

  handleSave() {}
  productTemplate(product) {
    return (
      <div className="product-item">
        <div className="product-item-content">
          <div className="p-mb-3">
            <img
              src={product}
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              alt={product.name}
              className="product-image"
              style={{
                height: "280px",
                width: "890px",
                marginLeft: "20px",
                marginTop: "8px",
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const header = <img id="img1" alt="Card" src={clothes2} />;
    const footer = (
      <span>
        <Button label="Save" icon="pi pi-check" />
        <Button
          label="Cancel"
          icon="pi pi-times"
          className="p-button-secondary p-ml-2"
        />
      </span>
    );

    return (
      /*first row - unclude sign in / registered / sign out/ watch list.. */
      <div className="container-home">
        <NavigationBarAAP />
        <div>
          <hr id="border1" align="right" />
        </div>
        {/*Home search input*/}
        <HomeSearch />
        <hr id="border2" align="right" />
        {/*drop down menu for tabView menu*/}
        <TabView id="tab-view-0">
          <TabPanel header="Home" activeIndex={1}></TabPanel>

          <TabPanel header="&nbsp;Saved" leftIcon="pi pi-heart" activeIndex={2}>
            <div id="category-0">
              <Link
                id="linkToSavedSearch"
                onClick={this.handlecLinkSave}
                to={
                  this.props.authAAP.isSignIn
                    ? "/dashboard/productsList"
                    : "/dashboard/signInToAAP"
                }
              >
                {" "}
                Click To Saved Searches!
              </Link>
            </div>
          </TabPanel>

          <TabPanel
            id="electronic-class"
            header="Electronics"
            activeIndex={this.index[2]}
            onTabChange={(e) =>
              this.setState({
                ActiveIndex: e.index,
              })
            }
          >
            <div id="category-1">
              <div className="wrapper-div">
                <h8 className="top-categories">Top Categories</h8>
                <div>
                  {" "}
                  <hr id="border-categories-div" align="left" />
                </div>
                <div>
                  <Button
                    id="Cell-Phones-link"
                    label="Cell Phones & Accessories"
                    name="Cell Phones & Accessories"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Smart-Watches-link"
                    label="Smart Watches"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Video-Games-link"
                    label="Video Games & Consoles"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Computers-Tablets-link"
                    label="Computers&Tablets & Networking"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Digital-Cameras-link"
                    label="Digital Cameras & Photo"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Camera-Drones-link"
                    label="Camera Drones"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Deals-link"
                    label="Deals"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
              </div>

              <div className="wrapper-div2">
                <h8 className="other-categories">Other Categories</h8>
                <div>
                  {" "}
                  <hr id="border-categories-div" align="left" />
                </div>
                <div>
                  <Link to="/dashboard/productByCategory">
                    <Button
                      id="iPhone-link"
                      label="iPhone"
                      onClick={this.handleClickOnSpecificCategory}
                      className="p-button-link"
                    />{" "}
                  </Link>
                </div>
                <div>
                  <Link to="/dashboard/productByCategory">
                    <Button
                      id="Samsung-link"
                      label="Samsung"
                      onClick={this.handleClickOnSpecificCategory}
                      className="p-button-link"
                    />{" "}
                  </Link>
                </div>
                <div>
                  <Link to="/dashboard/productByCategory">
                    <Button
                      id="Portable-Audio-link"
                      label="Portable Audio & Headphones"
                      onClick={this.handleClickOnSpecificCategory}
                      className="p-button-link"
                    />{" "}
                  </Link>
                </div>
                <div>
                  <Link to="/dashboard/productByCategory">
                    <Button
                      id="TV-Video-link"
                      label="TV"
                      onClick={this.handleClickOnSpecificCategory}
                      className="p-button-link"
                    />{" "}
                  </Link>
                </div>
                <div>
                  <Link to="/dashboard/productByCategory">
                    <Button
                      id="Vehicle-Electronics-link"
                      label="Vehicle Electronics & GPS"
                      onClick={this.handleClickOnSpecificCategory}
                      className="p-button-link"
                    />{" "}
                  </Link>
                </div>
                <div>
                  <Link to="/dashboard/productByCategory">
                    <Button
                      id="Smart-Home-link"
                      label="Video"
                      onClick={this.handleClickOnSpecificCategory}
                      className="p-button-link"
                    />{" "}
                  </Link>
                </div>
              </div>

              <div id="wrapper-div3"></div>
            </div>
          </TabPanel>

          <TabPanel
            id="fashion-class"
            header="Fashion"
            activeIndex={this.index[3]}
            onTabChange={(e) =>
              this.setState({
                ActiveIndex: e.index,
              })
            }
          >
            <div id="category-2">
              <div className="wrapper-div">
                <h8 className="top-categories">Top Categories</h8>
                <div>
                  {" "}
                  <hr id="border-categories-div" align="left" />
                </div>
                <div>
                  <Button
                    id="Womens-Clothing-link"
                    label="Women's Clothing"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Womens-Shoes-link"
                    label="Women's Shoes"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Mens-Clothing-link"
                    label="Men's Clothing"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Men-Shoes-link"
                    label="Men's Shoes"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Link to="/dashboard/productByCategory">
                    <Button
                      id="Watches-Parts-Accessories-link"
                      label="Accessories"
                      onClick={this.handleClickOnSpecificCategory}
                      className="p-button-link"
                    />{" "}
                  </Link>
                </div>
                <div>
                  <Button
                    id="Deals-link2"
                    label="Deals"
                    onClick={(e) => console.log("top categories - Deals2")}
                    className="p-button-link"
                  />{" "}
                </div>
              </div>

              <div className="wrapper-div2">
                <h8 className="other-categories">Other Categories</h8>
                <div>
                  {" "}
                  <hr id="border-categories-div" align="left" />
                </div>
                <div>
                  <Link to="/dashboard/productByCategory">
                    <Button
                      id="Fine-Jewelry-link"
                      label="Jewelry"
                      onClick={this.handleClickOnSpecificCategory}
                      className="p-button-link"
                    />{" "}
                  </Link>
                </div>
                <div>
                  <Button
                    id="Mens-Accessories-link"
                    label="Men's Accessories"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Womens-Handbags-Bags-link"
                    label="Women's Accessories"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Link to="/dashboard/productByCategory">
                    <Button
                      id="Kids-Clothing-Shoes-Accs-link"
                      label="Kids"
                      onClick={this.handleClickOnSpecificCategory}
                      className="p-button-link"
                    />{" "}
                  </Link>
                </div>
              </div>

              <div id="wrapper-div4"></div>
            </div>
          </TabPanel>

          <TabPanel
            header="Health & Beauty"
            activeIndex={this.index[4]}
            onTabChange={(e) =>
              this.setState({
                ActiveIndex: e.index,
              })
            }
          >
            <div id="category-3">
              <div className="wrapper-div">
                <h8 className="top-categories">Top Categories</h8>
                <div>
                  {" "}
                  <hr id="border-categories-div" align="left" />
                </div>
                <div>
                  <Button
                    id="Makeup-link"
                    label="Makeup"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Health-Care-link"
                    label="Health Care"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Link to="/dashboard/productByCategory">
                    <Button
                      id="Fragrances-link"
                      label="Fragrances"
                      onClick={this.handleClickOnSpecificCategory}
                      className="p-button-link"
                    />{" "}
                  </Link>
                </div>
                <div>
                  <Button
                    id="Nail-Care-Manicure-Pedicure-link"
                    label="Nail Care, Manicure & Pedicure"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Hair-Care-Styling-link"
                    label="Hair Care & Styling"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Deals-link3"
                    label="Deals"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
              </div>

              <div className="wrapper-div2">
                <h8 className="other-categories">Other Categories</h8>
                <div>
                  {" "}
                  <hr id="border-categories-div" align="left" />
                </div>
                <div>
                  <Button
                    id="Skin-Care-link"
                    label="Skin Care"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>

                <div>
                  <Link to="/dashboard/productByCategory">
                    <Button
                      id="Shaving-Hair-Removal-link"
                      label="Shaving & Hair Removal"
                      onClick={this.handleClickOnSpecificCategory}
                      className="p-button-link"
                    />{" "}
                  </Link>
                </div>
                <div>
                  <Link to="/dashboard/productByCategory">
                    <Button
                      id="Vision-Care-link"
                      label="Bath"
                      onClick={this.handleClickOnSpecificCategory}
                      className="p-button-link"
                    />{" "}
                  </Link>
                </div>
              </div>

              <div id="wrapper-div5"></div>
            </div>
          </TabPanel>

          <TabPanel
            header="Sports"
            activeIndex={this.index[5]}
            onTabChange={(e) =>
              this.setState({
                ActiveIndex: e.index,
              })
            }
          >
            <div id="category-3">
              <div className="wrapper-div">
                <h8 className="top-categories">Top Categories</h8>
                <div>
                  {" "}
                  <hr id="border-categories-div" align="left" />
                </div>
                <div>
                  <Button
                    id="Cycling-link"
                    label="Cycling"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Outdoor-Sports-link"
                    label="Outdoor Sports"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Hunting-link"
                    label="Hunting"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Fishing-link"
                    label="Fishing"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Fitness-Running-Yoga-link"
                    label="Fitness, Running & Yoga"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Deals-link4"
                    label="Deals"
                    onClick={(e) => console.log("top categories - Deals")}
                    className="p-button-link"
                  />{" "}
                </div>
              </div>

              <div className="wrapper-div2">
                <h8 className="other-categories">Other Categories</h8>
                <div>
                  {" "}
                  <hr id="border-categories-div" align="left" />
                </div>
                <div>
                  <Link to="/dashboard/productByCategory">
                    <Button
                      id="Tennis-link"
                      label="Tennis"
                      onClick={this.handleClickOnSpecificCategory}
                      className="p-button-link"
                    />{" "}
                  </Link>
                </div>
                <div>
                  <Link to="/dashboard/productByCategory">
                    <Button
                      id="Swimming-link"
                      label="Swimming"
                      onClick={this.handleClickOnSpecificCategory}
                      className="p-button-link"
                    />{" "}
                  </Link>
                </div>
                <div>
                  <Link to="/dashboard/productByCategory">
                    <Button
                      id="Water-Sports-link"
                      label="Water Sports"
                      onClick={this.handleClickOnSpecificCategory}
                      className="p-button-link"
                    />{" "}
                  </Link>
                </div>
              </div>

              <div id="wrapper-div6"></div>
            </div>
          </TabPanel>

          <TabPanel
            header="Home & Garden"
            activeIndex={this.index[6]}
            onTabChange={(e) =>
              this.setState({
                ActiveIndex: e.index,
              })
            }
          >
            <div id="category-3">
              <div className="wrapper-div">
                <h8 className="top-categories">Top Categories</h8>
                <div>
                  {" "}
                  <hr id="border-categories-div" align="left" />
                </div>
                <div>
                  <Button
                    id="Tool-Workshop-Equipment-link"
                    label="Tools & Workshop Equipment"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Yard-Garden-Outdoor-Living-link"
                    label="Yard, Garden & Outdoor Living"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Home-Improvement-link"
                    label="Home Improvement"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Baby-link"
                    label="Baby"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Kitchen-Dining-Bar-link"
                    label="Kitchen, Dining & Bar"
                    onClick={this.handleClick}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Deals-link5"
                    label="Deals"
                    onClick={(e) => console.log("top categories - Deals")}
                    className="p-button-link"
                  />{" "}
                </div>
              </div>

              <div className="wrapper-div2">
                <h8 className="other-categories">Other Categories</h8>
                <div>
                  {" "}
                  <hr id="border-categories-div" align="left" />
                </div>
                <div>
                  <Link to="/dashboard/productByCategory">
                    <Button
                      id="Home-Decor-link"
                      label="Home D??cor"
                      onClick={this.handleClickOnSpecificCategory}
                      className="p-button-link"
                    />{" "}
                  </Link>
                </div>
                <div>
                  <Link to="/dashboard/productByCategory">
                    <Button
                      id="Art-Craft-Supplies-link"
                      label="Art & Craft Supplies"
                      onClick={this.handleClickOnSpecificCategory}
                      className="p-button-link"
                    />{" "}
                  </Link>
                </div>
                <div>
                  <Link to="/dashboard/productByCategory">
                    <Button
                      id="Pets-Supplies-link"
                      label="Pets Supplies"
                      onClick={this.handleClickOnSpecificCategory}
                      className="p-button-link"
                    />{" "}
                  </Link>
                </div>
              </div>

              <div id="wrapper-div7"></div>
            </div>
          </TabPanel>

          <TabPanel
            header="Deals"
            activeIndex={this.index[7]}
            onTabChange={(e) =>
              this.setState({
                ActiveIndex: e.index,
              })
            }
          >
            <div id="category-3">
              <div className="wrapper-div">
                <h8 className="top-categories">Top Categories</h8>
                <div>
                  {" "}
                  <hr id="border-categories-div" align="left" />
                </div>
                <div>
                  <Button
                    id="Daily-Deals-link"
                    label="Daily Deals"
                    onClick={(e) => console.log("top categories - Daily-Deals")}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Tech-Deals-link"
                    label="Tech Deals"
                    onClick={(e) => console.log("top categories - Tech-Deals")}
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Fashion-Deals-link"
                    label="Fashion Deals"
                    onClick={(e) =>
                      console.log("top categories - Fashion-Deals")
                    }
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Health-Beauty-Deals-link"
                    label="Health and Beauty Deals"
                    onClick={(e) =>
                      console.log("top categories - Health-Beauty-Deals")
                    }
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Home-Garden-Deals-link"
                    label="Home and Garden Deals"
                    onClick={(e) =>
                      console.log("top categories - Home-Garden-Deals")
                    }
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Sporting-Goods-Deals-link"
                    label="Sporting Goods Deals"
                    onClick={(e) =>
                      console.log("top categories - Sporting-Goods-Deals")
                    }
                    className="p-button-link"
                  />{" "}
                </div>
              </div>

              <div className="wrapper-div2">
                <h8 className="other-categories">Other Categories</h8>
                <div>
                  {" "}
                  <hr id="border-categories-div" align="left" />
                </div>
                <div>
                  <Button
                    id="Cellphone-Deals-link"
                    label="Cellphone Deals"
                    onClick={(e) =>
                      console.log("top categories - Cellphone-Deals")
                    }
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Camera-Deals-link"
                    label="Camera Deals"
                    onClick={(e) =>
                      console.log("top categories - Camera-Deals")
                    }
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Watches-Deals-link"
                    label="Watches Deals"
                    onClick={(e) =>
                      console.log("top categories - Watches-Deals")
                    }
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Jewelry-Deals-link"
                    label="Jewelry Deals"
                    onClick={(e) =>
                      console.log("top categories - Jewelry-Deals")
                    }
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Tech-Free-shipping-link"
                    label="Tech with Free shipping"
                    onClick={(e) =>
                      console.log("top categories - Tech-Free-shipping")
                    }
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Fashion-Free-shipping-link"
                    label="Fashion with Free shipping"
                    onClick={(e) =>
                      console.log("top categories - Fashion-Free-shipping")
                    }
                    className="p-button-link"
                  />{" "}
                </div>
                <div>
                  <Button
                    id="Hot-week-link"
                    label="Hot trends of the week"
                    onClick={(e) => console.log("top categories - Hot-week")}
                    className="p-button-link"
                  />{" "}
                </div>
              </div>

              <div id="wrapper-div8"></div>
            </div>
          </TabPanel>
          <TabPanel
            header="Under $10"
            activeIndex={this.index[8]}
            onTabChange={(e) =>
              this.setState({
                ActiveIndex: e.index,
              })
            }
          ></TabPanel>
        </TabView>
        {this.isCategoryPageByTab()}
        {this.handleSave()}
        {/*first carousel for images soon will be read from server right now static*/}
        <div id="div_carousel-item" className="card">
          <Carousel
            id="carousel-item"
            value={this.Images}
            numVisible={1}
            numScroll={1}
            responsiveOptions={this.responsiveOptions}
            className="custom-carousel"
            circular
            autoplayInterval={5000}
            itemTemplate={this.productTemplate}
            header={""}
          />
        </div>
        {/*explore popular categories - right now static soon from server and another categories*/}
        <div id="second-title">
          <h5>Explore Popular Categories</h5>
          <br></br>
          <br></br>
          <div className="overlay1">
            <img className="img1" alt="Card" src={sneakers} />
            <Link
              onClick={this.handleClickOnSpecificCategory}
              style={{ color: "black" }}
              to={
                this.props.bugsList.bugsList.some(
                  (b) => b.bugName === "PopularCategories Bug"
                )
                  ? "/dashboard"
                  : "/dashboard/productByCategory"
              }
            >
              <div id="p_img1">Sneakers</div>
            </Link>
          </div>

          <div className="overlay2">
            <img className="img2" alt="Card" src={beauty} />
            <Link
              onClick={this.handleClickOnSpecificCategory}
              style={{ color: "black" }}
              to={
                this.props.bugsList.bugsList.some(
                  (b) => b.bugName === "PopularCategories Bug"
                )
                  ? "/dashboard"
                  : "/dashboard/productByCategory"
              }
            >
              <div id="p_img2">Beauty</div>
            </Link>
          </div>

          <div className="overlay3">
            <img className="img3" alt="Card" src={fishing} />
            <Link
              onClick={this.handleClickOnSpecificCategory}
              style={{ color: "black" }}
              to={
                this.props.bugsList.bugsList.some(
                  (b) => b.bugName === "PopularCategories Bug"
                )
                  ? "/dashboard"
                  : "/dashboard/productByCategory"
              }
            >
              <div id="p_img3">Fishing</div>
            </Link>
          </div>

          <div className="overlay4">
            <img className="img4" alt="Card" src={SmartPhone} />
            <Link
              onClick={this.handleClickOnSpecificCategory}
              style={{ color: "black" }}
              to={
                this.props.bugsList.bugsList.some(
                  (b) => b.bugName === "PopularCategories Bug"
                )
                  ? "/dashboard"
                  : "/dashboard/productByCategory"
              }
            >
              <div id="p_img4">Smartphones</div>
            </Link>
          </div>

          <div className="overlay5">
            <img className="img5" alt="Card" src={Collectibles} />
            <Link
              onClick={this.handleClickOnSpecificCategory}
              style={{ color: "black" }}
              to={
                this.props.bugsList.bugsList.some(
                  (b) => b.bugName === "PopularCategories Bug"
                )
                  ? "/dashboard"
                  : "/dashboard/productByCategory"
              }
            >
              <div id="p_img5">Collectibles</div>
            </Link>
          </div>

          <div className="overlay6">
            <img className="img6" alt="Card" src={accos} />
            <Link
              onClick={this.handleClickOnSpecificCategory}
              style={{ color: "black" }}
              to={
                this.props.bugsList.bugsList.some(
                  (b) => b.bugName === "PopularCategories Bug"
                )
                  ? "/dashboard"
                  : "/dashboard/productByCategory"
              }
            >
              <div id="p_img6">Accessories</div>
            </Link>
          </div>
        </div>
        {/*Daily deals - soon from server*/}
        <div id="third-title">
          <div id="daily_deals" onClick={(e) => console.log("Clicked 7")}>
            Daily Deals
          </div>
          <div id="div-see-all" onClick={(e) => console.log("Clicked 8")}>
            |<div id="see_all">See all</div>
            <i id="arrow" className="pi pi-arrow-right"></i>
          </div>
          <div id="div_carousel-item2" className="card">
            <Carousel
              id="carousel-item"
              value={this.Images2}
              numVisible={1}
              numScroll={1}
              responsiveOptions={this.responsiveOptions}
              className="custom-carousel"
              circular
              autoplayInterval={5000}
              itemTemplate={this.productTemplate}
              header={""}
            />
          </div>
        </div>
        {/*explore popular categories - right now static soon from server and another categories*/}
        <div id="fourth-title">
          <h5>Explore Popular Categories</h5>
          <br></br>
          <br></br>
          <div className="overlay7">
            <img className="img7" alt="Card" src={samsung} />
            <Link
              onClick={this.handleClickOnSpecificCategory}
              style={{ color: "black" }}
              to="/dashboard/productByCategory"
            >
              <div id="p_img7">Samsung</div>
            </Link>
          </div>

          <div className="overlay8">
            <img className="img8" alt="Card" src={apple} />
            <Link
              onClick={this.handleClickOnSpecificCategory}
              style={{ color: "black" }}
              to="/dashboard/productByCategory"
            >
              <div id="p_img8">Apple</div>
            </Link>
          </div>

          <div className="overlay9">
            <img className="img9" alt="Card" src={sony} />
            <Link
              onClick={this.handleClickOnSpecificCategory}
              style={{ color: "black" }}
              to="/dashboard/productByCategory"
            >
              <div id="p_img9">Sony</div>
            </Link>
          </div>

          <div className="overlay10">
            <img className="img10" alt="Card" src={xiaomi} />
            <Link
              onClick={this.handleClickOnSpecificCategory}
              style={{ color: "black" }}
              to="/dashboard/productByCategory"
            >
              <div id="p_img10">Xiaomi</div>
            </Link>
          </div>

          <div className="overlay11">
            <img className="img11" alt="Card" src={nails} />
            <Link
              onClick={this.handleClickOnSpecificCategory}
              style={{ color: "black" }}
              to="/dashboard/productByCategory"
            >
              <div id="p_img11">Nails</div>
            </Link>
          </div>

          <div className="overlay12">
            <img className="img12" alt="Card" src={nike} />
            <Link
              onClick={this.handleClickOnSpecificCategory}
              style={{ color: "black" }}
              to="/dashboard/productByCategory"
            >
              <div id="p_img12">Nike</div>
            </Link>
          </div>
        </div>
        <div>
          <hr id="border3" align="right" />
        </div>
        {/*bottom - info - Buy,sell,Tools & apps,Companies,About AAP,Stay connected...*/}
        <div className="about_bottom">
          <div id="buy">
            <h7 id="title-buy">Buy</h7>
            <div>
              {" "}
              <Button
                id="regis_bottom"
                label="Registration"
                className="p-button-link"
              />
            </div>
            <div>
              {" "}
              <Button
                id="money_back_bottom"
                label="Money Back Guarantee"
                className="p-button-link"
              />
            </div>
            <div>
              {" "}
              <Button
                id="help_bottom"
                label="Bidding & buying help"
                className="p-button-link"
              />
            </div>
            <div>
              {" "}
              <Button
                id="stores_bottom"
                label="Stores"
                className="p-button-link"
              />
            </div>
            <div>
              {" "}
              <Button
                id="guides_bottom"
                label="Guides"
                className="p-button-link"
              />
            </div>
          </div>
          <div id="sell">
            <h7 id="title-sell">Sell</h7>
            <div>
              {" "}
              <Button
                id="start_selling_bottom"
                label="Start selling"
                className="p-button-link"
              />
            </div>
            <div>
              {" "}
              <Button
                id="learn_to_sell_bottom"
                label="Learn to sell"
                className="p-button-link"
              />
            </div>
            <div>
              {" "}
              <Button
                id="business_seller_bottom"
                label="Business sellers"
                className="p-button-link"
              />
            </div>
            <div>
              {" "}
              <Button
                id="affiliates_bottom"
                label="Affiliates"
                className="p-button-link"
              />
            </div>
            <br></br>
            <br></br>
            <h7 id="Tools_apps-title">Tools & apps</h7>
            <div>
              {" "}
              <Button
                id="developers_bottom"
                label="Developers"
                className="p-button-link"
              />
            </div>
            <div>
              {" "}
              <Button
                id="security_center_bottom"
                label="Security center"
                className="p-button-link"
              />
            </div>
            <div>
              {" "}
              <Button
                id="official_time_bottom"
                label="Official time"
                className="p-button-link"
              />
            </div>
            <div>
              {" "}
              <Button
                id="site_map_bottom"
                label="Site map"
                className="p-button-link"
              />
            </div>
          </div>

          <div id="companies">
            <h7 id="companies-title">Companies</h7>
            <div>
              {" "}
              <Button
                id="classifieds_bottom"
                label="Classifieds"
                className="p-button-link"
              />
            </div>
            <div>
              {" "}
              <Button
                id="close5_bottom"
                label="Close5"
                className="p-button-link"
              />
            </div>
            <div>
              {" "}
              <Button
                id="See_all_companies_bottom"
                label="See all companies"
                className="p-button-link"
              />
            </div>
            <br></br>
            <br></br>
            <br></br>
            <h7 id="See_all_companies-title">Stay connected</h7>
            <div>
              {" "}
              <Button
                id="Blogs_bottom"
                label="Blogs"
                className="p-button-link"
              />
            </div>
            <div>
              {" "}
              <Button
                id="Facebook_bottom"
                label="Facebook"
                icon="pi pi-facebook"
                iconPos="left"
                className="p-button-link"
              />
            </div>
            <div>
              {" "}
              <Button
                id="Twitter_bottom"
                label="Twitter"
                icon="pi pi-twitter"
                iconPos="left"
                className="p-button-link"
              />
            </div>
          </div>

          <div id="about_aap">
            <h7 id="about_aaP-title">About AAP</h7>
            <div>
              {" "}
              <Button
                id="company_info_bottom"
                label="Company info"
                className="p-button-link"
              />
            </div>
            <div>
              {" "}
              <Button id="news_bottom" label="News" className="p-button-link" />
            </div>
            <div>
              {" "}
              <Button
                id="investors_bottom"
                label="Investors"
                className="p-button-link"
              />
            </div>
            <div>
              {" "}
              <Button
                id="careers_bottom"
                label="Careers"
                className="p-button-link"
              />
            </div>
            <div>
              {" "}
              <Button
                id="government_relations_bottom"
                label="Government relations"
                className="p-button-link"
              />
            </div>
            <div>
              {" "}
              <Button
                id="advertise_with_us_bottom"
                label="Advertise with us"
                className="p-button-link"
              />
            </div>
            <div>
              {" "}
              <Button
                id="policies_bottom"
                label="Policies"
                className="p-button-link"
              />
            </div>
            <div>
              {" "}
              <Button
                id="verified_rights_bottom"
                label="Verified Rights Owner (VeRO) Program"
                className="p-button-link"
              />
            </div>
          </div>

          <div id="help_contact_communtiy">
            <h7 id="Help_Contact-title">Help & Contact</h7>
            <div>
              {" "}
              <Button
                id="resolution_center_bottom"
                label="Resolution Center"
                className="p-button-link"
              />
            </div>
            <div>
              {" "}
              <Button
                id="seller_information_bottom"
                label="Seller Information Center"
                className="p-button-link"
              />
            </div>
            <div>
              {" "}
              <Button
                id="contact_us_bottom"
                label="Contact us"
                className="p-button-link"
              />
            </div>
            <br></br>
            <br></br>
            <br></br>
            <h7 id="community-title">Community</h7>
            <div>
              {" "}
              <Button
                id="announcements_bottom"
                label="Announcements"
                className="p-button-link"
              />
            </div>
            <div>
              {" "}
              <Button
                id="answer_center_bottom"
                label="Answer center"
                className="p-button-link"
              />
            </div>
            <div>
              {" "}
              <Button
                id="discussion_boards_bottom"
                label="Discussion boards"
                className="p-button-link"
              />
            </div>
            <div>
              {" "}
              <Button
                id="giving_works_bottom"
                label="Giving Works"
                className="p-button-link"
              />
            </div>
            <div>
              {" "}
              <Button
                id="groups_bottom"
                label="Groups"
                className="p-button-link"
              />
            </div>
            <div>
              {" "}
              <Button
                id="top_shared_bottom"
                label="Top Shared"
                className="p-button-link"
              />
            </div>
          </div>
        </div>
        {/*copy-right*/}
        <div id="copy-right">
          Copyright ?? 2020-2021 AAP Inc. All Rights Reserved.{" "}
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
    saveAllCategories: (categories) => dispatch(saveAllCategories(categories)),
    saveProductsByCategoryID: (productsById) =>
      dispatch(saveProductsByCategoryID(productsById)),
    saveMessage: (messageUpdate) => dispatch(saveMessage(messageUpdate)),
    saveLastChoice: (choice) => dispatch(saveLastChoice(choice)),
    saveBugsList: (bugsList) => dispatch(saveBugsList(bugsList)),
    saveUser: (user) => dispatch(saveUser(user)),
  };
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    productsByCategory: state.productsByCategory,
    authAAP: state.authAAP,
    messageUpdate: state.messageUpdate,
    choice: state.choice,
    bugsList: state.bugsList,
    auth: state.auth,
  };
};

const Home1 = connect(mapStateToProps, mapDispatchToProps)(Home);

export default connect()(Home1);
