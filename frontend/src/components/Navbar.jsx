import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../css/Navbar.css';

function NavBar() {
  return (
    <Navbar bg="light" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src="/img/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
            <Nav.Link as={NavLink} to="/liked-songs">Liked Songs</Nav.Link>
            <Nav.Link as={NavLink} to="/top-artists">Top Artists</Nav.Link>
            <Nav.Link as={NavLink} to="/top-songs">Top Songs</Nav.Link>
            <Nav.Link as={NavLink} to="/explore">Explore</Nav.Link>
            <Nav.Link as={NavLink} to="/inbox">Inbox</Nav.Link>
            <Nav.Link as={NavLink} to="/forum">Forum</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
