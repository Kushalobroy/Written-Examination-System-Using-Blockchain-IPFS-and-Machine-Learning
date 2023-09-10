import React from "react";
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
function Ahome() {
  return (
    <>  
       <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="#">Admin</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Evaluator</Nav.Link>
              <Nav.Link href="#">Stdudent</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid>
        
      </Container>
    </div>

    </>
  );
}

export default Ahome;