import React, {useState,useEffect} from "react"
import axios from 'axios'
import Table from "react-bootstrap/Table";
import AddProduct from "./addProduct";
import EditProduct from "./editProduct";

function Admin2(){
   
    const [data, setData] = useState([]);
    const [display, setdisplay] = useState(false)
    const [EditModal, setEditModal] = useState(false)
    const [SelectedData, setSelectedData] = useState([])  

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
       
    return(
      <div>
        <h1>admin-2</h1>
      
        <AddProduct display1={display} setdisplay1={setdisplay}/>
        <EditProduct display={EditModal} setdisplay={setEditModal} SelectedData={SelectedData}/>
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