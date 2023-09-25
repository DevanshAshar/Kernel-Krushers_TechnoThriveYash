import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username,setUsername]=useState("")
  const [tab, setTab] = useState("login");
  const location = useLocation();
  const [auth,setAuth]=useAuth()
  const navigate=useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const res=await axios.post(`${process.env.REACT_APP_API}/auth/token/login/`,{username:username,password:password}, { withCredentials: true })
        if(res.status===200)
        {
        toast.success("Logged in Successfully", { duration: 5000 });
        setAuth({
          ...auth,
          token: res.data.auth_token,
        });
        //console.log(res.data.auth_token)
        const authToken = res.data.auth_token;
        console.log(auth)
        localStorage.setItem("auth",authToken);
        navigate(location.state || '/');
        }
    } catch (error) {
        toast.error('Something went wrong') 
        console.log(error.message)
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
        const res=await axios.post(`${process.env.REACT_APP_API}/auth/users/`,{username:username,email:email,password:password})
        if(res.status===200 || res.status===201)
        {
          toast.success('Signed up')
          // navigate('/')
        }
    } catch (error) {
        toast.error('Something went wrong')
        console.log(error.message)
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <div className="form-container">
          {tab === "login" && (
            <form onSubmit={handleLogin}>
              <h2 className="form-title" style={{ color: "blue"}}>Login</h2>
              <div className="form-group">
                <label className="mt-2" style={{ color: "blue"}}>Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  placeholder="Enter Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group" style={{ color: "blue"}}>
                <label htmlFor="loginPassword" className="mt-2">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="loginPassword"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-2" style={{ color: "blue",textDecoration:'ul',fontSize:'15px',cursor:'pointer'}} onClick={()=>{setTab('signup')}}>Dont Have an account?</div>
              <button className="btn btn-primary form-button mt-2" onClick={handleLogin}>
                Login
              </button>
            </form>
          )}

          {tab === "signup" && (
            <form onSubmit={handleSignup}>
              <h2 className="form-title" style={{ color: "blue"}}>Signup</h2>
              <div className="form-group">
                <label className="mt-2" style={{ color: "blue"}}>Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  placeholder="Enter Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="signupEmail" className="mt-2" style={{ color: "blue"}}>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="signupEmail"
                  value={email}
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="signupPassword" className="mt-2" style={{ color: "blue"}}>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="signupPassword"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-2" style={{ color: "blue",textDecoration:'ul',fontSize:'15px',cursor:'pointer'}} onClick={()=>{setTab('login')}}>Have an account?</div>
              <button className="btn btn-primary form-button mt-2" onClick={handleSignup}>
                Signup
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
