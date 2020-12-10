import React, { Component} from 'react'
import './style.css'
import { Button } from 'primereact/button';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { RadioButton } from 'primereact/radiobutton';
import  NavigationBarAAP  from './NavigationBarAAP';
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
            selectedIncludeOrExclude:'Include',
            sellerName:'',
            selectedCategorySeller: false,
            checked1: false,
            checked2: false,
            checkedNew:false,
            checkedUsed:false,
            visibility:true,
            headerTitle:"Find item",
            HeaderTitle2:'',
            itemNumber:'',
            checkedNotSpecified:false,
            checkedBuyingFormat:false,
            checkedBuyingFormatNow:false,
            checkShowItemFrom:false,
            minPrice:null,
            maxPrice:null
        };
        
        this.category = [{name: 'Specific sellers (enter seller\'s user IDs)', key: 'A'}];

        this.dropDownOptions = [
            {name:'All word,any order'},
            {name:'Any word,any order'},
            {name:'Exact word,exact order'},
            {name:'Exact word,any order'}

        ]

        this.dropDownOption2 = [
            {name:'Include'},
            {name:'Exclude'}
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
        this.onDropDownOption2Changed = this.onDropDownOption2Changed.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
    }

    handleClearOptions = (e) =>{
        this.setState({searchByKeyWord: ''}) 
        this.setState({selectedDropDown:'All word,any order'})
        this.setState({selectedCategory:'All Categories'})
        this.setState({checked1: false})
        this.setState({checked2: false}) 
        this.setState({minPrice:''})
        this.setState({maxPrice:''}) 
        this.setState({checkedNew:false})
        this.setState({checkedUsed:false}) 
        this.setState({checkedNotSpecified:false})
        this.setState({checkedBuyingFormat:false}) 
        this.setState({checkedBuyingFormatNow:false})
        this.setState({checkShowItemFrom:false}) 
        this.setState({selectedIncludeOrExclude:'Include'})
        this.setState({sellerName:''}) 

    }
    onDropDownOptionChanged = (e) =>{
        console.log(e);
        this.setState({ selectedDropDown: e.value.name });
    }

    onDropDownOption2Changed = (e) =>{
        console.log(e);
        this.setState({  selectedIncludeOrExclude: e.value.name });
    }

    onCategoryChange = (e) =>{
        console.log(e);
        this.setState({selectedCategory: e.value.name });
    }
    handleScrollToStats = () => {
        this.setState({  headerTitle:"Find item"})
        this.setState({ visibility:true})
        window.scrollTo({
            top: 0
        })
   }

    handleScrollToStats2 = () => {
        this.setState({  headerTitle:"Find item"})
        this.setState({ visibility:true});
        setTimeout(() => {
        window.scrollTo({
            top: 700
        })
    },50);

       
   }

    render(){

        return(
            <div>


                <div id="first-row-advanced"> 
                <NavigationBarAAP/>
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
            <Button id="buttons-items-column" label="Find items" onClick={this.handleScrollToStats} className="p-button-secondary p-button-text" />
     
            <Button id="buttons-items-column2" label="By seller" onClick={this.handleScrollToStats2} className="p-button-secondary p-button-text" />
       
            <Button id="buttons-items-column3" label="By item number" onClick={(e) => this.setState({visibility:false},this.setState({headerTitle2:"Search by item number"}))} className="p-button-secondary p-button-text" />
            <DataTable>
                <Column field="stores" header="Stores"></Column>
            </DataTable>
            <Button id="buttons-items-column4" label="Items in stores" onClick={(e) => this.setState({visibility:true} ,this.setState({headerTitle:"Items in stores"}))} className="p-button-secondary p-button-text" />
            <Button id="buttons-items-column5" label="By item number" onClick={(e) => this.setState({visibility:false} ,this.setState({headerTitle2:"Find Stores"}))}  className="p-button-secondary p-button-text" />
        </div>

        <div style={{display:this.state.visibility?"block":"none"}} className="card" id="field2">
            <DataTable>
                <Column field={this.state.headerTitle} header={this.state.headerTitle}></Column>
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
                <label htmlFor="binary" style={{color:this.state.checked2? "gray":"black" }}>Title and Description</label>
            </div>
            <div id="checkbox2"  className="p-field-checkbox">
            <Checkbox inputId="binary1" disabled={this.state.checked1?true:false} checked={this.state.checked2} onChange={e => this.setState({ checked2: e.checked })} />
            <label htmlFor="binary1" style={{color:this.state.checked1? "gray":"black" }}>Completed listings</label>
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
             <div id="buying_format">

            <label id="buying_format_title">Buying formats</label>
            </div>
            <div id="checkbox3" className="p-field-checkbox">
                 <Checkbox inputId="binary2"  checked={this.state.checkedBuyingFormat} onChange={e => this.setState({ checkedBuyingFormat: e.checked })} />
            <label htmlFor="binary2" className="checkBoxTitle">Auction</label>
            </div>

            <div id="checkbox4" className="p-field-checkbox">
                 <Checkbox inputId="binary3"  checked={this.state.checkedBuyingFormatNow} onChange={e => this.setState({ checkedBuyingFormatNow: e.checked })} />
            <label htmlFor="binary3" className="checkBoxTitle">Buy It Now</label>
            </div>
            <hr id="border-advanced-search" align="right" />
            <div id="buying_format">
            <label id="condition_title">Condition</label>
            </div>
            
            <div id="checkbox5" className="p-field-checkbox"> 
                 <Checkbox  id="checkNew" inputId="binary4" disabled={this.state.checkedUsed|this.state.checkedNotSpecified?true:false} checked={this.state.checkedNew} onChange={e => this.setState({ checkedNew: e.checked })} />
                <label htmlFor="binary4" style={{color:this.state.checkedUsed|this.state.checkedNotSpecified? "gray":"black" }}>New</label>
            </div>

            <div id="checkbox6"  className="p-field-checkbox">
            <Checkbox inputId="binary5" disabled={this.state.checkedNew|this.state.checkedNotSpecified?true:false} checked={this.state.checkedUsed} onChange={e => this.setState({checkedUsed: e.checked })} />
            <label htmlFor="binary5" style={{color:this.state.checkedNew|this.state.checkedNotSpecified? "gray":"black" }}>Used</label>
            </div>

            <div id="checkbox7"  className="p-field-checkbox">
            <Checkbox inputId="binary6" disabled={this.state.checkedNew|this.state.checkedUsed?true:false} checked={this.state.checkedNotSpecified} onChange={e => this.setState({ checkedNotSpecified: e.checked })} />
            <label htmlFor="binary6" style={{color:this.state.checkedNew|this.state.checkedUsed? "gray":"black" }}>Not Specified</label>
            </div>

            <hr id="border-advanced-search" align="right" />
            
            <div id="sellers">
            <label id="sellers_title">Sellers</label>
            </div>

            
            <div id="checkbox8"  className="p-field-checkbox">
            <Checkbox inputId="binary7"  checked={this.state.checkShowItemFrom} onChange={e => this.setState({ checkShowItemFrom: e.checked })} />
            <label htmlFor="binary7" style={{color:"black" }}>Only show items from:</label>
            </div>

            <div id="radio-button-seller" className="p-field-radiobutton">
                <RadioButton id="radio-button" inputId="seller" name="seller" value={this.selectedCategorySeller} checked={this.state.checkShowItemFrom?true:false} disabled={this.state.checkShowItemFrom?false:true}/>
                <label style={{color:this.state.checkShowItemFrom?"black":"gray"}} htmlFor="seller">Specific sellers (enter seller's user IDs)</label>
            </div>
            <div>
            <div id="selectIncludeOrExclude">
                 <Dropdown id="selectedDropDownIncludeExclude" disabled={this.state.checkShowItemFrom?false:true} value={this.state.selectedIncludeOrExclude} options={this.dropDownOption2} onChange={this.onDropDownOption2Changed} optionLabel="name" placeholder={this.state.selectedIncludeOrExclude} />
            </div>

            <div id="inputSellerId">
                    <InputText id="inputSellerName" disabled={this.state.checkShowItemFrom?false:true} value={this.state.sellerName} onChange={(e) => this.setState({sellerName: e.target.value})} />
            </div>
            </div>

            <hr id="border-advanced-search" align="right" />
             <div id="bottom-of-page">
             <Button id="home_Search_button2" label="Search" /> 
             </div>
             <div id="bottom-of-page2">
             <Button id="clearOption" label="Clear options" onClick={this.handleClearOptions} className="p-button-secondary p-button-text" />
             </div>
        </div>

        <div style={{display:this.state.visibility?"none":"block"}} className="card" id="field3">
        <DataTable>
                <Column field={this.state.headerTitle2} header={this.state.headerTitle2}></Column>
        </DataTable>

        <div id="searching" className="p-field">
            <label id="inputItemNumber-label">{this.state.headerTitle2 === "Find Stores"? "Enter Store name or keywords":"Enter item number"}</label>
            <br></br>
            <InputText id="inputItemNumber" value={this.state.itemNumber}  onChange={(e) => this.setState({itemNumber: e.target.value})} />
            </div>

               <div id="radio-button-item-list" className="p-field-radiobutton">
                <RadioButton id="radio-button" inputId="item-listing" name="item-list" checked={true} />
                <label style={{color:"black"}} htmlFor="item-listing">Find item listing</label>
            </div>    
            
            <hr id="border-advanced-search" align="right" />
            <div id="bottom-of-page">
             <Button id="home_Search_button2" label="Search" /> 
             </div>
        </div>

        <div id="border-bottom" style={{marginTop:this.state.visibility?1200+'px':500+'px'}}>
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