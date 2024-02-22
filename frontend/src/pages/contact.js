import React,{useState} from "react";
import axios from 'axios'; 

const Contact = ()=>{
    const [name, setname] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");

    const send = (e) => {

        e.preventDefault();
        axios.post("http://localhost:3001/contact", {
            name: name,
            email: email,
            message: message,
        }).then((response) => {
          if(response.data.message){
            setStatus(response.data.message);
          }else{
            setStatus("YOUR MESSAGE SENT SUCCESSFULLY..");
           
          }
        })
       
      }

    return(
        <div className="container">
             <h2 className="title">Contact Us</h2>
             <div >
             <h4>Write message to us</h4>
             <form className="contact_content" onSubmit={send}>
                <input type="text" name="name" placeholder="Name" onChange={(e) => {setname(e.target.value)}} /><br/>
                <input type="email" name="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/><br/>
              <textarea rows={10} placeholder="Message" name="message" className="contact_message" onChange={(e) => {setMessage(e.target.value)}}></textarea><br/>
              <button className="btn btn-outline-dark my-2" >Send</button><br/>
              <h1 style={{fontSize: '15px', textAlign: 'center', marginTop: '20px',color:"green"}}>{status}</h1>
              </form>
             </div>
        </div>
    )
}

export default Contact