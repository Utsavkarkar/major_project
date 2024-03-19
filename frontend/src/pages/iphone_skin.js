import React, { useState, useEffect } from 'react'
import { IphoneSkins } from './Constant/data'
import { toast } from 'react-toastify'
import axios from 'axios';
import { useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
const IphoneSkinsMobile = () => {


  const [alldata, setalldata] = useState([]);
  const [data, setData] = useState([]);
  const location = useLocation()
  const navigate = useNavigate();
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('status')) || [])
  }, [location])


  useEffect(() => {
    axios.get('http://localhost:8000/getproduct')
      .then(res => setalldata(res.data.data))
      .catch(err => console.log(err))
  }, [])
  const filter = alldata.filter((i) => i.category === "iphone")
  // console.log(data.data.status);
  // useEffect(setSdata(filter) , [])

  const AddToCart = (value) => {
    if (data.status == 200) {
      var id = value._id;

      axios.post(`http://localhost:8000/addtocart?id=${id}`)
        .then(() => {
          toast.success("Product Added Successfully");
        })
    } else {
        navigate('/login');
        toast.error("Login First...")
    }
  }

  const buySuccess = () => {
    toast.success("Product Buy Successfully");
  }

  return (
    <div>
      <section>
        <div className="container">
          <h2 className="title">iphone-skins</h2>
          <div className="row">
            {filter.map((i) => {
              return (
                <div className="col-lg-3 col-sm-12 col-xs-12 col-md-6 mobile_item item_card mx-1">
                  <img src={`images/mobileSkins/${i.image}`} />
                  <span>{i.productName}</span>
                  <div className="price d-flex justify-content-between my-1">
                    <p>{i.price}</p>
                    <p className="mrp_price_text">{i.price}</p>
                  </div>
                  <button type="button" className="btn btn-outline-dark buy_button" onClick={() => AddToCart(i)}>Add to Cart</button>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default IphoneSkinsMobile
