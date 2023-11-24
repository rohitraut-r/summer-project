
import Header from './Header'
import Footer from './Footer'
import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import EsewaPaymentComponent from '../payment/Esewa';
import DonateState from '../../context/donateContext/DonateState';
import Success from '../payment/Success';







function Donate() {
 

  const [individualData, setIndividualData] = useState({
    fullName: '',
    phone: '',
    address: '',
    email: '',
    amount:'',
    type:"online"
   
  });





    const [showEsewaPayment, setShowEsewaPayment] = useState(false);

    const toggleEsewaPayment = () => {
        setShowEsewaPayment(prevShowEsewaPayment => !prevShowEsewaPayment);
        handleRandom();
    };

 


  const handleIndividualSubmit = async (e) => {
    e.preventDefault();
   
     

      setIndividualData ({
        fullName: '',
        phone: '',
        address: '',
        email: '',
        amount:'',
        type:'online'
        
      } );
      
    
  };

 

  const [num, setNum] = useState(0);

  function randomNumberInRange(min, max) {
    
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleRandom = () => {
    setNum(randomNumberInRange(1000, 100000));
  };
  console.log(num);

  localStorage.setItem("myData", JSON.stringify(individualData));
  return (
    <>
    <Header/>
    
   
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          
          <h3 className="text-center">Donate</h3>

        
            <form onSubmit={handleIndividualSubmit} >
              {/* Individual form inputs */}
              <div className="mb-3">
          <label htmlfor="name" className="form-label">Name</label>
              <input
               
                type="text"
                className="form-control"
                placeholder="Name"
                value={individualData.fullName}
                onChange={(e) =>
                  setIndividualData({
                    ...individualData,
                    fullName: e.target.value,
                  })
                }
              />
              </div>
              <div className="mb-3">
          <label htmlfor="number" className="form-label">Contact Number</label>
              <input
                
                type="number"
                className="form-control"
                placeholder="Number"
                value={individualData.phone}
                onChange={(e) =>
                  setIndividualData({
                    ...individualData,
                    phone: e.target.value,
                  })
                }
              />
              </div>
              <div className="mb-3">
          <label htmlfor="number" className="form-label">Address</label>
              <input
                
                type="text"
                className="form-control"
                placeholder="Address"
                value={individualData.address}
                onChange={(e) =>
                  setIndividualData({
                    ...individualData,
                    address: e.target.value,
                  })
                }
              />
              </div>
              <div className="mb-3">
          <label htmlfor="email" className="form-label">Email</label>
              <input
              
                type="text"
                className="form-control"
                placeholder="Email"
                value={individualData.email}
                onChange={(e) =>
                  setIndividualData({
                    ...individualData,
                    email: e.target.value,
                  })
                }
              />
              </div>
              {/* <div className="mb-3">
          <label for="scroll" className="form-label">Your note for donor scroll</label>
              <textarea
              
                type="text"
                className="form-control"
                placeholder="write a note why you are choosing to give"
                rows={5}
                value={individualData.donorScroll}
                onChange={(e) =>
                  setIndividualData({
                    ...individualData,
                    donorScroll: e.target.value,
                  })
                }
              ></textarea>
              </div> */}
              <div className="mb-3">

          <label htmlfor="amount" className="form-label">Donation Amount</label>
              <input
                type="number"
                className="form-control"
                placeholder="Amount"
                value={individualData.amount}
                onChange={(e) =>
                  setIndividualData({
                    ...individualData,
                    amount: e.target.value,
                  })
                }
              />
              </div>

             
            </form>
         

          


            <div className="mt-3">
              <button className="btn btn-success" onClick={toggleEsewaPayment}>Pay with eSewa</button>
              {showEsewaPayment && (
    <>
      <EsewaPaymentComponent amt={individualData.amount} num={num} />
      
    </>
  )}
  {/* <DonateState data={individualData}></DonateState> */}
            </div>
        </div>
      </div>
    </div>
  );




    <Footer/> 
    </>
  )
}

export default Donate