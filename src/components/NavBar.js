import React, { Component } from 'react';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'

class NavBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      openNavbar: false,
    }
    
  }
  render(){
    return(
      <Navbar className='bg-success text-white' dark expand="md">
        <Container>
          <NavbarBrand>Tuku-Admin</NavbarBrand>
          <NavbarToggler onClick={ () => this.setState({openNavbar: !this.state.openNavbar})} />
          <Collapse isOpen={this.state.openNavbar} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href='#'>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='#'>About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='#'>Contact Us</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default NavBar;