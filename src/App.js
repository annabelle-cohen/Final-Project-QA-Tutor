// import Prime-react
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import React from 'react'
import { BrowserRouter,Switch,Route} from 'react-router-dom'
import Navbar from './Layou/navbar'
import SignIn from './Auth/SignIn'
import About from './Auth/About'
import {Home} from './Dashboard/dashboard'



function App() {
  return (
    <BrowserRouter>
      <div className="App">
         <Navbar/>
         <Switch>
           <Route exact path='/' component={SignIn}/>
           <Route exact path='/dashboard' component={Home}/>
           <Route exact path='/signIn' component={SignIn}/>
           <Route path='/about' component={About}/>      
         </Switch>

     </div>
    </BrowserRouter>
  );
}

export default App;
