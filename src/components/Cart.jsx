import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../slices/cartSlice";
import "./styles/Cart.css";
import toast from "react-hot-toast";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="cart">
      <h1 className="cart-title">Cart</h1>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3 className="cart-item-title">{item.name}</h3>
              <p className="cart-item-description">{item.description}</p>
              <p className="cart-item-price">Price: ${item.price}</p>
              <p className="cart-item-rating">Rating: {item.rating}</p>
              <button
                className="cart-item-remove"
                onClick={() => {
                  dispatch(removeFromCart(item.id));
                  toast.success("Item removed From Cart");
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {
          !cartItems?.length ? <h1 className="no-items">No items in the cart.</h1>:""
        }
      </div>
    </div>
  );
};

export default Cart;
