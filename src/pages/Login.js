//1. Import Area
import React from 'react'
import { Button, Form } from 'react-bootstrap'


//2. Defination Areaa
export default function Login() {
    //2.1 Hook Area


    //2.2 Function defination area
    let registerUser = ()=>{
        alert('OKOKOKOKOK');
    }


    //2.3 Return statemnt
    return (
        <>
            <h1 className="text-center">Login Page</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="button" onClick={()=>{ registerUser() }}>
                    Submit
                </Button>
            </Form>
        </>
    )
}

//3. Expoer Area
