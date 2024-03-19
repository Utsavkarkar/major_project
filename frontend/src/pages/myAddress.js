import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyAddress() {
    const [resAddress, setResaddress] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8000/getaddress')
            // .then(res => setData(res.data.data))
            .then(res => setResaddress(res.data.address))

            .catch(err => console.log(err))
    }, [])

    const changeAddress = () => {
        navigate('/address');
    }
    console.log(resAddress);

    return (
        <div>
            <div className="container">
                <h2 className="my-4">Shipping Addresss</h2>
                <div className="addressTextBlock">
                    <h5>House No : {resAddress.house_no}</h5>
                    <h5>Area : {resAddress.street}</h5>
                    <h5>City : {resAddress.city}</h5>
                    <h5>State : {resAddress.state}</h5>
                    <h5>Pincode : {resAddress.pincode}</h5>
                    <h5>Phone No : {resAddress.phoneno}</h5>
                </div>
                <button className="btn btn-outline-dark btn-sm my-3" onClick={changeAddress}>Change Addresss</button>
            </div>
        </div>
    )
}

export default MyAddress
