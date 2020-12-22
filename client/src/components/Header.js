import React from 'react';
import { Form, Navbar, Button,FormControl,NavDropdown,Nav } from "react-bootstrap";
const Header = () => {
    return (
<Navbar bg="secondary" expand="lg">
  <Navbar.Brand href="/Main">Post APP</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/map">ARCGIS demo</Nav.Link>
      <Nav.Link href="/Leafletmap">Leafletmap demo</Nav.Link>
    </Nav>
    <Nav.Link href="/Login">Logout</Nav.Link>
  </Navbar.Collapse>
</Navbar>
    );
};

export default Header;