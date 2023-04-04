import { faHome, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, Dropdown, ListGroup, Modal, Row } from 'react-bootstrap'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { URL } from '../helpers/helper'

import img from '../assets/img/1.png';

export default function SearchFilter() {
    //2.1 Hooks area
    const [businesses,setBusinesses] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const [star,setStar] = useState([])

    const [pagination,setPagination] = useState({})

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

    useEffect(()=>{ //After Page Load
        //Lets trake for scroll event
        //element.addEventListener(event, function, useCapture);
        //object.addEventListener("scroll", myScript);
        window.addEventListener('scroll',()=>{
            //console.log(document.documentElement);
            //destructuring
            const { scrollTop,scrollHeight, clientHeight } = document.documentElement;
            console.log('scrollTop   ---->',scrollTop);
            console.log('clientHeight---->',clientHeight);

            console.log('scrollHeight---->',scrollHeight);
            
            if (scrollTop + clientHeight >= scrollHeight - 200){ //70% bottom scroll
                //Call the page with next page
                console.log('pagination---->',pagination);

                //Lets check if we are not on the last page
                if(pagination.page<pagination.pageCount){
                    console.log('API Called************************************');
                    getBusiness(pagination.page+1);
                    ////2.2 Call the API
                    

                    //2.3 Also update the pagination meta data i.e pageNo
                    /* setPagination({
                        ...pagination,
                        page:pagination.page+1
                    }) */

                }
               /*  ; *///Overwrite
            }
        });


        let lang = window.localStorage.getItem('lang');
        console.log('cat_name-------->',searchParams.get('cat_name'));
        getBusiness();

        
        //http://localhost:1337/api/businesses?populate=*&filters[business_categories][name][$containsi]=home decore
    },[]);

    //2.2
    let getBusiness=(page=1,pageSize=10)=>{ //formal argument with default value
        fetch(`${URL}/api/businesses?populate=*&filters[business_category][name][$containsi]=${searchParams.get('cat_name')}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`)
        .then(res=>res.json())
        .then(data=>{
            console.log('data.data -------->',data.data);
            setBusinesses([
                ...businesses, // []
                ...data.data  // [{},{}]
            ]);

            setPagination(data.meta.pagination);//Overwrite
            
        })
        .catch(err=>{
            console.log(err)
        })
    }

    let getBusinessByRating = (e)=>{
        //alert('OKOKOK');
        console.log(e.target.getAttribute("data-star"));
        let star = e.target.getAttribute("data-star");
        fetch(`${URL}/api/businesses?locale=en&&filters[business_category][name][$containsi]=Hotel&filters[star][$eq]=`+star)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setBusinesses(data.data);
        })
        .catch(err=>{
            console.log(err)
        });
    }


    return (
        <>
             <Modal  size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>All Filters</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h3>Star Rating</h3>
                        <Button variant="light" data-star="5" onClick={(e)=>{ getBusinessByRating(e) }}>5 Star</Button>{' '}
                        <Button variant="light" data-star="4" onClick={(e)=>{ getBusinessByRating(e) }}>4 Start</Button>{' '}
                        <Button variant="light" data-star="3" onClick={(e)=>{ getBusinessByRating(e) }}>3 Start</Button>{' '}
                        <Button variant="light" data-star="2" onClick={(e)=>{ getBusinessByRating(e) }}>2 Start</Button>{' '}
                        <Button variant="light" data-star="1" onClick={(e)=>{ getBusinessByRating(e) }}>1 Start</Button>{' '}
                    </div>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
            <Row>
                <Col sm={12} className="">
                    <Dropdown className="float-start mt-4 mb-4 ms-1">
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                            Rating
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item data-star="5" onClick={(e)=>{ getBusinessByRating(e) }}>5 Rating</Dropdown.Item>
                            <Dropdown.Item data-star="4" onClick={(e)=>{ getBusinessByRating(e) }}>4 Rating</Dropdown.Item>
                            <Dropdown.Item data-star="3" onClick={(e)=>{ getBusinessByRating(e) }}>3 Rating</Dropdown.Item>
                            <Dropdown.Item data-star="2" onClick={(e)=>{ getBusinessByRating(e) }}>2 Rating</Dropdown.Item>
                            <Dropdown.Item data-star="1" onClick={(e)=>{ getBusinessByRating(e) }}>1 Rating</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="float-start mt-4 mb-4 ms-2">
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                            Price
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">High to Low</Dropdown.Item>
                            <Dropdown.Item href="#/action-1">Low to High</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button variant="light" className="float-end mt-4 mb-4 ms-2 "  onClick={handleShow}>All Filters</Button>
                </Col>
            </Row>
            <Row>
                <Col sm={9}>
                   
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
                                                        <Badge className="p-2 fs-4"  bg="success">{cv.attributes.star}</Badge> 
                                                        <span>
                                                                {
                                                                    star.map((cv2,idx2,arr2)=>{
                                                                        return cv2;
                                                                    })
                                                                }
                                                        </span>
                                                        <span>{cv.attributes.reviews.data.length} Rating</span>
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
