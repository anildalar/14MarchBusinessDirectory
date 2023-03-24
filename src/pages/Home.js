import React, { useEffect, useState } from 'react'
import { Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default function Home() {
    //2.1 Hooks Area
    const [businessCategory,setBusinessCategory] = useState([]);


    useEffect(()=>{
        fetch(`http://localhost:1337/api/business-categories?populate=*`)
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            console.log(data)
            setBusinessCategory(data.data);
        })
        .catch(()=>{

        });
    },[]);


    //2.2


    //2.3
    return (
       <>
        <h1>Home Page</h1>
        <ul className="nav">
            {
                businessCategory.map((cv,idx,arr)=>{
                    return  <li key={idx} className="me-3">
                                <Link to={"/search?cat_name="+cv.attributes.name}>
                                    <img src={'http://localhost:1337'+cv.attributes.image.data.attributes.url} /><br />
                                    {cv.attributes.name}
                                </Link>
                            </li>
                })
            }
           
            
        </ul>
       </>
    )
}
