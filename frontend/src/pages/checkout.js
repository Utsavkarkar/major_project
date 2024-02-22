import React, {useState,useEffect} from "react";
import axios from "axios";


const Checkout = ()=>{
    const data = JSON.parse(localStorage.getItem('status'));
    const email  = data.data.data.email

    const [data1, setData] = useState([]);
    const [shippValue , setShippvalue] = useState([]);
    const [totalbill, setTotalbill] = useState([]);

     useEffect(()=>{
        axios.get('http://localhost:8000/getcart')
        // .then(res => setData(res.data.data))
        .then(res => setData(res.data.chk))
        // .then(res => console.log(res.data.chk[0]))
        .catch(err => console.log(err))
      },[]) 

      function calculateSubtotal(objects) {
        let subtotal = 0;
        objects.forEach(object => {
            subtotal += parseInt(object.price);
        });
        return subtotal;
     }
    const subtotal1 = calculateSubtotal(data1)
    // console.log();
    
     const handlechange = (e)=>{
        let checkedvalue = e.target.value;
        setShippvalue(checkedvalue)
     }
     
    if(shippValue == 49){
        var ttlbill = subtotal1 + 49;
        console.log(ttlbill)
    }else{
        var ttlbill = subtotal1 + 0;
        console.log(ttlbill)
    }

    useEffect(()=>{
        axios.get('http://localhost:8000/getcart')
        // .then(res => setData(res.data.data))
        .then(res => setData(res.data.chk))
        // .then(res => console.log(res.data.chk[0]))
        .catch(err => console.log(err))
      },[]) 

    return(
        <div>
            <hr/>
            <div className="d-flex"> 
                <div className="checkoutBlock">
                    <p className="checkoutText">Account</p>
                    <p className="checkoutTextsecondary">{email}</p>
                    <hr/>
                    <h2 className="checkoutTextsecondary">Delivery</h2>
                    <form>
                        <div className="d-flex justify-content-between">
                        <input type="text" name="fname" placeholder="First name" className="checkoutInput "/>
                        <input type="text" name="lname" placeholder="Last name" className="checkoutInput"/>
                        
                        </div>
                        <br/>
                        <input type="text" name="address" placeholder="Address" className="checkoutInputsecond"/><br/><br/>
                        <div className="d-flex justify-content-between">
                        <input type="text" name="city" placeholder="city" className="checkoutInputthird"/>
                        <input type="text" name="state" placeholder="state" className="checkoutInputthird"/>
                        <input type="text" name="pincode" placeholder="pincode" className="checkoutInputthird"/>
                        </div><br/>
                        <input type="text" name="phone" placeholder="phone" className="checkoutInputsecond"/>
                        <br/><br/>
                        <h2 className="checkoutTextsecondary">Shipping Method</h2>
                        <br/>
                        <div className="d-flex justify-content-between shippingbox">        
                            <div>    
                                <input type="radio" name="payMethod" value={"49"} onChange={handlechange}/>
                                <label>Cash on Delivery</label>
                            </div>                        
                            <p>₹49</p>
                        </div>
                            <br/>
                        <div className="d-flex justify-content-between shippingbox">
                            <div>
                                <input type="radio" name="payMethod" value={"Free"} onChange={handlechange}/><label>Razorpay Secure(UPI)</label>
                            </div>
                        <p>Free</p>
                        </div>
                        <br/>
                        <button className="btn btn-dark btn-lg rounded-pill">Complete Order</button>
                        <br/><br/>
                    </form>
                        
                </div>
                <div className="checkoutBlock">
                    <div className="ordersummary">
                        {data1.map((i,index)=>{
                            return(
                                <div className="row py-3">
                                <div className="col-sm-2 px-4">
                                <img src={`images/${i.image}`} height={"90px"} width={"90px"} />
                                </div>
                                <div className="col-sm-5">
                                    {i.productName}
                                    <p>qty : </p>
                                </div>
                                <div className="col-sm-1"> ₹{i.price}</div>
                            </div>
                            )
                        })}
                            <hr/>
                        <div className="row px-4">
                            <div className="col-6"> <b>Subtotal</b></div>
                            <div className="col-6 text-end">{subtotal1}</div>
                        </div>
                        <div className="row px-4 py-1">
                            <div className="col-6"> <b>Shipping</b></div>
                            <div className="col-6 text-end">{shippValue}</div>
                        </div>

                        <div className="billLine"><hr/></div>
                        <div className="row px-4">
                            <div className="col-6"> <b>Total</b></div>
                            <div className="col-6 text-end">{ttlbill}</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout