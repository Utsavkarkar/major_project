// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Table from "react-bootstrap/Table";

// const Orders = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/getorderdetail")
//       .then((res) => setData(res.data.ord))
//       // .then((res) => console.log(res.data.ord))
//       // .then(res => setData(res.data.ord[0].products))
//       .catch((err) => console.log(err));
//   }, []);
//   // console.log(data);
//   return (
//     <div class="container">
//     <h2 class="my-4">My Orders</h2>
//     <div class="row">
//       <div class="col-md-12">
//         {/* <!-- Orders Loop --> */}
//         <>
//           <div class="order-container">
//             {data?.map((order, index) => (
//               <div key={index} class="order-item">
//                 <h3>Order : {index + 1}</h3>
//                 <p>Order Status: {order.orderStatus}</p>
//                 <p>Payment Mode: {order.paymentMode}</p>
//                 <h4>Products :</h4>
//                 <ul class="product-list">
//                   {order.products.map((product, i) => (
//                     <li key={i} class="product-item">
//                       <strong>Name:</strong> {product.productName} <br />
//                       <img src={`images/mobileSkins/${product.image}`} class="product-image" />
//                       <br />
//                       <strong>Price:</strong> {product.price} <br />
//                       <strong>Category:</strong> {product.category} <br />
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </>
//       </div>
//     </div>
//   </div>
//   );
// };
// export default Orders;


import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card';



function Orders() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/getorderdetail")
      .then((res) => setData(res.data.ord))
      // .then((res) => console.log(res.data.ord))
      // .then(res => setData(res.data.ord[0].products))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div class="container">
      <h2 class="my-4 title">My Orders</h2>
      <div class="row">
        <div class="col-md-12">
          {/* <!-- Orders Loop --> */}
          <>
            <div class="order-container">
              {data?.map((order, index) => (
                <div key={index} class="order-item">
                  <div className="b">
                  <div className="justify-content-between d-flex">
                    <div className="align-items-center mt-3">
                    <h3>Order : {index + 1}</h3>
                    </div>
                    <div className="">
                    <p><strong>Order Status:</strong> {order.orderStatus}</p>
                    <p><strong className=''>Payment Mode:</strong> {order.paymentMode}</p>  
                    </div>
                  </div>
                  </div>
                  {/* <h4>Products :</h4> */}
                  <ul class="product-list">
                    {order.products.map((product, i) => (
                      <li key={i} class="product-item">
                        <div className="d-flex ">
                          <div className="justify-content-center  ">
                            <img src={`images/mobileSkins/${product.image}`} alt={product.productName} class="product-image" />
                          </div>
                          <div className="mt-3 ms-5  fs-5 justify-content-center align-self-center">
                            <p className='text-start'><strong>Name:</strong> {product.productName}</p>
                            <p className='text-start'><strong>Price:</strong> {product.price}</p>
                            <p className='text-start'><strong>Category:</strong> {product.category}</p>
                          </div>
                        </div>
                        <br />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>



          </>
        </div>
      </div>
    </div>
  );

}

export default Orders