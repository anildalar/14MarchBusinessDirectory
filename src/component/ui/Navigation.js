import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { URL } from '../../helpers/url';

export default function Navigation() {
    //2.1 Hooks Area
    const [logo,setLogo] = useState('')
    let x=document.getElementById("demo");;
    useEffect(()=>{
       // console.log('google -------->',google);

        //var latlng = new window.google.maps.LatLng(24.45558, 74.8857875);
        //console.log('latlng------>',latlng);

        fetch(`${URL}/api/website?populate=*`)
        .then(res=>res.json())
        .then(data=>{
            console.log('Logo ------->',data.data.attributes.logo.data.attributes.url);
            setLogo(data.data.attributes.logo.data.attributes.url);
        })
        .catch(err=>err);
    },[]);
    
    //2.2 function defination area
    let myLogout=()=>{
        window.localStorage.removeItem('jwt_token')
        window.location.href = '/login';
    }
    /* let getReverseGeocodingData=(lat, lng)=>{
        var latlng = new google.maps.LatLng(lat, lng);
        // This is making the Geocode request
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status !== google.maps.GeocoderStatus.OK) {
                alert(status);
            }
            // This is checking to see if the Geoeode Status is OK before proceeding
            if (status == google.maps.GeocoderStatus.OK) {
                console.log(results);
                var address = (results[0].formatted_address);
            }
        });
    } */

    let detectLocation = ()=>{ //Fat Arrow function
        //alert('JIJIJIJIJ');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
            
        } else {
            x.value = "Geolocation is not supported by this browser.";
          }
    }
    let showPosition=(position)=>{
        console.log(position)
        x.value = 'Indira Nagar Neemuch'; 
        //x.innerHTML = "Latitude: " + position.coords.latitude +
       //"<br>Longitude: " + position.coords.longitude;
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
                            <Button className="btn btn-sm" onClick={()=>{ detectLocation() }}>Detect Location</Button>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                id="demo"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
       </>
    )
}
