import React, { useEffect, useState } from 'react'
import { Carousel, Col, Container, Nav, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { URL } from '../helpers/helper';

export default function Home() {
    //2.1 Hooks Area
    const [businessCategory,setBusinessCategory] = useState([]);
    const [mainSlider,setMainSlider] = useState([]);


    useEffect(()=>{
        let lang = window.localStorage.getItem('lang');
        
        fetch(`${URL}/api/business-categories?locale=${lang}&populate=*`)
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            console.log(data)
            setBusinessCategory(data.data);
        })
        .catch(()=>{

        });


        fetch(`${URL}/api/website-frontend?populate[mainslidercom][populate]=*`)
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            console.log('mainslidercomponent---->',data.data.attributes.mainslidercom)
            setMainSlider(data.data.attributes.mainslidercom);
        })
        .catch(()=>{

        });


    },[]);


    //2.2


    //2.3
    return (
       <>
        <h1>Home Page</h1>
        <Row >
            <Col className="a_tbdr2 mb-5" xs={6}>
                <Carousel>
                    {
                        mainSlider && mainSlider.map((cv,idx,arr)=>{

                            return  <Carousel.Item key={idx}>
                                        {console.log(cv.business.data)}
                                        <Link to={'/detail?business_id='+ (cv.business.data !== null?cv.business.data.id:'')} >
                                            <img
                                                className="d-block w-100"
                                                src={URL+cv.image.data.attributes.url}
                                                alt="First slide"
                                            />
                                        </Link>
                                    </Carousel.Item>
                        })
                    }
                   
                </Carousel>

            </Col>
            <Col className="a_tbdr2" xs={6}>B</Col>
        </Row>
        <ul className="nav">
            {
                businessCategory && businessCategory.map((cv,idx,arr)=>{
                    return  <li key={idx} className="me-3 border rounded text-center p-2">
                                <Link className=" text-decoration-none" to={"/search?cat_name="+cv.attributes.name}>
                                    <img className="d-block" width="60" src={'http://localhost:1337'+cv.attributes.image.data.attributes.url} />
                                    {cv.attributes.name}
                                </Link>
                            </li>
                })
            }
           
            
        </ul>
       </>
    )
}
