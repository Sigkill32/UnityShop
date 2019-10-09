import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHeart } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

const Navbar = ({ cart, wishList }) => {
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
        <li className="cart">
          <NavLink to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} color="white" />
            {cart.length === 0 ? null : (
              <span className="cart-count">{cart.length}</span>
            )}
          </NavLink>
        </li>
        <li className="wish">
          <NavLink to="/wishlist">
            <FontAwesomeIcon icon={faHeart} color="white" />
            {wishList.length === 0 ? null : (
              <span className="wish-count">{wishList.length}</span>
            )}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return { cart: state.cart, wishList: state.wishList };
};

export default connect(mapStateToProps)(Navbar);
