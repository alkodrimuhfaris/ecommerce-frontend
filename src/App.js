import React from 'react';
import { BrowserRouter , Switch, Route, Link } from 'react-router-dom';
import Items from './components/Items/Item';

class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Items} exact/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
