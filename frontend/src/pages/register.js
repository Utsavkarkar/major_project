import React,{useState} from "react";
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'

const Register = ()=>{
   

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [registerStatus, setRegisterStatus] = useState("");
  
    const navigate = useNavigate();

    const register = (e) => {

        e.preventDefault();
        axios.post("http://localhost:8000/reg", {
            username: username,
            email: email,
            password: password,
        }).then((response) => {
          if(response.data.message){
            setRegisterStatus(response.data.message);
          }else{
            setRegisterStatus("ACCOUNT CREATED SUCCESSFULLY");
            navigate("/login");
          }
        })
       
      }
 
    return(
        <div>
            
            

            <div className="conatainer">
            <form onSubmit={register}>
                <h4 className="title">Register Here</h4>
                   
                <div className="contact_content">   
                    <input  className="textInput" type="username" name="username" onChange={(e) => {setUsername(e.target.value)}} placeholder="Enter your Username" required /><br/>

                    
                    <input className="textInput" type="email" name="email" onChange={(e) => {setEmail(e.target.value)}} placeholder="Enter your Email Address" required /><br/>

                   
                    <input className="textInput" type="password" name="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Enter your Password" required/><br/>

                   
                    <button className="btn btn-success" type="submit" >Create Account</button>
                    <h1 style={{fontSize: '15px', textAlign: 'center', marginTop: '20px'}}>{registerStatus}</h1><br/>
                    <p className="redirect_link">already have an accoount ?<Link to='/login'>login</Link></p>
                    </div>
                   
            </form>
            </div>
        </div>
    )
}

export default Register


