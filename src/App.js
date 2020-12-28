/* eslint-disable no-undef */
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider, connect} from 'react-redux';
import {Helmet} from 'react-helmet';
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
import SearchPage from './components/Items/SearchItem';

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
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            Tuku! Shopping online with trusted seller! Shopping? Nengdi Wae!
          </title>
        </Helmet>
        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              render={(props) => (
                <>
                  <Helmet>
                    <meta charSet="utf-8" />
                    <title>
                      Home || Tuku! Shopping online with trusted seller!
                      Shopping? Nengdi Wae!
                    </title>
                  </Helmet>
                  <Home {...props} />
                </>
              )}
              exact
            />
            <Route
              path="/login"
              render={(props) => (
                <>
                  <Helmet>
                    <meta charSet="utf-8" />
                    <title>Login || Tuku!</title>
                  </Helmet>
                  <Login {...props} />
                </>
              )}
              exact
            />
            <Route
              path="/signup"
              render={(props) => (
                <>
                  <Helmet>
                    <meta charSet="utf-8" />
                    <title>Sign Up || Tuku!</title>
                  </Helmet>
                  <Signup {...props} />
                </>
              )}
              exact
            />
            <Route
              path="/product/:id"
              render={(props) => <ItemDetails {...props} />}
              exact
            />
            <Route
              path="/search"
              render={(props) => <SearchPage {...props} />}
              exact
            />
            <PrivateRouteSeller path="/admin">
              <>
                <Helmet>
                  <meta charSet="utf-8" />
                  <title>Admin || Tuku!</title>
                </Helmet>
                <Items />
              </>
            </PrivateRouteSeller>
            <PrivateRoute path="/cart">
              <>
                <Helmet>
                  <meta charSet="utf-8" />
                  <title>Cart || Tuku!</title>
                </Helmet>
                <Cart />
              </>
            </PrivateRoute>
            <PrivateRoute path="/profile">
              <>
                <Helmet>
                  <meta charSet="utf-8" />
                  <title>Profile || Tuku!</title>
                </Helmet>
                <Profile />
              </>
            </PrivateRoute>
            <PrivateRoute path="/address">
              <>
                <Helmet>
                  <meta charSet="utf-8" />
                  <title>Address || Tuku!</title>
                </Helmet>
                <Profile />
              </>
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
