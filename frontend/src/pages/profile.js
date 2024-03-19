import React, { useEffect, useState } from "react";
import axios from 'axios';

const Profile = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/getuserdata')
            .then(res => setData(res.data.userData))
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <div className="profile">
                <h2 className="title">My Profile</h2>
                <div className="profile_content">
                    <p>Username: {data.username}</p>
                    <p>Email : {data.email}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile