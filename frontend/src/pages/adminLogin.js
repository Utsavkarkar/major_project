import React,{useState} from "react";
import axios, { HttpStatusCode } from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import { useAuth } from "../context/auth";

const AdminLogin = ()=>{

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const [auth,setAuth] = useAuth();
    const navigate = useNavigate();
   
  
    const login = (e) => {
      e.preventDefault();
      axios.post("http://localhost:8000/adminLogin", {
        adminName: name,
        password: password,
      }).then((response) => {
        // console.log(response)  
        if (response.data.status === "logged in") {
          setAuth({
            ...auth,
            token:response.data.token
          })
          localStorage.setItem('auth',JSON.stringify(response.data))
          navigate('/admin2');
         
          // console.log(response);
        } else if(response.data.status === "check your email or password"){
          setLoginStatus(response.data.status);
        }else{
          setLoginStatus(response.data.status);
        }    
     })
    }
    return(
      <div>
        <div className="container">
          <form onSubmit={login}>
            <h4 className="title">Admin Login Here</h4>
            <div className="contact_content">
              <h1 style={{ color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{loginStatus}</h1>
              <input className="textInput" type="text" name="adminName" onChange={(e) => { setName(e.target.value) }} placeholder="Enter your name" required /><br />
              <input className="textInput" type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter your Password" required /><br /><br />
              <button className="btn btn-success" type="submit" >Login</button>     
            </div>
          </form>
        </div>
      </div>
    )
}

export default AdminLogin