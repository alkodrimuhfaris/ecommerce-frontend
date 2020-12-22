import React from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import {Provider, connect} from 'react-redux';
import PrivateRoute from './components/Auth/PrivateRoute';
import PrivateRouteSeller from './components/Auth/PrivateRouteSeller';
import Items from './components/Admin/Item';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Profile from './components/Users/Profile';
import NavBarClient from './components/NavBarClient';
import ItemDetails from './components/Items/ItemDetails';
import Cart from './components/Users/Cart';

import authAction from './redux/actions/auth';
// Import store
import store from './redux/store';

class App extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('token')) {
      const credential = {
        token: localStorage.getItem('token'),
        isSeller: localStorage.getItem('isSeller'),
        id: localStorage.getItem('id'),
      };
      this.props.setToken(credential);
    }
  }

  componentDidUpdate() {
    if (localStorage.getItem('token')) {
      const credential = {
        token: localStorage.getItem('token'),
        isSeller: localStorage.getItem('isSeller'),
        id: localStorage.getItem('id'),
      };
      this.props.setToken(credential);
    }
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" render={(props) => <Home {...props} />} exact />
            <Route
              path="/login"
              render={(props) => <Login {...props} />}
              exact
            />
            <Route
              path="/signup"
              render={(props) => <Signup {...props} />}
              exact
            />
            <Route
              path="/NavBar"
              render={(props) => <NavBarClient {...props} />}
              exact
            />
            <Route
              path="/product/:id"
              render={(props) => <ItemDetails {...props} />}
              exact
            />
            <PrivateRouteSeller path="/admin">
              <Items />
            </PrivateRouteSeller>
            <PrivateRoute path="/cart">
              <Cart />
            </PrivateRoute>
            <PrivateRoute path="/profile">
              <Profile />
            </PrivateRoute>
            <PrivateRoute path="/address">
              <Profile />
            </PrivateRoute>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

const mapDispatchToProps = {
  setToken: authAction.setToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App
