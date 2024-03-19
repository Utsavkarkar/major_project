import React from 'react'
import BannerImage from "../images/banner_skin_2.png"
import BannerSkin2 from "../images/Banner_skin.png"
import { LaptopSkins, MobileSkins } from './Constant/homeConstant'
import LaptopBanner from "../images/skin_laptop_banner.png"
import { toast } from 'react-toastify'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';


const Home = () => {

    const AddToCart = (value) => {
        console.log(value);
        // if (localStorage.getItem('MobileData')) {
        //     const mdata = JSON.parse(localStorage.getItem('MobileData'))
        //     mdata.push(value)
        //     localStorage.setItem('MobileData', JSON.stringify(mdata))
        // }
        // else {
        //     const Mobile = JSON.stringify([value])
        //     localStorage.setItem('MobileData', Mobile)
        // }
        toast.success("Product Added Successfully");
    }

    const buySuccess = () => {
        toast.success("Product Buy Successfully");
    }

    return (
        <> 
            <div>
                <div>
                    {/* banner section */}
                    <Splide options={{ rewind: false, type: 'loop', arrows: false, autoplay: true, interval: 3000 }} aria-label="React Splide Example">
                        <SplideSlide>
                            <img src={BannerImage} alt="Image 1" width={"100%"} />
                        </SplideSlide>
                        <SplideSlide>
                            <img src={BannerSkin2} alt="Image 2" width={"100%"} />
                        </SplideSlide>

                    </Splide>
                    {/* Featured product section(mobile skin) */}
                    <section>
                        <div className="container">
                            <h2 className="title">Featured Products</h2>
                            <div className="row my-4">
                                {MobileSkins.map((i, index) => {
                                    return (
                                        <div className="col-lg-4 col-sm-12 col-xs-12 col-md-6 mobile_item item_card mx-1" key={index}>
                                            <img src={i.image} alt />
                                            <span>{i.title}</span>
                                            <div className="price d-flex justify-content-between my-1">
                                                <p>{i.dprice}</p>
                                                <p className="mrp_price_text">{i.price}</p>
                                            </div>
                                            <div className="buy_button d-flex justify-content-between">
                                                <button type="button" onClick={() => AddToCart(i)} className="btn btn-outline-dark">Add to Cart</button>
                                                <button type="button" onClick={() => buySuccess()} className="btn btn-dark">Buy Now</button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </section>
                    {/* second banner */}
                    <section>
                        <div className="second_banner">
                            <img src={LaptopBanner} alt />
                        </div>
                    </section>
                    {/* best selling laptop skins */}
                    <section>
                        <div className="container-fluid">
                            <h2 className="title">Best Selling Laptop Skins</h2>
                            <div className="row my-4">
                                {LaptopSkins.map((i) => {
                                    return (
                                        <div className="col-lg-3 col-sm-12 col-xl-4 col-md-6 laptop_item item_card">
                                            <img src={i.image} alt />
                                            <span>{i.title}</span>
                                            <div className="price d-flex justify-content-between my-1">
                                                <p>{i.dprice}</p>
                                                <p className="mrp_price_text">{i.price}</p>
                                            </div>
                                            <div className="buy_button d-flex justify-content-between">
                                                <button type="button" onClick={() => AddToCart(i)} className="btn btn-outline-dark">Add to Cart</button>
                                                <button type="button" onClick={() => buySuccess()} className="btn btn-dark">Buy Now</button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div></section>
                    {/* features */}
                    <section>
                        <div className="container">
                            <div className="features">
                                <div className="row px-4">
                                    <div className="col-lg-4 features_content">
                                        <svg width="80px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.5777 4.43152L15.5777 3.38197C13.8221 2.46066 12.9443 2 12 2C11.0557 2 10.1779 2.46066 8.42229 3.38197L8.10057 3.5508L17.0236 8.64967L21.0403 6.64132C20.3941 5.90949 19.3515 5.36234 17.5777 4.43152Z" fill="#1C274C" />
                                            <path d="M21.7484 7.96434L17.75 9.96353V13C17.75 13.4142 17.4142 13.75 17 13.75C16.5858 13.75 16.25 13.4142 16.25 13V10.7135L12.75 12.4635V21.904C13.4679 21.7252 14.2848 21.2965 15.5777 20.618L17.5777 19.5685C19.7294 18.4393 20.8052 17.8748 21.4026 16.8603C22 15.8458 22 14.5833 22 12.0585V11.9415C22 10.0489 22 8.86557 21.7484 7.96434Z" fill="#1C274C" />
                                            <path d="M11.25 21.904V12.4635L2.25164 7.96434C2 8.86557 2 10.0489 2 11.9415V12.0585C2 14.5833 2 15.8458 2.5974 16.8603C3.19479 17.8748 4.27062 18.4393 6.42228 19.5685L8.42229 20.618C9.71524 21.2965 10.5321 21.7252 11.25 21.904Z" fill="#1C274C" />
                                            <path d="M2.95969 6.64132L12 11.1615L15.4112 9.4559L6.52456 4.37785L6.42229 4.43152C4.64855 5.36234 3.6059 5.90949 2.95969 6.64132Z" fill="#1C274C" />
                                        </svg>
                                        <h3>Same Day Dispatch</h3>
                                        <p>All orders placed before 12pm Monday to Friday are dispatched same day.</p>
                                    </div>
                                    <div className="col-lg-4 features_content">
                                        <svg width="80px" height="100px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                                <path fill="none" d="M0 0h24v24H0z" />
                                                <path d="M19.375 15.103A8.001 8.001 0 0 0 8.03 5.053l-.992-1.737A9.996 9.996 0 0 1 17 3.34c4.49 2.592 6.21 8.142 4.117 12.77l1.342.774-4.165 2.214-.165-4.714 1.246.719zM4.625 8.897a8.001 8.001 0 0 0 11.345 10.05l.992 1.737A9.996 9.996 0 0 1 7 20.66C2.51 18.068.79 12.518 2.883 7.89L1.54 7.117l4.165-2.214.165 4.714-1.246-.719zm8.79 5.931L10.584 12l-2.828 2.828-1.414-1.414 4.243-4.242L13.414 12l2.829-2.828 1.414 1.414-4.243 4.242z" />
                                            </g>
                                        </svg>
                                        <h3>Exchange &amp; Return Policy</h3>
                                        <p>Easy exchange &amp; returns within 15 days.</p>
                                    </div>
                                    <div className="col-lg-4 features_content">
                                        <svg fill="#000000" width="80px" height="100px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1920 428.266v1189.54l-464.16-580.146-88.203 70.585 468.679 585.904H83.684l468.679-585.904-88.202-70.585L0 1617.805V428.265l959.944 832.441L1920 428.266ZM1919.932 226v52.627l-959.943 832.44L.045 278.628V226h1919.887Z" fillRule="evenodd" />
                                        </svg>
                                        <h3>Contact Us</h3>
                                        <p>Write us at support@Sleekskins_store.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            </div>
           
        </>
    )
}

export default Home
