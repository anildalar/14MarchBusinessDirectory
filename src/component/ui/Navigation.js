import React, { useEffect, useState } from 'react'
import Geocode from "react-geocode";

import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { GOOGLE_MAP_KEY, URL } from '../../helpers/helper';
import { language } from 'fontawesome';

export default function Navigation() {
    //2.1 Hooks Area
    const [logo,setLogo] = useState('');
    const [address,setAddress] = useState('');

    useEffect(()=>{
        setAddress(window.localStorage.getItem('address'));
       // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
        Geocode.setApiKey(GOOGLE_MAP_KEY);

        // set response language. Defaults to english.
        Geocode.setLanguage("en");

        // set response region. Its optional.
        // A Geocoding request with region=es (Spain) will return the Spanish city.
        Geocode.setRegion("es");

        // set location_type filter . Its optional.
        // google geocoder returns more that one address for given lat/lng.
        // In some case we need one address as response for which google itself provides a location_type filter.
        // So we can easily parse the result for fetching address components
        // ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
        // And according to the below google docs in description, ROOFTOP param returns the most accurate result.
        Geocode.setLocationType("ROOFTOP");

        // Enable or disable logs. Its optional.
        Geocode.enableDebug();

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
        window.localStorage.clear()
        window.location.href = '/login';
    }
    let myLang =(e)=>{
        console.log(e.target.innerHTML);
        let x = e.target.innerHTML
        if(x === 'English'){
            console.log('Hindi');
            e.target.innerHTML = 'Hindi';
            window.localStorage.setItem('lang','hi');
            window.localStorage.setItem('langText','Hindi');
            // window.location.reload();
            
        }else{
            console.log('English')
            e.target.innerHTML = 'English';
            window.localStorage.setItem('lang','en');
            window.localStorage.setItem('langText','English');
            //window.location.reload();
        } 
        window.location.reload();
        
        
    }
   

    let detectLocation = ()=>{ //Fat Arrow function
        //alert('JIJIJIJIJ');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
            
        } else {
           
        }
    }
    let showPosition=(position)=>{
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        window.localStorage.setItem('lat',position.coords.latitude);
        window.localStorage.setItem('long',position.coords.longitude);

         // Get address from latitude & longitude.
        Geocode.fromLatLng(position.coords.latitude, position.coords.longitude ).then(res=>res.json()).then(
            (response) => {
                console.log('response--------->',response);
                if(response.results.length >0){
                    var adrr = response.results[0].formatted_address;
                    setAddress(adrr)
                    window.localStorage.setItem('address',adrr);
                    console.log(adrr);
                }else{

                    var addr = response.plus_code.compound_code;
                    setAddress(addr)
                    window.localStorage.setItem('address',addr);
                    console.log(addr);
                }
            },
            (error) => {
                
                console.error('errror -------->',JSON.stringify(error));
            }
        ).catch(err=>{
            console.error('errror -------->',JSON.stringify(err));
        });
        
        //x.innerHTML = "Latitude: " + position.coords.latitude +
       //"<br>Longitude: " + position.coords.longitude;
    }
    
    return (
       <>
            <Navbar bg="light" expand="lg" className="h-100">
                <Container fluid className="h-100">
                    <Link to="/" className="h-100 p-0 m-0 ">
                        <img
                            src={`${URL}${logo}`}
                            width="100"
                            height="100"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Link>
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
                            <Nav.Link onClick={(e)=>{  myLang(e)   }} className="btn btn-link">{window.localStorage.getItem('langText')}</Nav.Link>
                            {
                       
                                window.localStorage.getItem('jwt_token') !== null &&
                                <>

                                    <Link className="btn btn-link" to="/business_register">Register Business</Link>
                                    <Nav.Link onClick={()=>{  myLogout()   }} className="btn btn-link">Logout</Nav.Link>
                                </>
                            }
                            
                        </Nav>
                        <Form className="d-flex">
                            <Button className="btn btn-sm" onClick={()=>{ detectLocation() }}>Detect Location</Button>
                            <Form.Control
                                type="text"
                                readOnly
                                disabled
                                value={address}
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                id="demo"
                            />
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                id="demo2"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
       </>
    )
}
