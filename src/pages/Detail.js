import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Button, Carousel, Form } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom';
import { URL } from '../helpers/helper';

export default function Detail() {
    //2.1 Hooks area
    const [searchParams, setSearchParams] = useSearchParams();
    const [reviewPayload,setReviewPayload] = useState({
                                                            "data": {
                                                                "rate_scale": 5,
                                                                "description": "VeryGood",
                                                                "businesses": [
                                                                    1
                                                                ]
                                                            }
                                                        });

    const [busDetail,setBusDetail] = useState([]);
    const [busPhotos,setBusPhotos] = useState([]);
    const [busName,setBusName] = useState('');
    useEffect(()=>{
        
        

        //svg.addEventListener('mouseover', () => console.log('Event: mouseover'));

        console.log('hotel_id-------->',searchParams.get('hotel_id'));
        let hotelid = searchParams.get('hotel_id');
        fetch(`${URL}/api/businesses?populate=*&filters[id][$eq]=`+hotelid)
        .then(res=>res.json())
        .then(data=>{
           console.log('Hotel details-------->',data)
            if(data.data.length > 0){
                setBusName(data.data[0].attributes.name)
                setBusDetail(data.data);
                //busDetail[0].attributes.photo.data
                setBusPhotos(data.data[0].attributes.photo.data);
            }else{

            }
            
        })
        .catch(err=>{
            console.log(err);
        })
    },[]);

    //2.2
    let star = (e)=>{
        
        console.log(e.target);
        console.log(e.target.classList);
        
        let elem = e.target;
        console.log(elem.getAttribute("data-rateno"))
        setReviewPayload({
            ...reviewPayload,
            data:{
                ...reviewPayload.data,
                rate_scale:parseInt(elem.getAttribute("data-rateno")),
            }

        });
        

        elem.classList.remove('text-secondary');
        elem.classList.add("text-warning")
        
        console.log('previous sibling---->',elem.previousSibling)

    }

    let submitReview = (e)=>{
        let desc = document.querySelector('textarea.review_desc').value;
        console.log('desc',desc);
        setReviewPayload({
            ...reviewPayload,
            data:{
                ...reviewPayload.data,
                description:desc
            }

        });

    }

    //2.3
    return (
        <>
            <h1>Detail Page</h1>
            <h2>{busName}</h2>
            <Carousel className="w-75"  indicators={false}>
                {
                    busPhotos.map((cv,idx,arr)=>{
                        console.log('anilcv---->',cv);
                        return  <Carousel.Item key={idx}>
                                    <img
                                        className=" h-50"
                                        src={URL+cv.attributes.url}
                                        alt="First slide"
                                        
                                    />
                                </Carousel.Item>
                    })
                }
               
                
            </Carousel>
            <Form>
                
                <Form.Group className="mb-3 mt-5">
                    <Form.Label>
                        <FontAwesomeIcon icon={faStar} className="text-secondary fs-1 anil1" data-rateno="1" onMouseEnter={(e)=>{ star(e) }} />
                        <FontAwesomeIcon icon={faStar} className="text-secondary fs-1 anil2" data-rateno="2" onMouseEnter={(e)=>{ star(e) }}/>
                        <FontAwesomeIcon icon={faStar} className="text-secondary fs-1 anil3" data-rateno="3" onMouseEnter={(e)=>{ star(e) }}/>
                        <FontAwesomeIcon icon={faStar} className="text-secondary fs-1 anil4" data-rateno="4" onMouseEnter={(e)=>{ star(e) }} />
                        <FontAwesomeIcon icon={faStar} className="text-secondary fs-1 anil5" data-rateno="5" onMouseEnter={(e)=>{ star(e) }} />
                    </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Tell us about your experience</Form.Label>
                    <Form.Control className="review_desc form-control" as="textarea" rows={3} />
                </Form.Group>
                <Button variant="primary" type="button" onClick={(e)=>{submitReview(e) }}>
                    Submit
                </Button>
                <Button variant="primary" type="button" onClick={(e)=>{console.log(reviewPayload) }}>
                    Get Payload
                </Button>
            </Form>
        </>
    )
}
