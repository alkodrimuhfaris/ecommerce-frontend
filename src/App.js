import React from 'react';
import { BrowserRouter , Switch, Route, Link } from 'react-router-dom';
import Items from './components/Items/Item';
import Home from './components/Home/Home';

class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route path='/Items' component={Items} exact/>
          <Route path='/Home' component={Home} exact/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
