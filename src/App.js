import './App.css';
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import SignIn from './component/SignIn';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function App() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (localStorage.getItem("userData") !== null) {
  //     navigate('/Home');
  //   } 
  // }, []);
  return (
    <>
      <Routes>
      <Route path='/' element={<Login />}></Route>
        {/* <Route path='Login' element={<Login />}></Route> */}
        <Route path='Home' element={<Home />}></Route>
        <Route path='SignIn' element={<SignIn />}></Route>
      </Routes>
    </>
  );
}

export default App;
