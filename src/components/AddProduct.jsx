import React, { useEffect, useState } from "react";
import "./styles/AddProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { addProductsToServer, updateProduct } from "../slices/productsSlice";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    rating: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const desiredProduct = useSelector((state) =>
    state.products.items.find((item) => item.id == location?.state?.id)
  );

  useEffect(() => {
    if (location?.state?.id) {
      setIsEdit(true);
      setProduct(desiredProduct);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatching action
    if (isEdit) {
      dispatch(updateProduct(product));
      toast.success("Product Edited Successfully.");
    } else {
      dispatch(addProductsToServer({ id: Date.now(), ...product }));
      toast.success("Product Added Successfully.");
    }
    navigate("/");
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product?.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={product?.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product?.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={product?.rating}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{isEdit ? "Edit" : "Add Product"}</button>
      </form>
    </div>
  );
};

export default AddProduct;
