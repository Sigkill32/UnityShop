import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHeart } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

const Navbar = ({ cart }) => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/products">Products</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li id="cart">
          <NavLink to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} color="white" />
            {cart.length === 0 ? null : <span>{cart.length}</span>}
          </NavLink>
        </li>
        <li id="wish">
          <NavLink to="/wishlist">
            <FontAwesomeIcon icon={faHeart} color="white" />
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return { cart: state.cart };
};

export default connect(mapStateToProps)(Navbar);
