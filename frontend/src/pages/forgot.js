import React,{useState} from "react";
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'

const Forgot = ()=>{
    const [email, setEmail] = useState("");
    // const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [registerStatus, setRegisterStatus] = useState("");

    const navigate = useNavigate();

    const forgot = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/forgot", {
            // username: username,
            email: email,
            password: password,
        }).then((response) => {
          // setRegisterStatus(response);
          // console.log(response);
          if(response.data == "data updated successfully"){
            setRegisterStatus(response.data);
            navigate('/login');
          }else{
            setRegisterStatus(response.data);
          }

          // if(response.data.message){
          //   setRegisterStatus(response.data.message);
          //   navigate('/login');
          // }else{
          //   setRegisterStatus("Please enter correct email...");
          
          // }
        })
      }

    return(
        <div className="container">
            <form onSubmit={forgot}>
                <h4 className="title">Forgot your password</h4>
                   
                <div className="contact_content">   
                
                    {/* <input className="textInput" type="username" name="username" onChange={(e) => {setUsername(e.target.value)}} placeholder="Enter your Username" required /><br/> */}

                    
                    <input className="textInput" type="text" name="email" onChange={(e) => {setEmail(e.target.value)}} placeholder="Enter your Email Address" required /><br/>
                    <h1 className="text-danger" style={{fontSize: '15px', textAlign: 'center', marginTop: '20px'}}>{registerStatus}</h1><br/>
                   
                    <input className="textInput" type="password" name="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Enter your new Password" required /><br/>

                   
                    <button className="btn btn-success" type="submit" >create</button>
                    
                    
                    </div>
            </form>
        </div>
    )
}

export default Forgot