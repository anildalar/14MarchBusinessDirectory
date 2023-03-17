//1. Import Area
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { URL } from '../helpers/url';


//2. Defination
export default function BusinessRegister() {
    //2.1 Hooks Area
    const [cities,setCities] = useState([]);
    const [businessCategories,setBusinessCategories] = useState([]);
    
    
    useEffect(()=>{
        //Call the City Api
        fetch(`${URL}/api/cities`,{})
        .then((res)=>{
            return res.json()
        })
        .then((cityData)=>{

            console.log('City ------->>',cityData.data);
            setCities(cityData.data);

        })
        .catch((err)=>{
            return err;
        });


        //Call the Business Category Api
        fetch(`${URL}/api/business-categories`,{})
        .then((res)=>{
            return res.json()
        })
        .then((businessCatData)=>{
            console.log('Business-categories ------->>',businessCatData.data);
            setBusinessCategories(businessCatData.data);
        })
        .catch((err)=>{
            return err;
        });
    },[])

    //2.2 function defination area
    let busReg=(e)=>{
        e.preventDefault();
        //alert('HI');
        let payload ={
                        "data": {
                        "name": document.querySelector('input[name="business_name"]').value,
                        "business_category": document.querySelector('select[name="bus_cat_id"]').value,
                        "cities": [
                                document.querySelector('select[name="city_id"]').value
                            ]
                        }
                    };
        //Call the API
        fetch(`${URL}/api/businesses`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payload)
        })
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            console.log(data);
            alert("Business Registered Succesffully");
        })
        .catch()           
    }
    


    //2.3 To return somethign
    return (
        <>
            <h1 className="text-center">Business Register</h1>
            {console.log('set City --->>',cities)}
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>City</Form.Label>
                    <Form.Select name="city_id" aria-label="Default select example">
                        {
                            //array.map(function(currentValue, index, arr), thisValue)
                            cities.map((cv,idx,arr)=>{ 
                                return <option key={idx} value={cv.id}>{cv.attributes.name}</option>
                            })
                        }
                        
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Business Category</Form.Label>
                    <Form.Select name="bus_cat_id" aria-label="Default select example">
                        {
                            //array.map(function(currentValue, index, arr), thisValue)
                            businessCategories.map((cv,idx,arr)=>{ 
                                return <option key={idx} value={cv.id}>{cv.attributes.name}</option>
                            })
                        }
                    </Form.Select>
                </Form.Group>   
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Business Name</Form.Label>
                    <Form.Control name="business_name" type="text" placeholder="Enter Business Name" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                            
                <Button variant="primary" type="submit" onClick={(e)=>{ busReg(e) }}>
                    Register Business
                </Button>
            </Form>
        </>
    )
}

//3. Export Area