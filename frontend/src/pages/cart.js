import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/getcart')
      .then(res => setData(res.data.chk))
      .catch(err => console.log(err));
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:8000/getcart')
      .then(res => setData(res.data.chk))
      .catch(err => console.log(err));
  };

  const handleRemove = (id) => {
    axios.delete(`http://localhost:8000/removecartproduct?id=${id}`)
      .then(res => {
        toast.success("Product Removed Successfully");
        fetchData(); // Update data after removing
      })
      .catch(err => console.log(err));
  };

  const itemPlushandle = (id) => {
    axios.post(`http://localhost:8000/qtyplus?id=${id}`)
      .then(res => {
        toast.success("Quntity Added Successfully");
        fetchData(); // Update data after incrementing
      })
      .catch(err => console.log(err));
  };

  const itemMinushandle = (id) => {
    axios.post(`http://localhost:8000/qtyminus?id=${id}`)
      .then(res => {
        toast.success("Quntity decresed Successfully");
        fetchData(); // Update data after decrementing
      })
      .catch(err => console.log(err));
  };

  function calculateSubtotal(objects) {
    let subtotal = 0;
    objects.forEach(object => {
      subtotal += parseInt(object.price) * parseInt(object.qty); // Consider quantity
    });
    return subtotal;
  }

  const subtotal1 = calculateSubtotal(data);

  const navigate = useNavigate();
  const checkoutHandle = () => {
    navigate('/checkout');
  };

  return (
    <div className='my-4 productTable'>
      <Table striped bordered="black">
        <thead>
          <tr>
            <th>Product Skin Image</th>
            <th>Product Name</th>
            <th>Product Price</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((i, index) => {
            return (
              <tr key={index}>
                <td>
                  <img src={`images/${i.image}`} alt={i.productName} height={"100px"} width={"100px"} />
                </td>
                <td className='text-start px-4'>
                  {i.productName}
                  <br />
                  <div className='d-flex py-3'>
                    <p>Qty : </p>
                    <button className='mx-2 btncartstyle' onClick={() => itemMinushandle(i._id)}>-</button>
                    <p>{i.qty}</p>
                    <button className='mx-2 btncartstyle' onClick={() => itemPlushandle(i._id)}>+</button>
                  </div>
                </td>
                <td>
                  {i.price}
                </td>
                <td>
                  <button className='btn btn-dark' onClick={() => handleRemove(i._id)}>Remove</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <div className='d-flex cartTotalText'>
        <b>subtotal :</b>
        <h4>₹ {subtotal1}</h4>
      </div>
      <p className='cartText'>Shipping & taxes calculated at checkout</p>
      <button className='btn btn-outline-dark my-4 rounded-pill btnCheckout' onClick={checkoutHandle}>checkout</button>
    </div>
  );
};

export default Cart;
