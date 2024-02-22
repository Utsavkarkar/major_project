import React, { useEffect, useState } from 'react'
import MainLogo from "../images/mainLOGO.png"
import Cart from "../images/shopping-cart.png"
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

const Header = () => {

    const [data, setData] = useState([]);
    const location = useLocation()
   
    useEffect(() => {
        setData(JSON.parse(localStorage.getItem('status')) || [])
    }, [location])

    const logOutClick = () => {
        localStorage.removeItem('status');
        // toast.error("You Loged Out...");
        
    }
    // console.log(data.data.data.email);
    return (
        <div>
            {/* navbar */}
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container">
                    <a className="navbar-brand main_logo" href="/"><img className src={MainLogo} alt /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-lg-auto me-0 mb-2 mb-lg-0 mt-3 mt-lg-0 ms-md-0 nav_menu main_menu">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>&nbsp;&nbsp;&nbsp;
                            <li className="nav-item">
                                <Link className="nav-link" to="/iphoneSkin">Mobile Skins <i className="fa-solid fa-chevron-down side_icon" /></Link>
                                <ul className="sub_menu">
                                    <li className="nav-item"><Link to="/iphoneSkin">iphone</Link></li>
                                    <li className="nav-item"><Link to="/samsungSkin">Samsung</Link></li>
                                    <li className="nav-item"><Link to="/onePlusSkin">Oneplus</Link></li>
                                    <li className="nav-item"><Link to="/oppoSkin">Oppo</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/mackbookSkin">Laptop Skins <i className="fa-solid fa-chevron-down side_icon" /></Link>
                                <ul className="sub_menu">
                                    <li className="nav-item"><Link to="/mackbookSkin">MackBook</Link></li>
                                    <li className="nav-item"><Link to="/windowsSkin">Windows</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact Us<i className="fa-solid fa-chevron-down side_icon" /></Link>
                            </li>&nbsp;&nbsp;&nbsp;
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About<i className="fa-solid fa-chevron-down side_icon" /></Link>
                            </li>&nbsp;&nbsp;&nbsp;

                            <li className="nav-item">
                                {data.status ===  200 ? (<Link className="nav-link" to="/login" onClick={logOutClick}>Logout</Link>) : (<Link className="nav-link" to="/login">Login</Link>)}
                            </li>
                            <li className="nav-item">
                                {/* {data.data && <Link className="nav-link" to="/profile">profile</Link>} */}
                                {/* {data.status === 200 ? (<Link className="nav-link" to="/profile">profile</Link>):<p></p>} */}
                            </li>
                            <li>
                                {data.status ===  200 ? (<Link to="/cart"><img src={Cart} width="30px" height="30px" className='ms-3' /></Link>):<p></p>}
                                {/* <Link to="/cart"><img src={Cart} width="30px" height="30px" className='ms-3' /></Link> */}
                            </li>
                        </ul>
                     

                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Header
