import { useContext, useState } from "react"
import "./login.scss"
import {auth} from "../../firebase"
import {signInWithEmailAndPassword} from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import Header from "../../components/frontend/Header"
import Footer from "../../components/frontend/Footer"
import { sendPasswordResetEmail } from "firebase/auth"





// ... (your existing imports)

// ... (your existing imports)

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetError, setResetError] = useState(null);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false); // Added state
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate('/dashboard');
        setError(false);
      })
      .catch((error) => {
        setError(true);
      });
  };

  const handleForgotPassword = async () => {
    try {
      setResetError(null);
      setIsResetting(true);
      await sendPasswordResetEmail(auth, resetEmail);
      setResetSuccess(true);
    } catch (error) {
      setResetError(error.message);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="login">
        <form onSubmit={handleLogin}>
          <p style={{ fontSize: "30px" }}>Enter User Credentials</p>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
          <div>
            <button type="button" style={{marginTop:'5px'}} onClick={() => setShowResetForm(true)}>
              Forgot Password
            </button>
          </div>
          {error && <span>Username or password wrong</span>}
        </form>
        {showResetForm && !resetSuccess && (
          <div>
            <input type="email" placeholder="Enter your email" onChange={(e) => setResetEmail(e.target.value)} />
            <button type="button" onClick={handleForgotPassword} disabled={isResetting}>
              Reset Password
            </button>
            {resetError && <span>{resetError}</span>}
          </div>
        )}
        {resetSuccess && (
          <div>
            <p>Password reset email sent. Check your email inbox for instructions.</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Login;

