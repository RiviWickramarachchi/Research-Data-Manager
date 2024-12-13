import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import AuthContext from '../context/AuthContext';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const NavigationBar =()=> {

  //console.log("state val is : "+ state)
  const {logoutUser} = useContext(AuthContext)
  const handleLogout  = (e) => {
        e.preventDefault();
        logoutUser()

    };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            {/*<Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">My Page</Nav.Link> */}
            {/*<Nav.Link as={Link} to={{ pathname: "/mypage", state: { contract: contract }}}>My Page</Nav.Link> {/*, state: state   , state: { contract: contract }*/}
            <Nav.Link as={Link} to={{ pathname: "/mypage"}}>My Page</Nav.Link>
            <Button variant="outline-success" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Container>
      </Navbar>
      {/* <br />
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <br />
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar> */}
    </>
  );
};

export default NavigationBar;