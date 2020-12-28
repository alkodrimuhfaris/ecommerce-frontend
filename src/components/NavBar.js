import React, {Component} from 'react';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import {BrowserRouter as Router, Link} from 'react-router-dom';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openNavbar: false,
    };
  }

  render() {
    return (
      <Navbar className="text-white" dark expand="md">
        <Container>
          <NavbarBrand>Tuku-Admin</NavbarBrand>
          <NavbarToggler
            onClick={() => {
              this.setState((prevState) => ({
                ...prevState,
                openNavbar: prevState.openNavbar,
              }));
            }}
          />
          <Collapse isOpen={this.state.openNavbar} navbar>
            <Nav className="ml-auto" navbar>
              <Router>
                <NavItem>
                  <Link to="/Home">Home</Link>
                </NavItem>
                <NavItem>
                  <NavLink href="#">About</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Contact Us</NavLink>
                </NavItem>
              </Router>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;
