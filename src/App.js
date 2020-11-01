import React from 'react'
import { BrowserRouter,Switch,Route} from 'react-router-dom'
import Navbar from './Layou/navbar'
import SignIn from './Auth/SignIn'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
         <Navbar/>
         <Switch>
           <Route exact path='/' component={SignIn}>
           </Route>
         </Switch>

     </div>
    </BrowserRouter>
  );
}

export default App;
