import React, {useState,useEffect} from "react"
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'; 

const AddProduct = ({display1,setdisplay1})=>{

    const handleClose = () => setdisplay1(false);

    const [productName,setProductName] = useState()
    const [category,setCategory] = useState()
    const [image1,setImage] = useState()
    const [price,setPrice] = useState()
    const [data, setData] = useState([]);
   
    const upload = (e) => {
      e.preventDefault();
      const formData = new FormData()
      formData.append('productName',productName)
      formData.append('category',category)
      formData.append('image',image1)
      formData.append('price',price)
      axios.post('http://localhost:8000/add',formData)
      .then((response)=>{
          console.log(response)
          console.log(response.data)

        })
        setdisplay1(false)
    }

    return(
        <Modal show={display1} onHide={handleClose}>
        <div >
            <h1>add product</h1>
            <form onSubmit={upload} encType="multipart/form-data" >
            Product Name : <input type="text" name="productName" onChange={(e) => setProductName(e.target.value)}/><br /><br />
            Category : <input type="text" name="category" onChange={(e) => setCategory(e.target.value)}/><br /><br />
            Image : <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])}/><br /><br />
            Price : <input type="text" name="price" onChange={(e) => setPrice(e.target.value)}/><br /><br />

            <button className="btn btn-success" type="submit">Upload</button><br/><br/><br/> 
        
     

        </form>
        </div>
        </Modal>
    )
}

export default AddProduct