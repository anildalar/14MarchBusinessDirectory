//1. Import Area
import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'


//2. Defination Areaa
export default function Login() {
    //2.1 Hook Area


    //2.2 Function defination area
    let myLogin = ()=>{
       //alert('OKOKOKOKOK');
        let payload = {
            "identifier": document.querySelector('input[type=email]').value,
            "password": document.querySelector('input[type=password]').value
        }
        console.log(payload);

        fetch(`http://localhost:1337/api/auth/local`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payload)
        })
        .then(res=>res.json())
        .then((data)=>{
            if(data["jwt"] !== undefined){
                //Login Success
                console.log('tokenn--------->>',data["jwt"]);
                //alert('Welcome');
                window.location.href = '/business_register';

                //Store the Token in LocalStorage
                // 
                window.localStorage.setItem('lang','en');
                window.localStorage.setItem('langText','English');
                window.localStorage.setItem('jwt_token',data["jwt"])
                window.localStorage.setItem('user_id',data["user"].id)

                window.localStorage.setItem('fname',data["user"].fname)
                window.localStorage.setItem('mname',data["user"].mname)
                window.localStorage.setItem('lname',data["user"].lname)
                window.localStorage.setItem('mobno',data["user"].mobno)
                window.localStorage.setItem('email',data["user"].email)
            }else{
                //Login Fail
                alert("Bheed Kam");
            }
            console.log(data);
        })
        .catch(err=>err)



    }


    //2.3 Return statemnt
    return (
        <>
        <Container className="mt-5">

            <h1 className="text-center">Login Page</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="button" onClick={()=>{ myLogin() }}>
                    Submit
                </Button>
            </Form>
        </Container>
        </>
    )
}

//3. Expoer Area
