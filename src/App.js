
//1. Import Area
import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './component/ui/Layout'
import BusinessRegister from './pages/BusinessRegister'
import Detail from './pages/Detail'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SearchFilter from './pages/SearchFilter'



//2. Defination Area
export default function App() {
    //2.1 Hooks Area
    useEffect(()=>{
        if(window.localStorage.getItem('lang')=== null){
            window.localStorage.setItem('lang','en')
        }
    },[]);
    if(window.localStorage.getItem('jwt_token') === null){
        return (
            <>
                <Login /> 
            </>
        )
    }
    

    //2.2 Function Defination Area

    //2.3 Return statement
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout /> }>
                    <Route index element={<Home />}></Route>
                    <Route path="detail" element={<Detail />}></Route>
                    <Route path="login" element={<Login />}></Route>
                    <Route path="register" element={<Register />}></Route>
                    <Route path="business_register" element={<BusinessRegister />}></Route>                   
                    <Route path="search" element={<SearchFilter />}></Route>                   
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

/**
 if(window.localStorage.getItem('jwt_token') === null){
                            window.location.href = '/login';
                        }else{
                            return <Route path="business_register" element={<BusinessRegister />}></Route>
                        }
 */

//3. Export Area