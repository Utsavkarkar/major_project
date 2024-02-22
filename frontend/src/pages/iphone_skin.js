import React,{useState,useEffect} from 'react'
// import { IphoneSkins } from './Constant/data'
import { toast } from 'react-toastify'
import axios from 'axios';
const IphoneSkinsMobile = () => {

  
  const [alldata, setalldata] = useState([]);
 
  useEffect(()=>{
    axios.get('http://localhost:8000/getproduct')
    .then(res => setalldata(res.data.data))
    .catch(err => console.log(err))
  },[])
  const filter= alldata.filter((i) => i.category === "iphone")
  // console.log(filter);
  // useEffect(setSdata(filter) , [])

  const AddToCart = (value) => {
    // console.log(value);
    var id = value._id;
    // console.log(id);
    axios.post(`http://localhost:8000/addtocart?id=${id}`)
      .then(()=>{
        toast.success("Product Added Successfully");
      })
  }

  const buySuccess = ()=>{
    toast.success("Product Buy Successfully");
}

  return (
    <div>
      {/* iphone skins cards */}
      {/* <section>
        <div className="container">
          <h2 className="title">iphone-skins</h2>
          <div className="row">
            {IphoneSkins.map((i) => {
              return (
                <div className="col-lg-3 col-sm-12 col-xs-12 col-md-6 mobile_item item_card mx-1">
                  <img src={i.image} alt />
                  <span>{i.title}</span>
                  <div className="price d-flex justify-content-between my-1">
                    <p>{i.dprice}</p>
                    <p className="mrp_price_text">{i.price}</p>
                  </div>
                  <div className="buy_button d-flex justify-content-between">
                    <button type="button" className="btn btn-outline-dark" onClick={() => AddToCart(i)}>Add to Cart</button>
                    <button type="button" className="btn btn-dark"  onClick={() => buySuccess()}>Buy Now</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section> */}


<section>
        <div className="container">
          <h2 className="title">iphone-skins</h2>
          <div className="row">
            {filter.map((i) => {
              return (
                <div className="col-lg-3 col-sm-12 col-xs-12 col-md-6 mobile_item item_card mx-1">
                  <img src={`images/${i.image}`} />
                  <span>{i.productName}</span>
                  <div className="price d-flex justify-content-between my-1">
                    <p>{i.price}</p>
                    <p className="mrp_price_text">{i.price}</p>
                  </div>
                  <div className="buy_button d-flex justify-content-between">
                    <button type="button" className="btn btn-outline-dark" onClick={() => AddToCart(i)}>Add to Cart</button>
                    <button type="button" className="btn btn-dark"  onClick={() => buySuccess()}>Buy Now</button>
                  </div>
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
