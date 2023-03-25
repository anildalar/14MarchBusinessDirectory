import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom';
import { URL } from '../helpers/helper';

export default function Detail() {
    //2.1 Hooks area
    const [searchParams, setSearchParams] = useSearchParams()
    const [busDetail,setBusDetail] = useState([]);
    const [busPhotos,setBusPhotos] = useState([]);
    const [busName,setBusName] = useState('');
    useEffect(()=>{
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
        </>
    )
}
