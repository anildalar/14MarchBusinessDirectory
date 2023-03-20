import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { URL } from '../../helpers/url';

export default function Navigation() {
    //2.1 Hooks Area
    const [logo,setLogo] = useState('')

    useEffect(()=>{
        fetch(`${URL}/api/website?populate=*`)
        .then(res=>res.json())
        .then(data=>{
            console.log('Logo ------->',data.data.attributes.logo.data.attributes.url);
            setLogo(data.data.attributes.logo.data.attributes.url);
        })
        .catch(err=>err);
    },[]);
    
    //2.2
    let myLogout=()=>{
        window.localStorage.removeItem('jwt_token')
        window.location.href = '/login';
    }
    
    return (
       <>
            <Navbar bg="light" expand="lg" className="h-100">
                <Container fluid className="h-100">
                    <Navbar.Brand href="#" className="h-100 p-0 m-0 ">
                        <img
                            src={`${URL}${logo}`}
                            width="100"
                            height="100"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Link to="/" className="btn btn-link">Home</Link>
                            {
                       
                                window.localStorage.getItem('jwt_token') === null &&
                                <>
                                    <Link to="/login" className="btn btn-link">Login</Link>
                                    <Link to="/register" className="btn btn-link">Register</Link>
                                </>
                            }
                            {
                       
                                window.localStorage.getItem('jwt_token') !== null &&
                                <>
                                    <Nav.Link onClick={()=>{  myLogout()   }} className="btn btn-link">Logout</Nav.Link>
                                    <Link className="btn btn-link" to="/business_register">Register Business</Link>
                                </>
                            }
                            
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
       </>
    )
}
