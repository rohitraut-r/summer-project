// import React, { useEffect, useState} from 'react'
// import { auth } from "../config/firebase" 
// import { onAuthStateChanged, signOut } from 'firebase/auth';

// import { useNavigate } from 'react-router-dom';

// const AuthDetails = () => {
//     const [authUser, setAuthUser] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const listen = onAuthStateChanged(auth, (user) => {
//             if(user){
//                 setAuthUser(user)
//                 navigate("/contactus")
//             } else{
//                 setAuthUser(null);
//             }
//         });
         
//         return() => {
//             listen();
//         }

//     },[])

//     const userSignOut = () => {
//         signOut(auth).then(() => {
//             navigate("/login")
//             console.log('Sign Out Successful')
//         }).catch(error=> console.log(error))
//     }
//   return (
//     <div>
//         {authUser ? <><p>{`Signed In as ${authUser.email}`}</p>
//         <button onClick={userSignOut}>Sign Out</button>
//         </> : <p>Signed out</p>}
//     </div>
//   )
// };

// export default AuthDetails