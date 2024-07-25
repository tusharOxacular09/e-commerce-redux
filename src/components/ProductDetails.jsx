import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import "./styles/ProductDetails.css";
import { deleteProduct } from "../slices/productsSlice";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.products.items.find((item) => item.id == id)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <div className="product-details-container">
        <div className="product-details-header">
          <img
            src={product.image}
            alt={`Product ${product.id}`}
            className="product-details-image"
          />
        </div>
        <div className="product-details-body">
          <h1 className="product-details-title">{product.title}</h1>
          <p className="product-details-description">{product.description}</p>
          <p className="product-details-price">Price: ${product.price}</p>
          <p className="product-details-rating">Rating: {product.rating}</p>
        </div>
        <div className="product-details-footer">
          <button
            className="product-button add-to-cart"
            onClick={() => {
              dispatch(addToCart(product));
              toast.success("Product Added To The Cart.");
              navigate("/cart");
            }}
          >
            Add to Cart
          </button>
          <button
            className="product-button edit-product"
            onClick={() => {
              navigate("/add-product", { state: { id: id } });
            }}
          >
            Edit
          </button>
          <button
            className="product-button delete-product"
            onClick={() => {
              dispatch(deleteProduct(id));
              toast("Product Deleted Successfully.");
              navigate("/");
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
