import React, { Component } from 'react'
import { InputText } from 'primereact/inputtext';
import './style.css'
import { Dropdown } from 'primereact/dropdown';
import './DropdownDemo.css';
import { Button } from 'primereact/button';
import './ButtonDemo.css';
import './CarouselDemo.css';
import { TabView, TabPanel } from 'primereact/tabview';
import './TabViewDemo.css';
import { Carousel } from 'primereact/carousel';
import clothes2 from './img/clothes2.jpg'
import Sony from './img/sony.jpg'



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
        this.setState({ selectedCategories: e.value.name });
        console.log(e.value.name);
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
            <div className="container-home">
                <div id="first-row"> &nbsp;
          &nbsp; Hi! <a id="home_signIn" href="url">Sign in</a> or  <a id="home_register" href="url">register</a>  &nbsp;
          <a id="home_dailydeals" href="url" color="black">Daily Deals</a>  &nbsp; <a id="home_helpconatct" href="url" color="black">Help&Contact</a>
                    <a id="home_ship" href="url" color="black">Ship to</a>
                    <div className="dropDown1">
                    <Button id="watchlist" label="Watchlist" icon="pi pi-angle-down" iconPos="right" className="p-button-secondary p-button-text" />
                        <div className="dropDown-menu">
                            <div className="msg_watchlist">
                                Please&nbsp;<a id="sign-in-msg" href="url">Sign In</a>&nbsp;to view items you are watching.
                            </div>
                        </div>
                    </div>

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
                <span id="home_search" className="p-input-icon-left">
                    <i id="icon_search" className="pi pi-search" style={{ 'fontSize': '1.5em' }} />
                    <InputText id="home_search1" onChange = {this.handleSearch} placeholder="Search for anything" >
                    </InputText>
                    <Dropdown id="selecet_category" value={this.state.selectedCategories} options={this.categories} onChange={this.onCategoryChange} optionLabel="name" placeholder="All Categories" />
                    <Button id="home_Search_button" label="Search" />   
                </span>

                <hr id="border2" align="right" />
                
                <TabView id="tab-view-0">
                     <TabPanel header="Home">

                    </TabPanel>

                    <TabPanel header='&nbsp;Saved'  leftIcon="pi pi-heart">
                    </TabPanel>

                    <TabPanel id="electronic-class" header='Electronics'>
                    <div id="category-1">
                        <div className="wrapper-div">
                            <h8 className="top-categories">Top Categories</h8>
                            <div> <hr id="border-categories-div" align="left" /></div>
                            <div><Button id="Cell-Phones-link" label="Cell Phones & Accessories" className="p-button-link" /> </div>
                            <div><Button id="Smart-Watches-link" label="Smart Watches" className="p-button-link" /> </div>
                            <div><Button id="Video-Games-link" label="Video Games & Accessories" className="p-button-link" /> </div>
                            <div><Button id="Computers-Tablets-link" label="Computers & Tablets" className="p-button-link" /> </div>
                            <div><Button id="Digital-Cameras-link" label="Digital Cameras & Photo" className="p-button-link" /> </div>
                            <div><Button id="Camera-Drones-link" label="Camera Drones" className="p-button-link" /> </div>
                            <div><Button id="Deals-link" label="Deals" className="p-button-link" /> </div>
                        </div>

                        <div className="wrapper-div2">
                            <h8 className="other-categories">Other Categories</h8>
                            <div> <hr id="border-categories-div" align="left" /></div>
                            <div><Button id="iPhone-link" label="iPhone" className="p-button-link" /> </div>
                            <div><Button id="Samsung-link" label="Samsung" className="p-button-link" /> </div>
                            <div><Button id="Portable-Audio-link" label="Portable Audio & Headphones" className="p-button-link" /> </div>
                            <div><Button id="TV-Video-link" label="TV, Video & Home Audio" className="p-button-link" /> </div>
                            <div><Button id="Vehicle-Electronics-link" label="Vehicle Electronics & GPS" className="p-button-link" /> </div>
                            <div><Button id="Smart-Home-link" label="Smart Home" className="p-button-link" /> </div>
                        </div>

                        <div id="wrapper-div3">
                        </div>
                     </div>

                    </TabPanel>

                    <TabPanel id="fashion-class" header='Fashion'>

                    <div id="category-2">
                        <div className="wrapper-div">
                            <h8 className="top-categories">Top Categories</h8>
                            <div> <hr id="border-categories-div" align="left" /></div>
                            <div><Button id="Womens-Clothing-link" label="Women's Clothing" className="p-button-link" /> </div>
                            <div><Button id="Womens-Shoes-link" label="Women's Shoes" className="p-button-link" /> </div>
                            <div><Button id="Mens-Clothing-link" label="Men's Clothing" className="p-button-link" /> </div>
                            <div><Button id="Men-Shoes-link" label="Men's Shoes" className="p-button-link" /> </div>
                            <div><Button id="Watches-Parts-Accessories-link" label="Watches, Parts & Accessories" className="p-button-link" /> </div>
                            <div><Button id="Deals-link2" label="Deals" className="p-button-link" /> </div>
                        </div>

                        <div className="wrapper-div2">
                            <h8 className="other-categories">Other Categories</h8>
                            <div> <hr id="border-categories-div" align="left" /></div>
                            <div><Button id="Fine-Jewelry-link" label="Fine Jewelry" className="p-button-link" /> </div>
                            <div><Button id="Fashion-Jewelry-link" label="Fashion Jewelry" className="p-button-link" /> </div>
                            <div><Button id="Mens-Accessories-link" label="Men's Accessories" className="p-button-link" /> </div>
                            <div><Button id="Womens-Handbags-Bags-link" label="Women's Handbags & Bags" className="p-button-link" /> </div>
                            <div><Button id="Kids-Clothing-Shoes-Accs-link" label="Kids' Clothing, Shoes & Accs" className="p-button-link" /> </div>
                            <div><Button id="Smart-Home-link" label="Smart Home" className="p-button-link" /> </div>
                        </div>

                        <div id="wrapper-div4">
                        </div>
                     </div>

                    </TabPanel>

                    
                    <TabPanel header='Health & Beauty'>

                    <div id="category-3">
                        <div className="wrapper-div">
                            <h8 className="top-categories">Top Categories</h8>
                            <div> <hr id="border-categories-div" align="left" /></div>
                            <div><Button id="Makeup-link" label="Makeup" className="p-button-link" /> </div>
                            <div><Button id="Health-Care-link" label="Health Care" className="p-button-link" /> </div>
                            <div><Button id="Fragrances-link" label="Fragrances" className="p-button-link" /> </div>
                            <div><Button id="Nail-Care-Manicure-Pedicure-link" label="Nail Care, Manicure & Pedicure" className="p-button-link" /> </div>
                            <div><Button id="Hair-Care-Styling-link" label="Hair Care & Styling" className="p-button-link" /> </div>
                            <div><Button id="Deals-link3" label="Deals" className="p-button-link" /> </div>
                        </div>

                        <div className="wrapper-div2">
                            <h8 className="other-categories">Other Categories</h8>
                            <div> <hr id="border-categories-div" align="left" /></div>
                            <div><Button id="Skin-Care-link" label="Skin Care" className="p-button-link" /> </div>
                            <div><Button id="Vitamins-Dietary-Supplements-link" label="Vitamins & Dietary Supplements" className="p-button-link" /> </div>
                            <div><Button id="Shaving-Hair-Removal-link" label="Shaving & Hair Removal" className="p-button-link" /> </div>
                            <div><Button id="Vision-Care-link" label="Vision Care" className="p-button-link" /> </div>
                            <div><Button id="Bath-Body-link" label="Bath & Body" className="p-button-link" /> </div>
                            <div><Button id="Oral-Care-link" label="Oral Care" className="p-button-link" /> </div>
                        </div>

                        <div id="wrapper-div5">
                        </div>
                     </div>

                    </TabPanel>

                    <TabPanel header='Sports'>

                    <div id="category-3">
                        <div className="wrapper-div">
                            <h8 className="top-categories">Top Categories</h8>
                            <div> <hr id="border-categories-div" align="left" /></div>
                            <div><Button id="Cycling-link" label="Cycling" className="p-button-link" /> </div>
                            <div><Button id="Outdoor-Sports-link" label="Outdoor Sports" className="p-button-link" /> </div>
                            <div><Button id="Hunting-link" label="Hunting" className="p-button-link" /> </div>
                            <div><Button id="Fishing-link" label="Fishing" className="p-button-link" /> </div>
                            <div><Button id="Fitness-Running-Yoga-link" label="Fitness, Running & Yoga" className="p-button-link" /> </div>
                            <div><Button id="Deals-link4" label="Deals" className="p-button-link" /> </div>
                        </div>

                        <div className="wrapper-div2">
                            <h8 className="other-categories">Other Categories</h8>
                            <div> <hr id="border-categories-div" align="left" /></div>
                            <div><Button id="Tennis-link" label="Tennis" className="p-button-link" /> </div>
                            <div><Button id="Swimming-link" label="Swimming" className="p-button-link" /> </div>
                            <div><Button id="Water-Sports-link" label="Water Sports" className="p-button-link" /> </div>
                            <div><Button id="Winter-Sports-link" label="Winter Sports" className="p-button-link" /> </div>
                            <div><Button id="Team-Sports-link" label="Team Sports" className="p-button-link" /> </div>
                            <div><Button id="Fitness-Technology-link" label="Fitness Technology" className="p-button-link" /> </div>
                        </div>

                        <div id="wrapper-div6">
                        </div>
                     </div>

                    </TabPanel>

                    <TabPanel header='Home & Garden'>

                    <div id="category-3">
                        <div className="wrapper-div">
                            <h8 className="top-categories">Top Categories</h8>
                            <div> <hr id="border-categories-div" align="left" /></div>
                            <div><Button id="Tool-Workshop-Equipment-link" label="Tools & Workshop Equipment" className="p-button-link" /> </div>
                            <div><Button id="Yard-Garden-Outdoor-Living-link" label="Yard, Garden & Outdoor Living" className="p-button-link" /> </div>
                            <div><Button id="Home-Improvement-link" label="Home Improvement" className="p-button-link" /> </div>
                            <div><Button id="Baby-link" label="Baby" className="p-button-link" /> </div>
                            <div><Button id="Kitchen-Dining-Bar-link" label="Kitchen, Dining & Bar" className="p-button-link" /> </div>
                            <div><Button id="Lamps-Lighting-Ceiling-Fans-link" label="Lamps, Lighting & Ceiling Fans" className="p-button-link" /> </div>
                            <div><Button id="Deals-link5" label="Deals" className="p-button-link" /> </div>
                        </div>

                        <div className="wrapper-div2">
                            <h8 className="other-categories">Other Categories</h8>
                            <div> <hr id="border-categories-div" align="left" /></div>
                            <div><Button id="Home-Decor-link" label="Home Décor" className="p-button-link" /> </div>
                            <div><Button id="Home-Organization-Supplies-link" label="Home Organization Supplies" className="p-button-link" /> </div>
                            <div><Button id="Art-Craft-Supplies-link" label="Art & Craft Supplies" className="p-button-link" /> </div>
                            <div><Button id="Beads-Jewelry-Making-Supplies-link" label="Beads & Jewelry Making Supplies" className="p-button-link" /> </div>
                            <div><Button id="Art-Supplies-link" label="Art Supplies" className="p-button-link" /> </div>
                            <div><Button id="Scrapbooking-Paper-Crafts-link" label="Scrapbooking & Paper Crafts" className="p-button-link" /> </div>
                            <div><Button id="Pets-Supplies-link" label="Pets Supplies" className="p-button-link" /> </div>
                        </div>

                        <div id="wrapper-div7">
                        </div>
                     </div>

                    </TabPanel>

                    <TabPanel header='Deals'>

                    <div id="category-3">
                        <div className="wrapper-div">
                            <h8 className="top-categories">Top Categories</h8>
                            <div> <hr id="border-categories-div" align="left" /></div>
                            <div><Button id="Daily-Deals-link" label="Daily Deals" className="p-button-link" /> </div>
                            <div><Button id="Tech-Deals-link" label="Tech Deals" className="p-button-link" /> </div>
                            <div><Button id="Fashion-Deals-link" label="Fashion Deals" className="p-button-link" /> </div>
                            <div><Button id="Health-Beauty-Deals-link" label="Health and Beauty Deals" className="p-button-link" /> </div>
                            <div><Button id="Home-Garden-Deals-link" label="Home and Garden Deals" className="p-button-link" /> </div>
                            <div><Button id="Sporting-Goods-Deals-link" label="Sporting Goods Deals" className="p-button-link" /> </div>
                        </div>

                        <div className="wrapper-div2">
                            <h8 className="other-categories">Other Categories</h8>
                            <div> <hr id="border-categories-div" align="left" /></div>
                            <div><Button id="Cellphone-Deals-link" label="Cellphone Deals" className="p-button-link" /> </div>
                            <div><Button id="Camera-Deals-link" label="Camera Deals" className="p-button-link" /> </div>
                            <div><Button id="Watches-Deals-link" label="Watches Deals" className="p-button-link" /> </div>
                            <div><Button id="Jewelry-Deals-link" label="Jewelry Deals" className="p-button-link" /> </div>
                            <div><Button id="Tech-Free-shipping-link" label="Tech with Free shipping" className="p-button-link" /> </div>
                            <div><Button id="Fashion-Free-shipping-link" label="Fashion with Free shipping" className="p-button-link" /> </div>
                            <div><Button id="Hot-week-link" label="Hot trends of the week" className="p-button-link" /> </div>
                        </div>

                        <div id="wrapper-div8">
                        </div>
                     </div>

                    </TabPanel>
                    <TabPanel header='Under $10'>

                    </TabPanel>                
                </TabView>

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

              <div id="fourth-title">
                    <h5>Explore Popular Categories</h5>
                    <br></br><br></br>
                    <div  className="overlay7" onClick={e => console.log("Clicked 7")}>
                    <img className="img7" alt="Card" src={Sony}/>
                    <div id="p_img7">Sony</div></div>

                    <div  className="overlay8" onClick={e => console.log("Clicked 8")}>
                    <img className="img8" alt="Card" src={Sony}/>
                    <div id="p_img8">Sony</div></div>

                    <div  className="overlay9" onClick={e => console.log("Clicked 9")}>
                    <img className="img9" alt="Card" src={Sony}/>
                    <div id="p_img9">Sony</div></div>

                    <div  className="overlay10" onClick={e => console.log("Clicked 10")}>
                    <img className="img10" alt="Card" src={Sony}/>
                    <div id="p_img10">Sony</div></div>

                    <div  className="overlay11" onClick={e => console.log("Clicked 11")}>
                    <img className="img11" alt="Card" src={Sony}/>
                    <div id="p_img11">Sony</div></div>

                    <div  className="overlay12" onClick={e => console.log("Clicked 12")}>
                    <img className="img12" alt="Card" src={Sony}/>
                    <div id="p_img12">Sony</div></div>
                </div>

                <div>
                    <hr id="border3" align="right" />
                </div>

                <div className="about_bottom">
                    <div id="buy">
                        <h7 id="title-buy">Buy</h7>
                        <div> <Button id="regis_bottom" label="Registration" className="p-button-link" /></div>
                        <div> <Button id="money_back_bottom" label="Money Back Guarantee" className="p-button-link" /></div>
                        <div> <Button id="help_bottom" label="Bidding & buying help" className="p-button-link" /></div>
                        <div> <Button id="stores_bottom" label="Stores" className="p-button-link" /></div>
                       <div> <Button id="guides_bottom" label="Guides" className="p-button-link" /></div>
                    </div>
                     <div id="sell">
                        <h7 id="title-sell">Sell</h7>
                        <div> <Button id="start_selling_bottom" label="Start selling" className="p-button-link" /></div>
                        <div> <Button id="learn_to_sell_bottom" label="Learn to sell" className="p-button-link" /></div>
                        <div> <Button id="business_seller_bottom" label="Business sellers" className="p-button-link" /></div>
                        <div> <Button id="affiliates_bottom" label="Affiliates" className="p-button-link" /></div>
                        <br></br><br></br>
                        <h7 id="Tools_apps-title">Tools & apps</h7>
                        <div> <Button id="developers_bottom" label="Developers" className="p-button-link" /></div>
                        <div> <Button id="security_center_bottom" label="Security center" className="p-button-link" /></div>
                        <div> <Button id="official_time_bottom" label="Official time" className="p-button-link" /></div>
                        <div> <Button id="site_map_bottom" label="Site map" className="p-button-link" /></div>
                     </div>

                     <div id="companies">
                        <h7 id="companies-title">Companies</h7>
                        <div> <Button id="classifieds_bottom" label="Classifieds" className="p-button-link" /></div>
                        <div> <Button id="close5_bottom" label="Close5" className="p-button-link" /></div>
                        <div> <Button id="See_all_companies_bottom" label="See all companies" className="p-button-link" /></div>
                        <br></br><br></br><br></br>
                        <h7 id="See_all_companies-title">Stay connected</h7>
                        <div> <Button id="Blogs_bottom" label="Blogs" className="p-button-link" /></div>
                        <div> <Button id="Facebook_bottom" label="Facebook" icon="pi pi-facebook" iconPos="left" className="p-button-link" /></div>
                        <div> <Button id="Twitter_bottom" label="Twitter" icon="pi pi-twitter" iconPos="left"  className="p-button-link" /></div>
                       
                     </div>

                     <div id="about_aap">
                         <h7 id="about_aaP-title">About AAP</h7>
                         <div> <Button id="company_info_bottom" label="Company info" className="p-button-link" /></div>
                        <div> <Button id="news_bottom" label="News" className="p-button-link" /></div>
                        <div> <Button id="investors_bottom" label="Investors" className="p-button-link" /></div>
                        <div> <Button id="careers_bottom" label="Careers" className="p-button-link" /></div>
                        <div> <Button id="government_relations_bottom" label="Government relations" className="p-button-link" /></div>
                        <div> <Button id="advertise_with_us_bottom" label="Advertise with us" className="p-button-link" /></div>
                        <div> <Button id="policies_bottom" label="Policies" className="p-button-link" /></div>
                        <div> <Button id="verified_rights_bottom" label="Verified Rights Owner (VeRO) Program" className="p-button-link" /></div>
                     </div>

                     <div id="help_contact_communtiy">
                        <h7 id="Help_Contact-title">Help & Contact</h7>
                        <div> <Button id="resolution_center_bottom" label="Resolution Center" className="p-button-link" /></div>
                        <div> <Button id="seller_information_bottom" label="Seller Information Center" className="p-button-link" /></div>
                        <div> <Button id="contact_us_bottom" label="Contact us" className="p-button-link" /></div>
                        <br></br><br></br><br></br>
                        <h7 id="community-title">Community</h7>
                        <div> <Button id="announcements_bottom" label="Announcements" className="p-button-link" /></div>
                        <div> <Button id="answer_center_bottom" label="Answer center" className="p-button-link" /></div>
                        <div> <Button id="discussion_boards_bottom" label="Discussion boards" className="p-button-link" /></div>
                        <div> <Button id="giving_works_bottom" label="Giving Works" className="p-button-link" /></div>
                        <div> <Button id="groups_bottom" label="Groups" className="p-button-link" /></div>
                        <div> <Button id="top_shared_bottom" label="Top Shared" className="p-button-link" /></div>
                     
                     </div>
                  </div>
                  

                <div id="copy-right">
                Copyright © 2020-2021 AAP Inc. All Rights Reserved. <a id="User_Agreement" href="url" color="black">User Agreement</a>, 
                <a id="Privacy" href="url" color="black">Privacy</a>,
                <a id="Cookies" href="url" color="black">Cookies</a> ,
                <a id="personal_information" href="url" color="black">Do not sell my personal information</a> and <a id="AdChoice" href="url" color="black">AdChoice</a> 
                  <i id="info_circle" className="pi pi-info-circle"></i>
                </div>

              
        </div>

        )
    }
}