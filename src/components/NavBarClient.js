import React from 'react';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Form,
  FormGroup,
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import brandIcon from '../Assets/icons/icon.svg'
import {ReactComponent as SearchIcon} from '../Assets/icons/searchIcon.svg'
import {ReactComponent as CartIcon} from '../Assets/icons/shopping-cart.svg'

class NavbarClient extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      openNavbar: false,
      searchVal: '',
      queryPage: {}
    }
  }

  searchHandle = (event) => {
    this.setState({
      searchVal: event.target.value,
    })
  }

  searchSubmit = (event) => {
    event.preventDefault()
    let queryPage = {
     ...this.props.queryPage,
     search: this.state.searchVal
    }
  }

  render(){
    return(
      <Navbar className='bg-white text-dark shadow p-3 mb-5' light expand="md">
        <Container>
            <NavbarBrand className='w-25'><img src={brandIcon} className="img-fluid" alt="logo" /></NavbarBrand>
            <InputGroup className='w-50 mr-auto'>
              <Input name='search' id='search' value={this.state.searchVal} onChange={this.searchHandle} />
              <InputGroupAddon outline color='secondary' addonType="append"><Button outline color='success' type='submit' onClick={this.searchSubmit}><SearchIcon /></Button></InputGroupAddon>
            </InputGroup>
            <NavbarToggler onClick={ () => this.setState({openNavbar: !this.state.openNavbar})} />
            <Collapse isOpen={this.state.openNavbar} navbar>
              <Nav className="ml-auto" navbar>
                <Router>
                  <NavItem>
                    <NavLink className='mx-2 my-1' href='#'><CartIcon /></NavLink>
                  </NavItem>
                  <NavItem>
                    <Button className='mx-2 my-1' color='success' href='#'>Login</Button>
                  </NavItem>
                  <NavItem>
                    <Button className='mx-2 my-1' outline color='secondary' href='#'>Signup</Button>
                  </NavItem>
                </Router>
              </Nav>
            </Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default NavbarClient