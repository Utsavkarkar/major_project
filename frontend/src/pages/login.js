import React, { useState } from "react";
import axios, { HttpStatusCode } from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const navigate = useNavigate();
 

  const login = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/login", {
      email: email,
      password: password,
    }).then((response) => {
      // console.log(response.data.status); 
      if (response.data.status == "logged in") {
        navigate('/otp');
      } else if(response.data.status == "check your email or password"){
        setLoginStatus(response.data.status);
      }else{
        setLoginStatus(response.data.status);
      }
    })
  }
  return (
    <>
     
      <div className="container">
        <form onSubmit={login}>
          <h4 className="title">Login Here</h4>
          <div className="contact_content">
          <h1 style={{ color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{loginStatus}</h1>
            <input className="textInput" type="email" name="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter your Email" required /><br />
            
            <input className="textInput" type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter your Password" required /><br /><br />

            <p className="redirect_link"><Link to='/forgot'>Forgot your password?</Link></p>
            <button className="btn btn-success" type="submit" >Login</button>
      
            <p className="redirect_link">new user ? <Link to='/register'>register</Link></p>
          </div>
        </form>
      </div>
     </>
  )
}

export default Login;