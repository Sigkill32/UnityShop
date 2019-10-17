import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

class WishList extends Component {
  state = {};

  handleMoveToCart = item => {
    let newItem = { ...item };
    if (this.checkItemExistance(item.productId)) {
      this.handleInc(item);
      this.handleRemove(item);
    } else {
      newItem.quantity = 1;
      newItem.totPrice = item.price;
      newItem.totCrossedPrice = item.crossedPrice;
      this.props.dispatch({ type: "MOVE_TO_CART", item: newItem });
      this.handleRemove(item);
    }
  };

  handleRemove = item => {
    let wishList = [...this.props.wishList];
    wishList = wishList.filter(
      wishItem => wishItem.productId !== item.productId
    );
    this.props.dispatch({ type: "REMOVE_FROM_WISHLIST", wishList });
  };

  checkItemExistance = productId => {
    const { cart } = this.props;
    for (let cartItem of cart) {
      if (cartItem.productId === productId) return true;
    }
    return false;
  };

  handleInc = item => {
    const { dispatch, cart } = this.props;
    const index = cart.findIndex(
      cartItem => cartItem.productId === item.productId
    );
    const newCart = [...cart];
    const { quantity, price, crossedPrice } = newCart[index];
    newCart[index].quantity = quantity + 1;
    newCart[index].totPrice = price * (quantity + 1);
    newCart[index].totCrossedPrice = crossedPrice * (quantity + 1);
    dispatch({ type: "INC_ITEM", cart: newCart });
  };

  render() {
    const { wishList } = this.props;
    return (
      <div className="wishlist-page">
        {wishList.length === 0 ? (
          <div className="wishlist-empty">
            <h1>Your Wishist is empty</h1>
            <h4>Add items to wishlist now</h4>
            <Link to="/products">CONTINUE SHOPPING</Link>
          </div>
        ) : (
          <div className="wishlist">
            <h3>My Wishlist ({wishList.length})</h3>
            <div className="wish-container">
              {wishList.map(item => (
                <div className="wish-items product" key={item.productId}>
                  <FontAwesomeIcon
                    className="close-icon"
                    icon={faTimesCircle}
                    onClick={() => this.handleRemove(item)}
                  />
                  <img
                    src={item.imagesArray[0]}
                    alt=""
                    height="300px"
                    width="220px"
                  />
                  <h4 className="brand">
                    {item.brandName ? item.brandName : "Unknown"}
                  </h4>
                  <p className="title">{item.title}</p>
                  <p className="price">₹{item.price}</p>
                  <p className="crossed-price">₹{item.crossedPrice}</p>
                  <p className="off">({item.discount}% OFF)</p>
                  <div className="button">
                    <button onClick={() => this.handleMoveToCart(item)}>
                      MOVE TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { wishList: state.wishList, cart: state.cart };
};

export default connect(mapStateToProps)(WishList);
