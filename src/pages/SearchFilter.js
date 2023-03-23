import { faHome, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import { URL } from '../helpers/helper'

export default function SearchFilter() {
    //2.1
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(()=>{
        console.log('cat_name-------->',searchParams.get('cat_name'));

        fetch(`${URL}/api/businesses?populate=*&filters[business_categories][name][$containsi]=${searchParams.get('cat_name')}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
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
                    <Card className="p-3">
                        <Row>
                            <Col sm={3}>
                                <Card.Img className="img-fluid" variant="top" src="https://content.jdmagicbox.com/comp/neemuch/m8/9999p7423.7423.180810231848.x2m8/catalogue/lassi-makhan-da-dhaba-mahagarh-neemuch-restaurants-62b1deki5v.jpg?w=640&q=75%20640w" />
                            </Col>
                            <Col sm={9}>
                                <Card.Body>
                                    <Card.Title>Lassi Makhan Da Dhaba</Card.Title>
                                    <Badge className="p-2 fs-4"  bg="success">3.9</Badge> 
                                    <span>
                                            <FontAwesomeIcon icon={faStar} className="text-warning" />
                                            <FontAwesomeIcon icon={faStar} className="text-warning" />
                                            <FontAwesomeIcon icon={faStar} className="text-warning" />
                                            <FontAwesomeIcon icon={faStar} className="text-secondary" />
                                            <FontAwesomeIcon icon={faStar} className="text-secondary" />
                                    </span>
                                    <span>5,551 Rating</span>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                    </Card.Text>
                                    <Button className="btn btn-success" >Show Number</Button>
                                </Card.Body>
                            </Col>
                        </Row>                
                    </Card>  
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
