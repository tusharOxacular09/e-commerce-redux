import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slices/productsSlice";
import { addToCart } from "../slices/cartSlice";
import "./styles/Products.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.items);
  const [sortByPrice, setSortByPrice] = useState(false);

  // Fetching all products on mount
  useEffect(() => {
    // Fetching the products when there is no products in the store
    if (!products?.length) {
      dispatch(fetchProducts());
    }
  }, []);

  const handleSort = () => {
    setSortByPrice(!sortByPrice);
  };

  // Sorting Products
  const sortedProducts = sortByPrice
    ? [...products].sort((a, b) => a.price - b.price)
    : products;

  return (
    <div>
      <button className="sort-button" onClick={handleSort}>
        {sortByPrice ? "Remove Sort" : "Sort by Price"}
      </button>
      <div className="product-list">
        {sortedProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-card-header">
              <img
                src={product.image}
                alt={`Product ${product.id}`}
                className="product-card-image"
              />
            </div>
            <div className="product-card-body">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Rating: {product.rating}</p>
            </div>
            <div className="product-card-footer">
              <button
                onClick={() => {
                  dispatch(addToCart(product));
                  toast.success("Product Added To The Cart.");
                  navigate("/cart");
                }}
              >
                Add To Cart
              </button>
              <button onClick={() => navigate(`/product/${product?.id}`)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
