import React from 'react'
import { OneplusSkins } from './Constant/data'
import { toast } from 'react-toastify'

const OnePlusSkinsMobile = () => {

  const AddToCart = (value) => {
    if (localStorage.getItem('MobileData')) {
      const mdata = JSON.parse(localStorage.getItem('MobileData'))
      mdata.push(value)
      localStorage.setItem('MobileData', JSON.stringify(mdata))
    }
    else {
      const Mobile = JSON.stringify([value])
      localStorage.setItem('MobileData', Mobile)
    }
    toast.success("Product Added Successfully");

  }

  const buySuccess = ()=>{
    toast.success("Product Buy Successfully");
}

  return (
    <div>
      <section>
        <div className="container">
          <h2 className="title">Oneplus-skins</h2>
          <div className="row ">
            {OneplusSkins.map((i) => {
              return (
                <div className="col-lg-4 col-sm-12 col-xs-12 col-md-6 mobile_item item_card mx-1">
                  <img src={i.image}  />
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
      </section>
    </div>

  )
}

export default OnePlusSkinsMobile
