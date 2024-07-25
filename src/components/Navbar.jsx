import React, { useState } from "react";
import "./styles/NavBar.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.items);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="navbar__logo">
          <h1>E-commerce Site</h1>
        </div>
        <div className="navbar__toggle" onClick={toggleMenu}>
          <span className="navbar__toggle-bar"></span>
          <span className="navbar__toggle-bar"></span>
          <span className="navbar__toggle-bar"></span>
        </div>
      </div>

      <ul className={`navbar__links ${isOpen ? "active" : ""}`}>
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/" onClick={toggleMenu}>
            Products
          </Link>
        </li>
        <li className={location.pathname === "/cart" ? "active" : ""}>
          <Link to="/cart" onClick={toggleMenu}>
            Cart ({cartItems.length})
          </Link>
        </li>
        <li className={location.pathname === "/add-product" ? "active" : ""}>
          <Link to="/add-product" onClick={toggleMenu}>
            Add Product
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
