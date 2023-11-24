import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import List_members from "./pages/list/List_members";
import Single from "./pages/single/Single";
import Single_members from "./pages/single/Single_members";
import MainHome from "./components/frontend/MainHome"
// import FrontendApp from "./components/frontend/FrontendApp"
import Header from "./components/frontend/Header";
import Aboutus from "./components/frontend/Aboutus";
import Contactus from "./components/frontend/Contactus";
import Donate from "./components/frontend/Donate";

import Footer from "./components/frontend/Footer";
import Frontend  from "./Frontend";


import New from "./pages/new/New";
import New_members from "./pages/new/New_members";

import Update from "./pages/update/update";
import Update_members from "./pages/update/update_members";

import List_Donors from "./pages/list/List_donors";
import New_donors from "./pages/new/New_donors";
import Single_donors from "./pages/single/Single_donors";
import Update_donors from "./pages/update/update_donors";

import List_documents from "./pages/list/List_documents";


import PDFFile from "./components/reports/PDFFilePath";
import PDFFilePathMembers from "./components/reports/PDFFilePathMembers";
import PDFFilePathDonors from "./components/reports/PDFFilePathDonors";


import Success from "./components/payment/Success";
import Failed from "./components/payment/Failed";



import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import AppointmentForm from "./components/frontend/AppointmentForm";

import DonateState from "./context/donateContext/DonateState";
// import Datatable_members from "./components/datatable/Datatable_members";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const {currentUser} = useContext(AuthContext);

 

  const RequireAuth = ({children}) => {
    return currentUser ? (children) : <Navigate to="/login"/>
  }


  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          
            {/* <Route exact path="/" element={<Frontend/>}/>
            <Route exact path="/mainhome" element={<Frontend/>}/>
            <Route exact path="/mainhome/aboutus" element={<Aboutus/>}/>
            <Route exact path="/mainhome/contactus" element={<Contactus />}/> */}

            

          

            <Route exact path="aboutus" element={<Aboutus/>}></Route>
             <Route exact path="contactus" element={<Contactus/>}></Route>
             <Route exact path="donate" element={<Donate/>}></Route>
             <Route exact path="appointment" element={<AppointmentForm/>}></Route>
           
             <Route exact path="success" element={
              <DonateState>
             <Success/>
             </DonateState>
             }></Route>
             
             <Route exact path="failed" element={<Failed/>}></Route>


            <Route path="/">
            <Route index element={
                <Frontend />
            } 
            />
          

             <Route path="login" element={<Login />} />
             <Route exact path="/dashboard" element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              } />
            <Route path="users">
              <Route index element={
               <RequireAuth>
                <List />
               </RequireAuth>
              } />
              <Route path="single" element={
                <RequireAuth>
                  <Single />
                </RequireAuth>
              } />
              <Route
                path="new_children"
                element={
                  <RequireAuth>
                    <New inputs={userInputs} title="Add New Children" />
                  </RequireAuth>
                }/>
                 <Route
                path="update"
                element={
                  <RequireAuth>
                    <Update inputs={userInputs} title="Update Children Data" />
                  </RequireAuth>
                }/>
                <Route
                path="generateReport"
                element={
                  <RequireAuth>
                    <PDFFile/>
                  </RequireAuth>
                }/>
            </Route>
            <Route path="members">
              <Route index element={
                <RequireAuth>
                <List_members/>
                </RequireAuth>
              } />
              <Route path="single_members" element={
                <RequireAuth>
                <Single_members />
                </RequireAuth>
              } />
              <Route
                path="new_members"
                element={
                  <RequireAuth>
                  <New_members  title="Add New Members" />
                  </RequireAuth>
                }/>
              <Route
                path="update_members"
                element={
                  <RequireAuth>
                  <Update_members  title="Update Members" />
                  </RequireAuth>
                }
                
              />
              <Route
                path="generateReport"
                element={
                  <RequireAuth>
                    <PDFFilePathMembers/>
                  </RequireAuth>
                }/>
            </Route>
            <Route path="donors">
              <Route index element={
                <RequireAuth>
                <List_Donors/>
                </RequireAuth>
              } />
              <Route path="single_donors" element={
                <RequireAuth>
                <Single_donors />
                </RequireAuth>
              } />
              <Route
                path="new_donors"
                element={
                  <RequireAuth>
                  <New_donors  title="Add New Donors" />
                  </RequireAuth>
                }/>
              <Route
                path="update_donors"
                element={
                  <RequireAuth>
                  <Update_donors  title="Update Donors" />
                  </RequireAuth>
                }
              />
              <Route
                path="generateReport"
                element={
                  <RequireAuth>
                    <PDFFilePathDonors/>
                  </RequireAuth>
                }/>
            </Route>
            <Route path="documents">
              <Route index element={
                <RequireAuth>
                <List_documents/>
                </RequireAuth>
              } />
          
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
