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
import Sony from "./img/sony.jpg";
import { Link, Route, NavLink } from "react-router-dom";
import NavigationBarAAP from "./NavigationBarAAP";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { saveAllCategories } from "../Actions/allCategoriesAAP";
import { saveProductsByCategoryID } from "../Actions/productByCategoryIDAAP";

class HomeSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: null,
      selectedCategories: "All Categories",
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

    this.onCategoryChange = this.onCategoryChange.bind(this);
  }
  onCategoryChange = (e) => {
    this.setState({ selectedCategories: e.value.name });
    console.log(e.value.name);
  };

  handleSearch = (e) => {
    this.setState({
      [e.target.search]: e.target.value,
    });
    console.log(this.state);
  };

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
          <Button id="home_Search_button" label="Search" />
          <Link to="/dashboard/advanced" id="advanced">
            Advanced
          </Link>
        </span>
      </div>
    );
  }
}

export default HomeSearch;
