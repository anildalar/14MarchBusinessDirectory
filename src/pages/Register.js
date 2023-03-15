import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import swal from 'sweetalert';

export default function Register() {
    //2.1 Hook area
    const [payload,setPayload] = useState();

    //2.2 Function defination area
    let registerUser = ()=>{
        //alert('OKOKOKOKOK');
        let u = document.querySelector('input[name=username]').value;
        let e = document.querySelector('input[name=email]').value;
        let p = document.querySelector('input[name=password]').value;
        console.log(u);
        console.log(e);
        console.log(p);
      

        console.log(payload);
        //Promise Chain
        fetch(`http://localhost:1337/api/auth/local/register`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                "username": u,
                "email": e,
                "password":p
            }),
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.data === null){
               swal("Bad job!",`${data.error.message}`, "error");
            }else{
                swal("Good job!", "User Created Successfully!", "success");    

            } 
            
        })
        .catch(err=>err);


    }

    return (
        <>
            <h1 className="text-center">Register Page</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>UserName</Form.Label>
                    <Form.Control name="username" type="text" placeholder="Enter username" />
                    <Form.Text className="text-muted">
                        
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="button" onClick={()=>{ registerUser() }}>
                    Submit
                </Button>
            </Form>
        </>
    )
}
