import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Address() {

    const navigate = useNavigate();
    const [houseno, setHouseno] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [phoneno, setPhoneno] = useState("");
    const [resAddText, setResAddText] = useState("");
    
    const saveAddress = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/addaddress", {
            house_no: houseno,
            street: street,
            city: city,
            state: state,
            pincode: pincode,
            phoneno: phoneno,
        })
        .then(() => { setResAddText("Address saved successfully..") })
        .then(()=>navigate('/checkout'))
    }

    return (
        <div>
            <form>
                <div className="checkoutBlock1">
                <h2 className="checkoutAddress">Delivery Address</h2>
                    <div className="d-flex justify-content-between">
                        <input type="text" name="fname" placeholder="house no" className="checkoutInput " onChange={(e) => { setHouseno(e.target.value) }} />
                        <input type="text" name="lname" placeholder="street" className="checkoutInput" onChange={(e) => { setStreet(e.target.value) }} />

                    </div>
                    <br />
                    <div className="d-flex justify-content-between">
                        <input type="text" name="city" placeholder="city" className="checkoutInputthird" onChange={(e) => { setCity(e.target.value) }} />
                        <input type="text" name="state" placeholder="state" className="checkoutInputthird" onChange={(e) => { setState(e.target.value) }} />
                        <input type="text" name="pincode" placeholder="pincode" className="checkoutInputthird" onChange={(e) => { setPincode(e.target.value) }} />
                    </div><br />
                    <input type="text" name="phone" placeholder="phone" className="checkoutInputsecond" onChange={(e) => { setPhoneno(e.target.value) }} />
                    <br /><br />
                    <button className="btn btn-dark" onClick={saveAddress}>Save Address</button>
                    <br /><br />
                </div>
            </form>
        </div>
    )
}

export default Address
