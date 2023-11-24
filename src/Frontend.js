import React from 'react'
import MainHome from "./components/frontend/MainHome"
// import FrontendApp from "./components/frontend/FrontendApp"
import Header from "./components/frontend/Header";
import Aboutus from "./components/frontend/Aboutus";
import Contactus from "./components/frontend/Contactus";
import Footer from "./components/frontend/Footer";
import Carousel from "./components/frontend/Carousel"
import AboutUs from "./components/frontend/Aboutus"

import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";


function Frontend() {
  return (
    <>

    <Header/>
    <MainHome/>
    <Footer/>
 
    </>
  )
}

export default Frontend