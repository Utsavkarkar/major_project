import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

const EditProduct = ({ display, setdisplay, SelectedData }) => {
  const handleClose = () => setdisplay(false);
  const [productName, setProductName] = useState();
  const [category, setCategory] = useState();
  const [image1, setImage] = useState();
  const [price, setPrice] = useState();

  let id = SelectedData._id;

  const updateProduct = (e) => {
    e.preventDefault();
    const formData1 = new FormData();
    formData1.append("productName", productName);
    formData1.append("category", category);
    formData1.append("image", image1);
    formData1.append("price", price);
    axios
      .post(`http://localhost:8000/updateproduct?id=${id}`, formData1)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <Modal show={display} onHide={handleClose}>
      <div>
        <h1>edit product</h1>
        <form
          onSubmit={updateProduct}
          encType="multipart/form-data"
          method="post"
        >
          Product Name :{" "}
          <input
            type="text"
            name="productName"
            onChange={(e) => setProductName(e.target.value)}
          />
          <br />
          <br />
          Category :{" "}
          <input
            type="text"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <br />
          Image :{" "}
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <br />
          <br />
          Price :{" "}
          <input
            type="text"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <br />
          <button className="btn btn-success" type="submit">
            Upload
          </button>
          <br />
          <br />
          <br />
        </form>
      </div>
    </Modal>
  );
};

export default EditProduct;
