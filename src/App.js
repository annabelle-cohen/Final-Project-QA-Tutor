// import Prime-react
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import React from 'react'
import { BrowserRouter,Switch,Route} from 'react-router-dom'
import Navbar from './Layou/navbar'
import SignIn from './Auth/SignIn'
import {Home} from './Dashboard/dashboard'



function App() {
  return (
    <BrowserRouter>
      <div className="App">
         <Navbar/>
         <Switch>
           <Route exact path='/' component={Home}>
           </Route>
         </Switch>

     </div>
    </BrowserRouter>
  );
}

export default App;
