import React from 'react'
import "./Mystyle.css"
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <>
    <div>
      <div className="footer">
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <h4>About Us</h4>
                    <p className='fs-6'>
                       Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                       tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                       quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                       consequat
                    </p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation....<Link to="/aboutus">Learn More...</Link> </p>
                </div>
                {/* <div className="col-md-4 col-sm-12">
                    <h4>Useful Links</h4>
                    <ul className="list-unstyled link-list">
                        <li><a ui-sref="about" href="/">About us</a><i className="fa fa-angle-right"></i></li>
                        <li><a ui-sref="portfolio" href="/">Portfolio</a><i className="fa fa-angle-right"></i></li>
                        <li><a ui-sref="products" href="/">Latest jobs</a><i className="fa fa-angle-right"></i></li>
                        <li><a ui-sref="gallery" href="/">Gallery</a><i className="fa fa-angle-right"></i></li>
                        <li><a ui-sref="contact" href="/">Contact us</a><i className="fa fa-angle-right"></i></li>
                    </ul>
                </div> */}
                <div className="col-md-4 col-sm-12 map-img" >
                    <h4>Contact Us</h4>
                    <div className="md-margin-bottom-40 fs-6">
                        Tarakeshwor-3, Kathmandu, Nepal<br/>
                        Phone: +977 9841445737 <br/>
                        Email: <a href="mailto:mothernepalchildhome@gmail.com" className="">mothernepalchildhome@gmail.com</a><br/> 
                        {/* Web: <a href="smart-eye.html" className="">www.bluedart.in</a> */}
                    </div>

                </div>
            </div>
            
            
           </div>
           </div>
   </div>


   <div className="bottom-nav">
<ul className="nav justify-content-center">
  
  <li className="nav-item">
    <Link className="nav-link" to="/">Home</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to="/aboutus" style={{textDecoration:'none'}}>About Us</Link>
  </li>
  {/* <li className="nav-item">
    <a className="nav-link " href="/">Services</a>
  </li> */}
  <li className="nav-item">
    <a className="nav-link " href="/contactus">Contact us</a>
  </li>
</ul>
   </div>
   </>
  )
}

export default Footer
