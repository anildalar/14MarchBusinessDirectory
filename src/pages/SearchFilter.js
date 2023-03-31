import { faHome, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { URL } from '../helpers/helper'

import img from '../assets/img/1.png';

export default function SearchFilter() {
    //2.1 Hooks area
    const [businesses,setBusinesses] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const [star,setStar] = useState([])

    const navigate = useNavigate();

    useEffect(()=>{
        let lang = window.localStorage.getItem('lang');
        console.log('cat_name-------->',searchParams.get('cat_name'));

        fetch(`${URL}/api/businesses?populate=*&filters[business_category][name][$containsi]=${searchParams.get('cat_name')}`)
        .then(res=>res.json())
        .then(data=>{
            console.log('data.data -------->',data.data);
            setBusinesses(data.data);
            
        })
        .catch(err=>{
            console.log(err)
        })
        //http://localhost:1337/api/businesses?populate=*&filters[business_categories][name][$containsi]=home decore
    },[]);

    //2.2


    return (
        <>
            <Row>
                <Col sm={9}>
                    <h1>Search Filter</h1>
                    {
                        businesses && businesses.map((cv,idx,arr)=>{
                           return  <Card key={idx}  className="p-3 mb-4" onClick={ ()=>{ navigate("/detail?business_id="+cv.id) } }>
                                            <Row>
                                                <Col sm={3}>
                                                    {console.log('cv--->',cv)}
                                                    <Card.Img className="img-fluid" variant="top" src={img} />
                                                    
                                                </Col>
                                                <Col sm={9}>
                                                    <Card.Body>
                                                        <Card.Title>{cv.attributes.name}</Card.Title>
                                                        <Badge className="p-2 fs-4"  bg="success">3.9</Badge> 
                                                        <span>
                                                                {
                                                                    star.map((cv2,idx2,arr2)=>{
                                                                        return cv2;
                                                                    })
                                                                }
                                                        </span>
                                                        <span>5,551 Rating</span>
                                                        <Card.Text>
                                                        {cv.attributes.desc}
                                                        </Card.Text>
                                                        <a href={"tel:"+cv.attributes.phone} className="btn btn-success" onClick={(e)=>{ e.stopPropagation();  }}>{'+91-'+cv.attributes.phone  }</a>
                                                    </Card.Body>
                                                </Col>
                                            </Row>
                                                     
                                    </Card>
                        })
                    } 
                </Col>
                <Col sm={3}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Header>Featured</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            
            
        </>
        
    )
}
