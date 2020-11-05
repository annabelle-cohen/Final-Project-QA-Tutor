import React, { Component } from 'react'
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { SearchIcon } from '@material-ui/icons/Search';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
 import './style.css'
import { Icon } from '@material-ui/core';
import 'primeflex/primeflex.css';
import { Slider } from 'primereact/slider';
import {SplitButton} from 'primereact/splitbutton';
import {Toast } from 'primereact/toast'
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
                    this.toast.show({severity:'success', summary:'Updated', detail:'Data Updated'});
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
                command:(e) => {
                    window.location.href = 'https://facebook.github.io/react/'
                }
            },
            {   label: 'Upload',
                icon: 'pi pi-upload',
                command:(e) => {
                    window.location.hash = "/fileupload"
                }
            }
        ]
    }

    this.save = this.save.bind(this);
  }



  save() {
    this.toast.show({severity: 'success', summary: 'Success', detail: 'Data Saved'});
}



  render(){

      return (
        <SplitButton label="Save" icon="pi pi-plus" onClick={this.save} model={this.state.items}></SplitButton>
    )
  return(
        <div>
        <Slider value={this.state.value} onChange={(e) => this.setState({value: e.value})} />
        
<Slider value={this.state.rangeValues} onChange={(e) => this.setState({rangeValues: e.value})} range />
        <div> &nbsp;
        &nbsp; Hi! <a id="home_signIn" href="url">Sign in</a> or  <a id="home_register" href="url">register</a>  &nbsp; 
        <a id="home_dailydeals" href="url" color="black">Daily Deals</a>  &nbsp; <a id="home_helpconatct" href="url"  color="black">Help&Contact</a>  
        <a  id="home_ship" href="url"  color="black">Ship to</a>
        </div>
        <Menubar>{this.items}</Menubar>
   
        <div>
   
        <hr  id="border1"  align="right"/>
        </div>
        <span id="home_search" className="p-input-icon-left">
           
            <i id="icon_search" className="pi pi-search" style={{'fontSize': '1.5em'}}/>
          
            <InputText id="home_search1" value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} placeholder="Search for anything" />

            <Button id="home_Search_button" label="Search" />
        </span>
  

  <div>whatev</div>
         </div>

  )
}
}
//export default Home