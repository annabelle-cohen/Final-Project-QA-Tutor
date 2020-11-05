import React, { Component } from 'react'
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { SearchIcon } from '@material-ui/icons/Search';
import './style.css'
import './listBox.css'
import { Icon } from '@material-ui/core';
import { Slider } from 'primereact/slider';


import { SplitButton } from 'primereact/splitbutton';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { ListBox } from 'primereact/listbox';

export class Home extends Component {

    constructor(props) {
        super(props);
        /*
              this.state = {
                value: ''
            };
        
              this.items = [
                  {
                      label: 'Watchlist',
                      icon: 'pi pi-fw pi-file',
                      items: [
                          {
                              label: 'New',
                              icon: 'pi pi-fw pi-plus',
                              items: [
                                  {
                                      label: 'Bookmark',
                                      icon: 'pi pi-fw pi-bookmark'
                                  },
                                  {
                                      label: 'Video',
                                      icon: 'pi pi-fw pi-video'
                                  },
        
                              ]
                          },
                          {
                              label: 'Delete',
                              icon: 'pi pi-fw pi-trash'
                          },
                          {
                              separator: true
                          },
                          {
                              label: 'Export',
                              icon: 'pi pi-fw pi-external-link'
                          }
                      ]
                  }
              ];
              */

        this.state = {
            items: [
                {
                    label: 'Update',
                    icon: 'pi pi-refresh',
                    command: (e) => {
                        this.toast.show({ severity: 'success', summary: 'Updated', detail: 'Data Updated' });
                    }
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times',
                    command: (e) => {
                        this.toast.show({ severity: 'success', summary: 'Delete', detail: 'Data Deleted' });
                    }
                },
                {
                    label: 'React Website',
                    icon: 'pi pi-external-link',
                    command: (e) => {
                        window.location.href = 'https://facebook.github.io/react/'
                    }
                },
                {
                    label: 'Upload',
                    icon: 'pi pi-upload',
                    command: (e) => {
                        window.location.hash = "/fileupload"
                    }
                }
            ]
            ,
            selectedCountries: null
        }

        this.save = this.save.bind(this);

        this.countries = [
            { name: 'Australia', code: 'AU' },
            { name: 'Brazil', code: 'BR' },
            { name: 'China', code: 'CN' },
            { name: 'Egypt', code: 'EG' },
            { name: 'France', code: 'FR' },
            { name: 'Germany', code: 'DE' },
            { name: 'India', code: 'IN' },
            { name: 'Japan', code: 'JP' },
            { name: 'Spain', code: 'ES' },
            { name: 'United States', code: 'US' }
        ];

        this.countryTemplate = this.countryTemplate.bind(this);


    }

    countryTemplate(option) {
        return (
            <div className="country-item">
                <img alt={option.name} src="showcase/demo/images/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${option.code.toLowerCase()}`} />
                <div>{option.name}</div>
            </div>
        );
    }

    save() {
        this.toast.show({ severity: 'success', summary: 'Success', detail: 'Data Saved' });
    }



    render() {

        return (
            <div>
                <div> &nbsp;
          &nbsp; Hi! <a id="home_signIn" href="url">Sign in</a> or  <a id="home_register" href="url">register</a>  &nbsp;
          <a id="home_dailydeals" href="url" color="black">Daily Deals</a>  &nbsp; <a id="home_helpconatct" href="url" color="black">Help&Contact</a>
                    <a id="home_ship" href="url" color="black">Ship to</a>
                </div>
                <Menubar>{this.items}</Menubar>

                <div>

                    <hr id="border1" align="right" />
                </div>
                <span id="home_search" className="p-input-icon-left">

                    <i id="icon_search" className="pi pi-search" style={{ 'fontSize': '1.5em' }} />

                    <InputText id="home_search1" value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })} placeholder="Search for anything" />

                    <Button id="home_Search_button" label="Search" />
                </span>


                <div>whatev</div>
                <br></br>
                <SplitButton label="Save" icon="pi pi-plus" onClick={this.save} model={this.state.items}></SplitButton>
                <br></br>
                <br></br>
                <Slider value={this.state.value} onChange={(e) => this.setState({ value: e.value })} />
                <br></br>
                <br></br>
                <div>
                    <div className="card">

                        <h5>Advanced with Templating, Filtering and Multiple Selection</h5>
                        <ListBox value={this.state.selectedCountries} options={this.countries} onChange={(e) => this.setState({ selectedCountries: e.value })} multiple filter optionLabel="name"
                            itemTemplate={this.countryTemplate} style={{ width: '15rem' }} listStyle={{ maxHeight: '250px' }} />
                    </div>
                </div>         </div>

        )
    }
}