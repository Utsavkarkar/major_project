import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Otp() {
    const [otp, setOtp] = useState([]);
    const [otpStatus, setOtpstatus] = useState([]);
    const navigate = useNavigate();
    const handleOtp = () => {
        axios.post('http://localhost:8000/test_otp', {
            otp: otp
        })
            .then((res) => {
                if (res.data.status == 'ok') {
                    navigate('/')
                    localStorage.setItem('status', JSON.stringify(res));
                } else {
                    setOtpstatus(res.data.status)
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div className='otpPannel'>

            {/* <input type='text' name='otp' placeholder='Enter Otp' onChange={(e) => { setOtp(e.target.value) }} />
            <button className='btn btn-success' onClick={handleOtp}>Submit</button>
            <h4 style={{ color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{otpStatus}</h4> */}

            <div class="container">
                <div class="row">
                    <div class="col-md-6 offset-md-3">
                        <div class="otp-container">
                            <h2>Enter OTP</h2>
                            {/* <form> */}
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Enter OTP"  onChange={(e) => { setOtp(e.target.value) }} required />
                                </div>
                                <h4 style={{ color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{otpStatus}</h4>
                                <button  class="btn btn-success" onClick={handleOtp}>Verify OTP</button>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Otp
