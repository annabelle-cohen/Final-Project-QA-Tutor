import React, { Component} from 'react'
import './style.css'
import { Button } from 'primereact/button';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import './DropdownDemo.css';
import './ButtonDemo.css';
import './AdvancedSearch.css'
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";



export class AdvancedSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchByKeyWord: '',
            selectedDropDown:'All word,any order',
            selectedCategory:'All Categories',
            checked1: false,
            checked2: false,
            minPrice:null,
            maxPrice:null
        };

        this.dropDownOptions = [
            {name:'All word,any order'},
            {name:'Any word,any order'},
            {name:'Exact word,exact order'},
            {name:'Exact word,any order'}

        ]

        this.categories = [
            {name: 'All Categories'},
            {name: 'Art'},
            {name: 'Baby'},
            {name: 'Books'},
            {name: 'Cameras & Photos'},
            {name: 'CellPhones & Accessorise'},
            {name: 'Clothing, Shoes & Accessorise'},
            {name: 'Computers/Tablets & Networking'},
            {name:'Healthy & Beauty'},
            {name: 'Home & Garden'},
            {name: 'Jewelry & Watches'},
            {name: 'Music'},
            {name: 'Sport'},
            {name: 'Toys & Hobbies'},
            {name: 'Travel'},
            {name: 'Video Games & Consoles'}
        ];

        this.onDropDownOptionChanged = this.onDropDownOptionChanged.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
    }

    onDropDownOptionChanged = (e) =>{
        console.log(e);
        this.setState({ selectedDropDown: e.value.name });
    }

    onCategoryChange = (e) =>{
        console.log(e);
        this.setState({selectedCategory: e.value.name });
    }

    render(){

        return(
            <div>


<div id="first-row-advanced"> &nbsp;
          &nbsp; Hi! <a id="home_signIn" href="/dashboard/signInToAAP">Sign in</a> or  <a id="home_register" href="/dashboard/registerToAAP">register</a>  &nbsp;
          <a id="home_dailydeals" href="url" color="black">Daily Deals</a>  &nbsp; <a id="home_helpconatct" href="url" color="black">Help&Contact</a>
                    <a id="home_ship" href="url" color="black">Ship to</a>
    
                    {/*watchlist drop down*/}
                    <div className="dropDown1">
                    <Button id="watchlist" label="Watchlist" icon="pi pi-angle-down" iconPos="right" className="p-button-secondary p-button-text" />
                        <div className="dropDown-menu">
                            <div className="msg_watchlist">
                                Please&nbsp;<a id="sign-in-msg" href="url">Sign In</a>&nbsp;to view items you are watching.
                            </div>
                        </div>
                    </div>

                     {/*myAAP drop down*/}
                    <div className="dropDown2">
                    <Button id="My_AAP" label="My AAP" icon="pi pi-angle-down" iconPos="right" className="p-button-secondary p-button-text" />
                        <div id="myDropdown" class="dropdown_aap">
                            <a className="dropdown_aap_content" href="url">Summary</a>
                            <a className="dropdown_aap_content" href="url">Recently Viewed</a>
                            <a className="dropdown_aap_content"  href="url">Bids/offers</a>
                            <a className="dropdown_aap_content" href="url">Watchlist</a>
                            <a className="dropdown_aap_content"  href="url">Purchase History</a>
                            <a className="dropdown_aap_content"  href="url">Buy again</a>
                            <a className="dropdown_aap_content"  href="url">Selling</a>
                            <a className="dropdown_aap_content"  href="url">Saved Searches</a>
                            <a className="dropdown_aap_content"  href="url">Save  sellers</a>
                            <a className="dropdown_aap_content"  href="url">Messages</a>
                         </div>
                    </div>

                    {/*notification drop down*/}
                    <div className="dropDown3">
                        <Button id="notification"  icon="pi pi-bell"  className="p-button-secondary p-button-text" />
                             <div id="msg_notifications" class="dropdown_notofication">
                             Please&nbsp;<a id="sign-in-msg2" href="url">Sign In</a>&nbsp;to view<br></br> notification.
                             </div>
                    </div>
                </div>
                <div>
                    <hr id="border1" align="right" />
                </div>
                <div id="div-title">
                <h3 id="advanced_search">Advanced Search</h3>
            
            </div>

            <div id="bread-crumb-div">
            <ul class="breadcrumb">
                    <li><a href="/dashboard">Home</a></li>
                    <li>Advanced Search</li>
            </ul>
            </div>

            <div className="card" id="field1">
            <DataTable>
                <Column field="Items" header="Items"></Column>
            </DataTable>
            <Button id="buttons-items-column" label="Find items" className="p-button-secondary p-button-text" />
            <Button id="buttons-items-column2" label="By seller" className="p-button-secondary p-button-text" />
            <Button id="buttons-items-column3" label="By item number" className="p-button-secondary p-button-text" />
            <DataTable>
                <Column field="stores" header="Stores"></Column>
            </DataTable>
            <Button id="buttons-items-column4" label="Items in stores" className="p-button-secondary p-button-text" />
            <Button id="buttons-items-column5" label="By item number" className="p-button-secondary p-button-text" />
        </div>

        <div className="card" id="field2">
            <DataTable>
                <Column field="Items in Stores" header="Items In Stores"></Column>
            </DataTable>
            <div id="searching1" className="p-field">
            <label id="inputkeyword2">Enter keyword or item number</label>
            <br></br>
            <InputText id="inputkeyword" value={this.state.searchByKeyWord} placeholder="Enter keyword or item number" onChange={(e) => this.setState({searchByKeyWord: e.target.value})} />
            </div>
            <div id="searching2">
            <Dropdown id="dropDown1" value={this.state.selectedDropDown} options={this.dropDownOptions} onChange={this.onDropDownOptionChanged} optionLabel="name" placeholder={this.state.selectedDropDown} />
            </div>
            <div id="searching3">
                 <label id="category-select-label">In this category:</label>
                 <br></br>
                 <Dropdown id="selectedDropDown" value={this.state.selectedCategory} options={this.categories} onChange={this.onCategoryChange} optionLabel="name" placeholder={this.state.selectedCategory} />
            </div>
            <Button id="home_Search_button2" label="Search" /> 
            <hr id="border-advanced-search" align="right" />
            <div id="including-search">
            <label id="search-including-title">Search including</label>
            </div>
            <div id="checkbox1" className="p-field-checkbox">
                 <Checkbox inputId="binary" disabled={this.state.checked2?true:false} checked={this.state.checked1} onChange={e => this.setState({ checked1: e.checked })} />
                <label htmlFor="binary">Title and Description</label>
            </div>
            <div id="checkbox2"  className="p-field-checkbox">
            <Checkbox inputId="binary" disabled={this.state.checked1?true:false} checked={this.state.checked2} onChange={e => this.setState({ checked2: e.checked })} />
            <label htmlFor="binary">Completed listings</label>
            </div>
            <hr id="border-advanced-search" align="right" />
            <div id="price-search">
             <label id="price-title">Price</label>    
             </div>
             <div id="min-max-price">
             <div id="min-price">
             Show items priced from ILS 
             <InputText id="inputprice" value={this.state.minPrice} onChange={(e) => this.setState({minPrice: e.target.value})} />
             &nbsp;to ILS
             </div>

             <div id="max-price">
             <InputText id="inputprice2" value={this.state.maxPrice} onChange={(e) => this.setState({maxPrice: e.target.value})} />
             </div>
            
             </div>
             <hr id="border-advanced-search" align="right" />
             <div id="bottom-of-page">
             <Button id="home_Search_button2" label="Search" /> 
             </div>
             <div id="bottom-of-page2">
             <Button id="clearOption" label="Clear options" className="p-button-secondary p-button-text" />
             </div>
        </div>

        <div id="border-bottom">
                    <hr id="border3" align="right" />

                                    {/*copy-right*/}
                <div id="copy-right">
                Copyright © 2020-2021 AAP Inc. All Rights Reserved. <a id="User_Agreement" href="url" color="black">User Agreement</a>, 
                <a id="Privacy" href="url" color="black">Privacy</a>,
                <a id="Cookies" href="url" color="black">Cookies</a> ,
                <a id="personal_information" href="url" color="black">Do not sell my personal information</a> and <a id="AdChoice" href="url" color="black">AdChoice</a> 
                  <i id="info_circle" className="pi pi-info-circle"></i>
                </div>
        </div>

  

  
            </div>
        )
    }

}