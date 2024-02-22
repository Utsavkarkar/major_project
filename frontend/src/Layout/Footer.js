import React from 'react'
import MainLogo from "../images/mainLOGO.png"
const Footer = () => {
    return (
        <div>
            {/* footer */}
            <footer>
                <div className="footer">
                    <div className="row mx-2">
                        <div className="col-lg-3">
                            <div className="newsletter">
                                <h4>NEWSLETTER</h4>
                                <p>You can be the first one to know about our latest new releases, offers and more. </p>
                                <input type="text" placeholder="Your E-mail" />
                            </div>
                        </div>
                        <div className="col-lg-3 px-4">
                            <div className="useful_link">
                                <h4>Useful Links</h4>
                                <ul>
                                    <li><a href="/about">About</a></li>
                                    <li><a href="/contact">Contact Us</a></li>
                                    <li><a href="#">Terms &amp; Condition</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="vision">
                                <h4>Vision</h4>
                                <p>Creativity, Expression, &amp; Exploration</p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="purpose">
                                <img src={MainLogo} alt />
                                <p>Express Your Style, Transform your mobile device into a reflection.</p>
                            </div>
                        </div>
                    </div>
                    <div className="copyright">
                        <hr />
                        <p>Copyright ©2023 - Kirtan Nasit(Inspired By Layers.Shop - Tech Burner).</p>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Footer
