import React,{useState} from "react";
import axios, { HttpStatusCode } from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'

const AdminLogin = ()=>{

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
  
    const navigate = useNavigate();
   
  
    const login = (e) => {
      e.preventDefault();
      axios.post("http://localhost:8000/adminLogin", {
        adminName: name,
        password: password,
      }).then((response) => {
        console.log(response)
        localStorage.setItem('auth',JSON.stringify(response.data.token))
        console.log(response.data.token); 
        if (response.data.status == "logged in") {
          navigate('/admin2');
          localStorage.setItem('status', JSON.stringify(response));
          // console.log(response);
        } else if(response.data.status == "check your name or password"){

          setLoginStatus("check your name or password");
        }else{
          setLoginStatus(response.data.status);
        }
        // else {
        //     setLoginStatus(response.data[0].email);
        //     navigate('/');
        //     // console.log(response.status,"---")
        //     localStorage.setItem('status', JSON.stringify(response))
        // }
      })
    }
  
  

    return(
        <div>
            <form onSubmit={login}>
          <h4 className="title">Login Here</h4>
          <div className="contact_content">
          <h1 style={{ color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{loginStatus}</h1>
            <input className="textInput" type="text" name="adminName" onChange={(e) => { setName(e.target.value) }} placeholder="Enter your Email" required /><br />
            
            <input className="textInput" type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter your Password" required /><br /><br />

           
            <button className="btn btn-success" type="submit" >Login</button>
      
           
          </div>
        </form>
        </div>
    )
}

export default AdminLogin