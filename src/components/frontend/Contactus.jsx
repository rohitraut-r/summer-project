import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";


function Contactus (){
    const [data, setData] = useState({});
  const navigate = useNavigate();

    
    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;
    
        setData({ ...data, [id]: value });
      };

      const handleAdd = async (e) => {
        e.preventDefault();
    
        await addDoc(collection(db, "contactUsMessage"), {
          ...data,
          timeStamp: serverTimestamp(),
        });
        e.target.reset();
        alert("Message sent");
      };
    
  
    return(
        <>
        <Header/>
        <div className="row no-margin">

            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1765.2035812165946!2d85.26602748781444!3d27.766425902317398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1smother%20nepal%20child%20home!5e0!3m2!1sen!2snp!4v1674915685431!5m2!1sen!2snp"  height="450" frameborder="0"  allowfullscreen></iframe> */}
            <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1765.2035812165946!2d85.26602748781444!3d27.766425902317398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1smother%20nepal%20child%20home!5e0!3m2!1sen!2snp!4v1674915685431!5m2!1sen!2snp" width="600" height="450"  allowfullscreen="" referrerpolicy="no-referrer-when-downgrade" title="location"></iframe>
        </div>


        <div className="">
        <div className="container">
            <div className="row">

<form onSubmit={handleAdd}>
        <div style={{padding:'20px'}} className="col-sm-7">
                    <h2 >Contact Form</h2> <br/>
                    <div className="row cont-row">
                        <div  className="col-sm-3"><label>Enter Name </label><span>:</span></div>
                        <div className="col-sm-8"><input type="text" placeholder="Enter Name"className="form-control" id="name" onChange={handleInput} required /></div>
                    </div><br/>
                    <div  className="row cont-row">
                        <div  className="col-sm-3"><label>Email Address </label><span>:</span></div>
                        <div className="col-sm-8"><input type="email"placeholder="Enter Email Address" className="form-control" id="email" onChange={handleInput} required /></div>
                    </div><br/>
                    <div  className="row cont-row">
                        <div  className="col-sm-3"><label>Mobile Number</label><span>:</span></div>
                        <div className="col-sm-8"><input type="number"placeholder="Enter Mobile Number" className="form-control" id="phone" onChange={handleInput} required /></div>
                    </div><br/>
                    <div  className="row cont-row">
                        <div  className="col-sm-3"><label>Enter Message</label><span>:</span></div>
                        <div className="col-sm-8">
                            <textarea rows="5" placeholder="Enter Your Message" className="form-control " id="message" onChange={handleInput} required></textarea>
                        </div><br/>
                    </div><br/>
                    <div style={{marginTop:'10px;'}} className="row">
                        <div style={{paddingTop:'10px;'}} className="col-sm-3"><label></label></div>
                        <div className="col-sm-8">
                            <input type="submit" value="Send Message" className="btn btn-primary" onClick={(e)=>handleAdd}/>
                        </div>
                    </div>
                </div>
                </form>
                <div className="col-sm-5">

                    <div style={{margin:'50px'}} className="serv">
                        <h2 style={{marginTop:'10px;'}}>Address</h2>

                       Thulgaun galxi, <br/>
                        Tarakeshwor-3, Kathmandu,<br/>
                        Nepal<br/>
                        Phone: +977 9841445737<br/>
                        Email: mothernepalchildhome@gmail.com<br/>
                        Website: www.mothernepalchildhome.org<br/>
                    </div>
                </div>
                </div>
                </div>
                </div>

        <Footer/>
        </>
    )
}

export default Contactus
