import React, {useState,useEffect} from "react"
import axios from 'axios'
import Table from "react-bootstrap/Table";
import AddProduct from "./addProduct";
import EditProduct from "./editProduct";
import { Link, useLocation } from 'react-router-dom'
// import Logo from "../images/logo1.png"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

function Admin2(){
   
    const [data, setData] = useState([]);
    const [display, setdisplay] = useState(false)
    const [EditModal, setEditModal] = useState(false)
    const [SelectedData, setSelectedData] = useState([])  
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();

    useEffect(()=>{
      axios.get('http://localhost:8000/getproduct')
      .then(res => setData(res.data.data))
      .catch(err => console.log(err))
    },[])   

    const fetchData = () => {
      axios.get('http://localhost:8000/getproduct')
      .then(res => setData(res.data.data))
      .catch(err => console.log(err))
    };
  
    const onClickHandler =()=>{
        setdisplay(true)
    }
    const onclikdelete =(data)=>{
      axios.delete(`http://localhost:8000/deleteproduct?id=${data}`)
      .then((res) => console.log(res))
      .then(res => {fetchData()})
      .catch(err => console.log(err))
      
    }
  
    const onEdit =(data)=>{
      setSelectedData(data);
      setEditModal(true)
    }
       
    const handleLogout = () => {
      setAuth({
        ...auth, token: ''
      })
      localStorage.removeItem('auth');
      navigate('/adminlogin')
    }

    return(
      <div className="container">
      <div>
        {/* navbar */}
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <a className="navbar-brand main_logo" href="/"><img className  alt /></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-lg-auto me-0 mb-2 mb-lg-0 mt-3 mt-lg-0 ms-md-0 nav_menu main_menu">
                <li className="nav-item">
                  <button className=" btn btn-dark" onClick={handleLogout}>Logout<i className="fa-solid fa-chevron-down side_icon" /></button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

      </div>
      <h2 className="adminHading">Admin Dashboard</h2>

      <AddProduct display1={display} setdisplay1={setdisplay} />
      <EditProduct display={EditModal} setdisplay={setEditModal} SelectedData={SelectedData} />
      <div className="d-flex justify-content-center">
        <button onClick={onClickHandler} className="my-5 btn btn-primary">Add Product</button>{''}
      </div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Category</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((i, index) => (
            <tr key={index}>
              <td>{i.category}</td>
              <td>{i.productName}</td>
              <td>
                <img src={`images/${i.image}`} width="100px" height="100px" alt="img" />
              </td>
              <td>{i.price}</td>
              <td>
                <button className='btn btn-success me-3' onClick={() => onEdit(i)}>Edit</button>
                <button className='btn btn-danger' onClick={() => onclikdelete(i._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    </div>
    )
}

export default Admin2;