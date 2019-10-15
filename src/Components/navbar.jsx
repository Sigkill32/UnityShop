import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHeart,
  faBars,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

class Navbar extends Component {
  state = {
    isExpanded: false
  };

  handleNavButtonOpen = () => {
    this.setState({ isExpanded: true });
  };

  handleNavButtonClose = () => {
    this.setState({ isExpanded: false });
  };

  render() {
    const { cart, wishList } = this.props;
    const { isExpanded } = this.state;
    return (
      <div className="navbar">
        <div className="nav-button">
          <ul>
            <li>
              <button onClick={this.handleNavButtonOpen}>
                <FontAwesomeIcon icon={faBars} />
              </button>
            </li>
          </ul>
        </div>
        <div className={isExpanded ? "links" : "nav-show invisible"}>
          <ul>
            <li>
              <NavLink to="/home" onClick={this.handleNavButtonClose}>
                HOME
              </NavLink>
              <FontAwesomeIcon
                className={isExpanded ? "nav-close" : "invisble nav-close-show"}
                onClick={this.handleNavButtonClose}
                icon={faTimes}
              />
            </li>
            <li>
              <NavLink to="/products" onClick={this.handleNavButtonClose}>
                PRODUCTS
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={this.handleNavButtonClose}>
                ABOUT
              </NavLink>
            </li>
            <li></li>
          </ul>
        </div>
        <div className="icons">
          <ul>
            <li className="cart-icon">
              <NavLink to="/cart">
                <div className="cart-icon-container">
                  <FontAwesomeIcon icon={faShoppingCart} color="black" />
                  <p>cart</p>
                </div>
                {cart.length === 0 ? null : (
                  <span className="cart-count">{cart.length}</span>
                )}
              </NavLink>
            </li>
            <li className="wish">
              <NavLink to="/wishlist">
                <div className="wish-icon-container">
                  <FontAwesomeIcon icon={faHeart} color="#ff3e6c" />
                  <p>wishlist</p>
                </div>
                {wishList.length === 0 ? null : (
                  <span className="wish-count">{wishList.length}</span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { cart: state.cart, wishList: state.wishList };
};

export default connect(mapStateToProps)(Navbar);
