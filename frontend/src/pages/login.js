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
        navigate('/');
        localStorage.setItem('status', JSON.stringify(response));
        // console.log(response);
      } else if(response.data == "check your email or password"){
        setLoginStatus(response.data);
      }else{
        setLoginStatus(response.data);
      }
      // else {
      //     setLoginStatus(response.data[0].email);
      //     navigate('/');
      //     // console.log(response.status,"---")
      //     localStorage.setItem('status', JSON.stringify(response))
      // }
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