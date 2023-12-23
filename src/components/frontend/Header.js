import React from 'react'
import logo from "./images/logo1.png"
import "./Header.css"
import { Link } from 'react-router-dom'
import { EventListener } from '@mui/x-data-grid/utils/EventManager'

export default function header() {

//   var scrollToTopBtn = document.getElementsByClassName("scrollToTopBtn");
// var rootElement = document.documentElement;

// function scrollToTop() {
//   // Scroll to top logic
//   rootElement.scrollTo({
//     top: 0,
//     behavior: "smooth"
//   });
// }
// scrollToTopBtn.EventListener("click", scrollToTop);
  return (
    <>
    

    <div className='pt-3 pb-3'>
      <span className='text-start ms-4'>mothernepalchildhome@gmail.com | +977 9848095437, 9841445737</span>
      
        <Link className="btn btn-outline-success me-3 loginbtn" to="/login">Login</Link>
        {/* <Link className="btn btn-outline-success signup" to="/signup">Sign up</Link> */}
      
    </div>

      <button className='gototop'  onClick={() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }}>^</button>



    <div className="header">
      <nav className="navbar fixed navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand" href="/" ><img alt="..." src={logo}/></a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/aboutus">About Us</Link>
          </li>
          
          <li className="nav-item">
            <Link className="nav-link" to="/contactus">Contact Us</Link>
          </li>
          <li className="nav-item donate">
            <Link className="nav-link btn-outline-success" to="/donate">Donate</Link>
          </li>
          <li className="nav-item donate">
            <Link className="nav-link btn-outline-success" to="/appointment">Take Appointment</Link>
          </li>
        </ul>
        
      </div>
    </div>
  </nav></div>
  </>
  )
}
