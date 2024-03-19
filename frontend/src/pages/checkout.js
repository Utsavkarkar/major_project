import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';

const Checkout = () => {
    const data = JSON.parse(localStorage.getItem('status1'));
    // console.log(data.data.chkdata[0].email)
    const email = data.data.chkdata[0].email
    const navigate = useNavigate()
    const [data1, setData] = useState([]);
    const [shippValue, setShippvalue] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/getcart')
            .then(res => setData(res.data.chk))
            .catch(err => console.log(err))
    }, [])

    function calculateSubtotal(objects) {
        let subtotal = 0;
        objects.forEach(object => {
            subtotal += parseInt(object.price) * parseInt(object.qty);
        });
        return subtotal;
    }
    const subtotal1 = calculateSubtotal(data1)
    // console.log();

    const handlechange = (e) => {
        let checkedvalue = e.target.value;
        setShippvalue(checkedvalue)
    }

    if (shippValue == 49) {
        var ttlbill = subtotal1 + 49;
    } else {
        var ttlbill = subtotal1 + 0;
    }

    const checkOutHandler = async (ttlbill) => {
        console.log(data1);
        if (shippValue == 49) {

            axios.post("http://localhost:8000/offlineorder")
                .then(res => console.log("orderd success."))

            navigate('/paymentSuccess')
        } else {
            const { data: { key } } = await axios.get("http://localhost:8000/getkey")
            // console.log(key);
            
            const { data: { order } } = await axios.post("http://localhost:8000/checkout", {
                    ttlbill,
                })
                // console.log(order);
                
            const options = {
                key,
                amount: order.amount,
                currency: "INR",
                name: "utsav karkar",
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: order.id,
                callback_url: "http://localhost:8000/paymentverification",
                prefill: {
                    name: "uk",
                    emai: "uk@gmail.com",
                    contac: "9000090000",
                },
                notes: [],
                theme: {
                    color: "#091111",
                },
            };
            data1.forEach(product => {
                options.notes.push({
                  productName: product.productName,
                  category: product.category,
                  image: product.image,
                  price: product.price
                });
              });

            console.log(options)
            console.log(window)
            var razor = new window.Razorpay(options);
            razor.open();
        }
    };

    const [houseno, setHouseno] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [resAddress, setResaddress] = useState("");
    const [resAddText, setResAddText] = useState("");

    const saveAddress = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/addaddress", {
            house_no: houseno,
            street: street,
            city: city,
            state: state,
            pincode: pincode
        }).then((res) => { setResAddText("Address saved successfully..") })
    }
    useEffect(() => {
        axios.get('http://localhost:8000/getaddress')
            .then(res => setResaddress(res.data.address))
            .catch(err => console.log(err))
    }, [])

    const changeAddress = ()=>{
        navigate('/address');
    }
    // console.log(resAddress);
    return (
        <div>
            <hr />
            <div className="d-flex">
                <div className="checkoutBlock">
                    <p className="checkoutText">Account</p>
                    <p className="checkoutTextsecondary">{email}</p>
                    <hr />
                    <h2 className="checkoutTextsecondary">Shipping Addresss</h2>
                    <div className="addressText">
                        <h5>House No : {resAddress.house_no}</h5>
                        <h5>Area : {resAddress.street}</h5>
                        <h5>City : {resAddress.city}</h5>
                        <h5>State : {resAddress.state}</h5>
                        <h5>Pincode : {resAddress.pincode}</h5>
                        <h5>Phone No : {resAddress.phoneno}</h5>
                    </div>
                    <div className="d-flex">
                        <button className="btn btn-outline-dark btn-sm " onClick={changeAddress}>Change Addresss</button>
                    </div>
                    <br />
                    <h2 className="checkoutTextsecondary">Shipping Method</h2>
                    <br />

                    <form>
                        <div className="d-flex justify-content-between shippingbox">
                            <div>
                                <input type="radio" name="payMethod" value={"49"} onChange={handlechange} />
                                <label>Cash on Delivery</label>
                            </div>
                            <p>₹49</p>
                        </div>
                        <br />
                        <div className="d-flex justify-content-between shippingbox">
                            <div>
                                <input type="radio" name="payMethod" value={"Free"} onChange={handlechange} /><label>Razorpay Secure(UPI)</label>
                            </div>
                            <p>Free</p>
                        </div>
                        <br />
                    </form>
                    <button className="btn btn-dark btn-lg"
                        onClick={() => checkOutHandler(ttlbill)}>Complete Order</button>
                    <br /><br />
                </div>
                <div className="checkoutBlock">
                    <div className="ordersummary">
                        {data1.map((i, index) => {
                            return (
                                <div className="row py-3">
                                    <div className="col-sm-2 px-4">
                                        <img src={`images/${i.image}`} height={"90px"} width={"90px"} />
                                    </div>
                                    <div className="col-sm-5">
                                        {i.productName}
                                        <p>qty : {i.qty} </p>
                                    </div>
                                    <div className="col-sm-1"> ₹{i.price}</div>
                                </div>
                            )
                        })}
                        <hr />
                        <div className="row px-4">
                            <div className="col-6"> <b>Subtotal</b></div>
                            <div className="col-6 text-end">₹{subtotal1}</div>
                        </div>
                        <div className="row px-4 py-1">
                            <div className="col-6"> <b>Shipping</b></div>
                            <div className="col-6 text-end">{shippValue}</div>
                        </div>

                        <div className="billLine"><hr /></div>
                        <div className="row px-4">
                            <div className="col-6"> <b>Total</b></div>
                            <div className="col-6 text-end">₹{ttlbill}</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout