// import Prime-react
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './Dashboard/flag.css'
import React from 'react'
import { BrowserRouter,Switch,Route} from 'react-router-dom'
import Navbar from './Layou/navbar'
import SignIn from './Auth/SignIn'
import About from './Auth/About'
import {Home} from './Dashboard/dashboard'
import {  SignInToAAP  } from './Dashboard/SignInToAAP'
import {  RegisterToAAP  } from './Dashboard/RegisterToAAP'
import { businessRegister } from './Dashboard/businessRegister'
import { AdvancedSearch } from './Dashboard/AdvancedSearch'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
         <Switch>
           <Route exact path='/' component={SignIn}/>
           <Route exact path='/dashboard' component={Home}/>
           <Route exact path='/signIn' component={SignIn}/>
           <Route exact path='/dashboard/signInToAAP' component={ SignInToAAP }/>
           <Route exact path='/dashboard/registerToAAP' component={ RegisterToAAP }/>
           <Route exact path='/dashboard/advanced' component={ AdvancedSearch }/>
           <Route exact path='/dashboard/registerToAAP/businessregister' component={ businessRegister }/>
           <Route path='/about' component={About}/>
         </Switch>
     </div>
    </BrowserRouter>

  );
}

export default App;
