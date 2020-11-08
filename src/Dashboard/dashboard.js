import React, { Component } from 'react'
import { InputText } from 'primereact/inputtext';
import './style.css'
import { Dropdown } from 'primereact/dropdown';
import './DropdownDemo.css';
import { Button } from 'primereact/button';
import './ButtonDemo.css';
import { TabMenu } from 'primereact/tabmenu';
import './CarouselDemo.css';
import { Carousel } from 'primereact/carousel';
import clothes2 from './img/clothes2.jpg'


export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: null,
            selectedCategories: null,
            images: require("./img/makeup.jpg")
        };



        this.categories = [
            {name: 'Art'},
            {name: 'Baby', code: 'BR'},
            {name: 'Books', code: 'CN'},
            {name: 'Cameras & Photos', code: 'EG'},
            {name: 'CellPhones & Accessorise', code: 'FR'},
            {name: 'Clothing, Shoes & Accessorise', code: 'DE'},
            {name: 'Computers/Tablets & Networking', code: 'IN'},
            {name:'Healthy & Beauty', code: 'JP'},
            {name: 'Home & Garden', code: 'ES'},
            {name: 'Jewelry & Watches', code: 'US'},
            {name: 'Music', code: 'US'},
            {name: 'Sport', code: 'US'},
            {name: 'Toys & Hobbies', code: 'US'},
            {name: 'Travel', code: 'US'},
            {name: 'Video Games & Consoles', code: 'US'}
        ];

        this.items =  [
            {label: 'Home'},
            {label: 'Saved', icon: 'pi pi-heart'},
            {label: 'Electronics'},
            {label: 'Fashion'},
            {label: 'Health & Beauty'},
            {label: 'Sports'},
            {label: 'Home & Garden'},
            {label: 'Deals'},
            {label: 'Under $10'}
        ];

        this.onCategoryChange = this.onCategoryChange.bind(this);
        //this.itemTemplate = this.itemTemplate.bind(this);
      //  this.thumbnailTemplate = this.thumbnailTemplate.bind(this);

        this.responsiveOptions = [
            {
                breakpoint: '560px',
                numVisible: 1
            }
        ];

        this.productTemplate = this.productTemplate.bind(this);
        console.log(this.state);
    }


    onCategoryChange =(e) =>{
        this.setState({ selectedCategories: e.value });
        console.log(this.state);
    }

    handleSearch = (e) => {
        this.setState({
          [e.target.search]: e.target.value
        })
        console.log(this.state);
      }




    productTemplate(product) {
        return (
            
            <div className="product-item">
                <div className="product-item-content">
                    <div className="p-mb-3">
                        <img src={`showcase/demo/images/product/${product.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.name} className="product-image" />
                    </div>
                    <div>
                        <h4 className="p-mb-1">{product.name}</h4>
                        <h6 className="p-mt-0 p-mb-3">${product.price}</h6>
                        <span className={`product-badge status-${product.inventoryStatus.toLowerCase()}`}>{product.inventoryStatus}</span>
                        <div className="car-buttons p-mt-5">
                            <Button icon="pi pi-search" className="p-button p-button-rounded p-mr-2" />
                            <Button icon="pi pi-star" className="p-button-success p-button-rounded p-mr-2" />
                            <Button icon="pi pi-cog" className="p-button-help p-button-rounded" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
  

    render() {

        const header = (
            <img id="img1" alt="Card" src={clothes2}/>
        );
        const footer = (
            <span>
                <Button label="Save" icon="pi pi-check" />
                <Button label="Cancel" icon="pi pi-times" className="p-button-secondary p-ml-2" />
            </span>
        );


        return (
            <div>
                <div id="first-row"> &nbsp;
          &nbsp; Hi! <a id="home_signIn" href="url">Sign in</a> or  <a id="home_register" href="url">register</a>  &nbsp;
          <a id="home_dailydeals" href="url" color="black">Daily Deals</a>  &nbsp; <a id="home_helpconatct" href="url" color="black">Help&Contact</a>
                    <a id="home_ship" href="url" color="black">Ship to</a>
                    <Button id="watchlist" label="Watchlist" icon="pi pi-angle-down" iconPos="right" className="p-button-secondary p-button-text" />
                    <Button id="My_AAP" label="My AAP" icon="pi pi-angle-down" iconPos="right" className="p-button-secondary p-button-text" />
                    <Button id="notification"  icon="pi pi-bell"  className="p-button-secondary p-button-text" />
                </div>
                <div>
                    <hr id="border1" align="right" />
                </div>
                <span id="home_search" className="p-input-icon-left">
                    <i id="icon_search" className="pi pi-search" style={{ 'fontSize': '1.5em' }} />
                    <InputText id="home_search1" onChange = {this.handleSearch} placeholder="Search for anything" >
                    </InputText>
                    <Dropdown id="selecet_category" value={this.state.selectedCategories} options={this.categories} onChange={this.onCategoryChange} optionLabel="name" placeholder="All Categories" />
                    <Button id="home_Search_button" label="Search" />   
                </span>

                <hr id="border2" align="right" />
                <TabMenu id="tab-menu" model={this.items} />

                <div id="div_carousel-item" className="card">
                    <Carousel id="carousel-item"  value={this.state.images} numVisible={3} numScroll={1} responsiveOptions={this.responsiveOptions} className="custom-carousel" circular
                        autoplayInterval={3000} itemTemplate={this.productTemplate} header={""} />
                </div>

                <div id="second-title">
                    <h5>Explore Popular Categories</h5>
                    <br></br><br></br>
                    <div  className="overlay1" onClick={e => console.log("Clicked 1")}>
                    <img className="img1" alt="Card" src={clothes2}/>
                    <div id="p_img1">Clothes</div></div>

                    <div  className="overlay2" onClick={e => console.log("Clicked 2")}>
                    <img className="img2" alt="Card" src={clothes2}/>
                    <div id="p_img2">Clothes</div></div>

                    <div  className="overlay3" onClick={e => console.log("Clicked 3")}>
                    <img className="img3" alt="Card" src={clothes2}/>
                    <div id="p_img3">Clothes</div></div>

                    <div  className="overlay4" onClick={e => console.log("Clicked 4")}>
                    <img className="img4" alt="Card" src={clothes2}/>
                    <div id="p_img4">Clothes</div></div>

                    <div  className="overlay5" onClick={e => console.log("Clicked 5")}>
                    <img className="img5" alt="Card" src={clothes2}/>
                    <div id="p_img5">Clothes</div></div>

                    <div  className="overlay6" onClick={e => console.log("Clicked 6")}>
                    <img className="img6" alt="Card" src={clothes2}/>
                    <div id="p_img6">Clothes</div></div>
                </div>

                <div id="third-title">
                    <div id="daily_deals" onClick={e => console.log("Clicked 7")}>Daily Deals</div>
                    <div id="div-see-all" onClick={e => console.log("Clicked 8")}>|
                        <div id="see_all">See all</div>
                        <i id="arrow" className="pi pi-arrow-right"></i>
                    </div>
                    <div id="div_carousel-item2" className="card">
                    <Carousel  id="carousel-item"   value={this.state.images} numVisible={3} numScroll={3} responsiveOptions={this.responsiveOptions}
                        itemTemplate={this.productTemplate} header={""} />
                   </div>
                </div>
           
        </div>

        )
    }
}