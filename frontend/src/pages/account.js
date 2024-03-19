import React from 'react'
import Bag from '../images/bag.png'
import Location from '../images/location.png'
import Person from '../images/person.png'
import { useNavigate } from "react-router-dom";

function Account() {
    const navigate = useNavigate();
    const handleMyaddress = ()=>{
       navigate('/myaddress')
    }
    const handleMyprofile = ()=>{
        navigate('/profile')
    }
    const handleMyorder = ()=>{
        navigate('/orders')
    }
    return (
        <div>
            <div className='container'>
                <div className='accBoxPannel'>
                    <div className='row my-4'>
                        <div className='col-3 accBox mx-4 my-4' onClick={handleMyorder}>
                            <img src={Bag} />
                            <h4>My Order</h4>
                            <hr/>
                            <p>See Your Orderes Products.</p>
                        </div>
                        <div className='col-3 accBox mx-4 my-4' onClick={handleMyaddress}>
                            <img src={Location} />
                            <h4>My Address</h4>
                            <hr/>
                            <p>Edit Address For Order.</p>
                        </div>
                        <div className='col-3 accBox mx-4 my-4' onClick={handleMyprofile}>
                            <img src={Person}/>
                            <h4>My Profile</h4>
                            <hr/>
                            <p>See Or Edit Your Account Info.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Account
