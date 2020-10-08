import React from 'react'
import { BrowserRouter , Switch, Route, Link } from 'react-router-dom'
import Items from './components/Admin/Item'
import Home from './components/Home/Home'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import {Provider} from 'react-redux'
//Import store
import store from './redux/store'

class App extends React.Component{
  render(){
    return(
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path='/Items' component={Items} exact/>
            <Route path='/' render={(props)=><Home {...props} />} exact/>
            <Route path='/login'render={(props)=> <Login {...props} />} exact/>
            <Route path='/signup' render={(props)=> <Signup {...props} />}  exact/>

          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
