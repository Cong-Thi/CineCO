import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import avatar from '../../images/saitama.webp'
import "./adminNavbar.scss";
const AdminNavbar = ({handleShow}) => {
  return (
    <>
    <Navbar bg="dark" variant="dark" expand="lg" className="nav">
      <Container fluid>
        
       
        <Navbar.Brand href="#">CineCoAdmin</Navbar.Brand>
        <Navbar.Collapse id="navbarScroll" className="nav__collapse">
        <Nav.Link to="/admin">
          <img src={avatar} alt="" className='nav__collapse__avatar'/>
        </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default AdminNavbar