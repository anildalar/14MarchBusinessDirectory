//1. Import Area
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Button, Carousel, Col, Form, Modal, Row } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom';

import { URL } from '../helpers/helper';
import parse from 'html-react-parser';
import swal from 'sweetalert';

//2 Definatio Area
export default function Detail() {
    //2.1 Hooks area
    const [content,setContent] = useState('');
    const [mobno, setMobno] = useState("");
    const [businessid,setBusinessid] = useState('')
    const [show, setShow] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [reviewPayload,setReviewPayload] = useState({
                                                            "data": {
                                                                "rate_scale": 5,
                                                                "description": "VeryGood",
                                                                "business": [
                                                                    1
                                                                ],
                                                                "users_permissions_user": 2
                                                            }
                                                        });
    const [busDetail,setBusDetail] = useState([]);
    const [busPhotos,setBusPhotos] = useState([]);
    const [busName,setBusName] = useState('');
    
    
    //On page load
    useEffect(()=>{
        document.addEventListener("click", async function(e){
           // const target = e.target.closest("#"); // Or any other selector.
            console.log(e.target.classList.contains("anilupload"))

            if(e.target.classList.contains("anilfile")){
                //alert('OK');
                e.target.setAttribute("onChange", function ani(e){
                    //let file = this.files[0];
                    console.log('file', e.target)
                });
            }
            if(e.target.classList.contains("anilupload")){
                //alert('Yes you can upload the file now');
                const file = '';
                const form = new FormData();
                form.append('files', file);
            
                const response = await fetch('http://localhost:1337/api/upload', {
                    method: 'post',
                    body: form,
                });
            }
        }); 


        let lang = window.localStorage.getItem('lang');
        setMobno(window.localStorage.getItem('mobno'));
        setReviewPayload({
            ...reviewPayload,
            data:{
                ...reviewPayload.data,
                users_permissions_user: parseInt(window.localStorage.getItem('user_id'))
            }

        });
        

        //svg.addEventListener('mouseover', () => console.log('Event: mouseover'));

        console.log('business_id-------->',searchParams.get('business_id'));
        //let businessid = searchParams.get('business_id');
        setBusinessid(searchParams.get('business_id'));
        fetch(`${URL}/api/businesses?locale=${lang}&populate=*&filters[id][$eq]=`+businessid)
        .then(res=>res.json())
        .then(data=>{
           console.log('business details-------->',data)
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
    const handleClose = () => setShow(false);
    function readURL(input) {
        alert('Heyyyyyyy!!!!');
        //console.log(input);
       // var url = input.value;
        //var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
        /* if (input.files && input.files[0]&& (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
            var reader = new FileReader();
        
            reader.onload = function (e) {
                $('#img').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
        else{
             $('#img').attr('src', '/assets/no_preview.png');
        } */
    }
    const handleShow = (action) => {
        //Function body
      
        if(action==='enquiry'){
            setContent( `<Row className="p-5">
                            <Col xs={7}>
                                <h3>Are you looking for?</h3>
                                <Form className="model-content-form">
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="" value={window.localStorage.getItem('fname')+" "+window.localStorage.getItem('mname')+" "+window.localStorage.getItem('lname')} />
                                    
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Mobile No.</Form.Label>
                                        <Form.Control type="text" placeholder=""  value={mobno} onChange={(e) => setMobno(e.target.value)} />
                                    
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="" value={window.localStorage.getItem('email')} />
                                    
                                    </Form.Group>

                                    <Button variant="primary" type="button" onClick={(e)=>{ submitEnquiry(e) }}>
                                        Send Enquiry
                                    </Button>
                                </Form>
                            </Col>
                            <Col xs={5}>2</Col>
                        </Row>`);
        }else if(action==='upload'){
            setContent( `<form class="a_upload_form p-5">
                            <label for="images" class="drop-container">
                                <span class="drop-title">Drop files here</span>
                                or
                                <input type="file" class="anilfile" id="images" accept="image/*" required onChange="readURL(this)">
                            </label>
                            <label class="w-100 mt-3">
                                <textarea class="form-control w-100" id="exampleFormControlTextarea1" placeholder="Captions help others Identify Whats in the Photos"></textarea>
                            </label>
                            <label class="w-100 mt-3 text-center">
                                <input class="btn btn-primary w-50 anilupload" type="button" value="Upload">
                            </label>
                        </form>`);
        }else{

        }
        setShow(true)
    };

    const uploadImage = ()=>{
        alert('Hello');
    }

    const handleSubmit = (value) => {
        //evt.preventDefault();
        console.log(value);
        setReviewPayload({
            ...reviewPayload,
            data:{
                ...reviewPayload.data,
                description:value
            }

        });

    }

    function matches(elem, filter) {
        if (elem && elem.nodeType === 1) {
          if (filter) {
            return elem.matches(filter);
          }
          return true;
        }
        return false;
    }

    function getPreviousSiblings(elem, filter) {
        var sibs = [];
        while (elem = elem.previousSibling) {
          if (matches(elem, filter)) {
            sibs.push(elem);
          }
        }
        return sibs;
    }

    function getAllSiblings(elem, filter) {
        var sibs = [];
        elem = elem.parentNode.firstChild;
        while (elem = elem.nextSibling) {
          if (matches(elem, filter)) {
            sibs.push(elem);
          }
        } 
        return sibs;
    }

    let star2=(e)=>{
        console.log(e.target);
        console.log(e.target.classList);
        
        let elem = e.target;
        var allSibs = getAllSiblings(elem, 'svg.fa-star');
        console.log('index--->', allSibs.length);

        allSibs.forEach(element => {
            console.log('allSibs--->',element);
            element.classList.remove("text-warning")
            element.classList.add("text-secondary")
        });
    }

    let star = (e)=>{
        
        console.log(e.target);
        console.log(e.target.classList);
        
        let elem = e.target;
        //console.log(elem.getAttribute("data-rateno"))

        var prevSibs = getPreviousSiblings(elem, 'svg.fa-star');
        console.log('index--->', prevSibs.length);

        prevSibs.forEach(element => {
            console.log('prevSibs--->',element);
            element.classList.remove('text-secondary')
            element.classList.add("text-warning")
        });

        setReviewPayload({
            ...reviewPayload,
            data:{
                ...reviewPayload.data,
                rate_scale:parseInt(elem.getAttribute("data-rateno")),
            }

        });
        

        elem.classList.remove('text-secondary');
        elem.classList.add("text-warning")
        
        //console.log('previous sibling---->',elem.previousSibling)

    }

    let submitReview = (e)=>{
        /*
        let desc = document.querySelector('textarea.review_desc').value;
        console.log('desc',desc);
        setReviewPayload({
            ...reviewPayload,
            data:{
                ...reviewPayload.data,
                description:desc
            }

        });
        */

        fetch(`${URL}/api/reviews`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+window.localStorage.getItem('jwt_token')
            },
            body:JSON.stringify(reviewPayload)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log('data',data)
        }).catch(err=>{
            console.log('err',err)
        })

    }

    let submitEnquiry = (e) =>{
        //alert('IJIJIJJIJ');
        let payload = {
            "data": {
              "fname": window.localStorage.getItem('fname'),
              "mname": window.localStorage.getItem('mname'),
              "lname": window.localStorage.getItem('lname'),
              "mobno": mobno,
              "email": window.localStorage.getItem('email'),
              "business": businessid,
              "users_permissions_user": window.localStorage.getItem('user_id'),
              "locale":  window.localStorage.getItem('lang'),
            }
        }
        fetch(`${URL}/api/enquiries`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(payload)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setShow(false);
            swal("Enquiry Sent Successfully!", "!", "success");
        })
        .catch(err => {
            console.log('err', err);
        });
    }

    //2.3
    return (
        <>
            <Modal  size="lg" show={show} onHide={handleClose}>
                {parse(content)}
            </Modal>
            <h1>Detail Page</h1>
            <h2>{busName} <Button className="float-end"  variant="primary" onClick={()=>{ handleShow('enquiry') }}>Enquire Now</Button> </h2>

            <div className="clearfix"></div>

            <Carousel className="w-75"  indicators={false}>
                {
                    busPhotos && busPhotos.map((cv,idx,arr)=>{
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
            <hr />
            <Button variant="primary" onClick={()=>{ handleShow('upload') }}>Upload Photos</Button>
            <Form>
                
                <Form.Group className="mb-3 mt-5">
                    <Form.Label>
                        <FontAwesomeIcon icon={faStar} className="text-secondary fs-1 anil1" data-rateno="1" onMouseEnter={(e)=>{ star(e) }} onMouseLeave={(e)=>{ star2(e) }} />
                        <FontAwesomeIcon icon={faStar} className="text-secondary fs-1 anil2" data-rateno="2" onMouseEnter={(e)=>{ star(e) }} onMouseLeave={(e)=>{ star2(e) }}/>
                        <FontAwesomeIcon icon={faStar} className="text-secondary fs-1 anil3" data-rateno="3" onMouseEnter={(e)=>{ star(e) }} onMouseLeave={(e)=>{ star2(e) }}/>
                        <FontAwesomeIcon icon={faStar} className="text-secondary fs-1 anil4" data-rateno="4" onMouseEnter={(e)=>{ star(e) }} onMouseLeave={(e)=>{ star2(e) }} />
                        <FontAwesomeIcon icon={faStar} className="text-secondary fs-1 anil5" data-rateno="5" onMouseEnter={(e)=>{ star(e) }} onMouseLeave={(e)=>{ star2(e) }} />
                    </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Tell us about your experience</Form.Label>
                    <Form.Control className="review_desc form-control" as="textarea" rows={3} onChange={e => handleSubmit(e.target.value)}  />
                </Form.Group>
                <Button variant="primary" type="button" onClick={(e)=>{submitReview(e) }}>
                    Submit
                </Button>
            </Form>
        </>
    )
}
