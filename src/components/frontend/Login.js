// import { useState } from "react";
// import { auth } from "../config/firebase"
// import {  signInWithEmailAndPassword } from "firebase/auth"
// // import {useNavigate } from "react-router-dom";


// function Login() {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   // const navigate = useNavigate();

//   const addEmail = (event) => {
//     setEmail(event.target.value);
//   }


//   const addPassword = (event) => {
//     setPassword(event.target.value);
//   }

//   const signin = (e) => {
//     e.preventDefault();
//     signInWithEmailAndPassword(auth, email, password)
    
//       .then((userCredential) => {
//         console.log(userCredential)
//        }).catch((error) => {
//         alert(error.message)
//          console.log(error.message)
//      })
//   }



//   // const signin = async(e) =>{
//   //   e.preventDefault();
//   //   try{
//   //   await createUserWithEmailAndPassword(auth, email, password);
//   //   navigate('/contactus')
//   //   }catch(err){
//   //     console.error(err);
//   //   }
//   // }
 

//   return (
//     <div className='container-fluid'>
//      <section className="vh-100 mt-5">
//   <div className="container-fluid h-custom">
//     <div className="row d-flex justify-content-center align-items-center h-100">
//       <div className="col-md-9 col-lg-6 col-xl-5">
//         <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
//           className="img-fluid" alt="..."/>
//       </div>
//       <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
//         <form>
//           <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
//             <p className="lead fw-normal mb-0 me-3">Enter Username and Password</p><br/><br/>
            
//           </div>

         

//           {/* <!-- Email input --> */}
//           <div className="form-outline mb-4">

//             <input type="email" id="form3Example3" className="form-control form-control-lg"
//               placeholder="Enter a valid email address" 
//               onChange={addEmail}/>

//             <label className="form-label" for="form3Example3">Email address</label>
//           </div>

//           {/* <!-- Password input --> */}
//           <div className="form-outline mb-3">

//             <input type="password" id="form3Example4" className="form-control form-control-lg"
//               placeholder="Enter password" 
//               onChange={addPassword}/>

//             <label className="form-label" for="form3Example4">Password</label>
//           </div>

//           <div className="d-flex justify-content-between align-items-center">
//             {/* <!-- Checkbox --> */}
//             <div className="form-check mb-0">
//               <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
//               <label className="form-check-label" for="form2Example3">
//                 Remember me
//               </label>
//             </div>
//             <a href="#!" className="text-body">Forgot password?</a>
//           </div>

//           <div className="text-center text-lg-start mt-4 pt-2">

//             <button type="button" className="btn btn-success btn-lg" onClick={signin}>Login</button>
            
//             <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/"
//                 className="link-danger">Register</a></p>
//           </div>

//         </form>
//       </div>
//     </div>
//   </div>
 
// </section>
//     </div>
//   )
// }

// export default Login
