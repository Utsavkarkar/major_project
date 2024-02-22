// import React, { useEffect, useState } from "react";

// const Profile = () => {

//     const [data, setData] = useState([]);

    
//     useEffect(() => {
//         setData(JSON.parse(localStorage.getItem('status')) || [])
//     }, [])
   
//     return (
//         <div>
//             {data?.map((i) => {
//                 return (
//                     <div className="profile">
//                         <h2 className="title">My Profile</h2>
//                         <div className="profile_content">
//                             {/* <p>Username: {i.username}</p> */}
//                             {/* <p>Email : {i.email}</p> */}
//                         </div>
//                     </div>
//                 )

//             })}
//         </div>
//     )
// }

// export default Profile