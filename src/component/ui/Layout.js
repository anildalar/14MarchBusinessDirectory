import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

export default function Layout() {
    return (
        <>
             <Container className="a_tbdr">
                <Header></Header>
                <main>
                    <Outlet></Outlet>
                </main>
                <Footer></Footer>
            </Container>
        </>
    )
}
