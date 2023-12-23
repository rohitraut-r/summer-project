// AppointmentForm.js
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
  where,
  query,
  getDocs
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Confirmation from "./../reports/Confirmation"



const AppointmentForm = () => {
  const navigate = useNavigate();

  // Define state variables for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [duration, setDuration] = useState("1");
  const [data, setData] = useState({});
  let newData = {};
  let appointmentData = {};

  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    // Check availability when bookingDate and bookingTime change
    if (bookingDate && bookingTime) {
      checkAvailability();
    }
  }, [bookingDate, bookingTime]);

  const checkAvailability = async () => {
    setIsLoading(true);

  // Convert selected booking date and time to timestamps
  const selectedBookingDateTime = new Date(`${bookingDate}T${bookingTime}`).getTime();
  const selectedEndTime = selectedBookingDateTime + duration * 60 * 60 * 1000; // Calculate end time

  // Query Firestore to check for overlapping appointments
  const appointmentsRef = collection(db, 'appointments');
  const q = query(
    appointmentsRef,
    where('bookingDate', '==', bookingDate) // Check for the same date
  );

  const querySnapshot = await getDocs(q);

  // Check if there are any overlapping appointments
  const overlappingAppointments = querySnapshot.docs.filter((doc) => {
    const bookingDateTime = new Date(doc.data().bookingDate + 'T' + doc.data().bookingTime).getTime();
    const endTime = bookingDateTime + doc.data().duration * 60 * 60 * 1000;
    
    // Check for overlap: newStart < existingEnd AND newEnd > existingStart
    return selectedBookingDateTime < endTime && selectedEndTime > bookingDateTime;
  });

  setIsAvailable(overlappingAppointments.length === 0);

  setIsLoading(false);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

   
    // const bookingEndTime = new Date(`${bookingDate}T17:00`);
    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1);

    appointmentData = {
      name,
      email,
      phone,
      purpose,
      bookingDate,
      bookingTime,
      duration: parseInt(duration, 10),
    };
    newData = {
      'name':name,
      'email':email,
      'phone':phone,
      'purpose':purpose,
      'bookingDate':bookingDate,
      'bookingTime':bookingTime,
      duration: parseInt(duration, 10),
    };
     const bookingDateTime = new Date(`${bookingDate}T${bookingTime}`);
    const bookingStartTime = new Date(`${bookingDate}T08:00`);
    const bookingEndTime = new Date(
      bookingDateTime.getTime() + appointmentData.duration * 3600 * 1000
    );
   

    if (!isAvailable) {
      alert('The selected date and time are not available. Please choose a different time.');
      return;
    }
    if (
      bookingDateTime < bookingStartTime ||
      bookingDateTime > bookingEndTime
    ) {
      // Booking time is outside the allowed hours
      alert("Booking time must be between 8 am and 5 pm.");
      return;
    }

    if (bookingDateTime.getDate() !== bookingStartTime.getDate()) {
      // Booking end date is not the same as the booking date
      alert("Booking end date must be the same as the booking date.");
      return;
    }

    if (bookingDateTime < today || bookingDateTime > maxDate) {
      // Booking date is before today or more than one month from today
      alert("Booking date must be between today and one month from today.");
      return;
    }
    console.log(appointmentData);
    setData(appointmentData);
    try {
      // Create a new document with Firestore's auto-generated ID
      await addDoc(collection(db, "appointments"), {
        ...appointmentData,
        timeStamp: serverTimestamp(),

      });
      
      console.log(data)


      setSuccessMessage("Appointment booked successfully!");
      // Reset form fields after submission (you can do it here)
      setName("");
      setEmail("");
      setPhone("");
      setPurpose("");
      setBookingDate("");
      setBookingTime("");
      setDuration("1");

      navigate('/appointmentConfirmation', { state: { data: appointmentData } });
    

      
    } catch (error) {
      console.error("Error uploading appointment data:", error);
      alert("Appointment booking failed. Please try again later.");
    }
  };
  console.log(appointmentData);
  return (
    <>
      <Header />
      <div className="container mt-5" style={{ width: "30rem" }}>
        <h2 className="mb-4">Book Appointment</h2>
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone:
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="purpose" className="form-label">
              Purpose of Visitation:
            </label>
            <input
              type="text"
              className="form-control"
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="bookingDate" className="form-label">
              Booking Date:
            </label>
            <input
              type="date"
              className="form-control"
              id="bookingDate"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="bookingTime" className="form-label">
              Booking Time:
            </label>
            <input
              type="time"
              className="form-control"
              id="bookingTime"
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="duration" className="form-label">
              Duration (hours):
            </label>
            <select
              className="form-select"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          {/* <PDFDownloadLink  document={<Confirmation data={data} />} filename="report">
          <button type="submit" className="btn btn-primary mb-5">
            Book Appointment
          </button>
          </PDFDownloadLink> */}
          <button type="submit" className="btn btn-primary mb-5">
 
          
            Book Appointment
          
        
          </button>
          
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AppointmentForm;
