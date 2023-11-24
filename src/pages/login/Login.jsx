import { useContext, useState } from "react"
import "./login.scss"
import {auth} from "../../firebase"
import {signInWithEmailAndPassword} from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import Header from "../../components/frontend/Header"
import Footer from "../../components/frontend/Footer"





const Login = () => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const {dispatch} = useContext(AuthContext);




  const handleLogin = (e) =>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
        // Signed in 
        const user = userCredential.user;
        dispatch({type:"LOGIN", payload:user});
        console.log(user);
        navigate('/dashboard');
        setError(false);
   
      })
      .catch((error) => {
       setError(true);
        // ..
      });
  }


  return (
    <>
    <Header/>
    <div className="login">
      <form onSubmit={handleLogin}>
        <p style={{fontSize:'30px'}}>Enter User Credentials</p>
        <input type="email" placeholder="Email" onChange={(e)=> setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
        <button type="submit">Login</button>
        {error && <span>Username or password wrong</span>}

      </form>
    </div>
    <Footer/>
    </>
  )
}

export default Login