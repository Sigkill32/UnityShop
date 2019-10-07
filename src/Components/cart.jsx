import React, { Component } from "react";
import Counter from "./counter";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Cart extends Component {
  state = {
    sum: 0,
    gross: 0,
    decDisable: false
  };

  placeOrder = () => {
    console.log("order placed");
  };

  handleRemove = productId => {
    let cart = this.props.cart;
    cart = cart.filter(item => item.productId !== productId);
    this.props.dispatch({ type: "REMOVE_FROM_CART", cart: cart });
  };

  getTotal = () => {
    const { cart } = this.props;
    if (cart.length === 0) return 0;
    let sum = 0;
    for (let item of cart) sum += item.totPrice;
    return sum;
  };

  componentDidMount() {
    const sum = this.getTotal();
    this.setState({ sum, gross: sum });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.cart.length !== this.props.cart.length ||
      prevProps.cart !== this.props.cart
    ) {
      console.log("update");
      const sum = this.getTotal();
      this.setState({ sum, gross: sum });
    }
  }

  handleDec = item => {
    const { dispatch, cart } = this.props;
    const index = cart.findIndex(cartItem => cartItem === item);
    const newCart = [...cart];
    const { quantity, price, crossedPrice } = newCart[index];
    newCart[index].quantity = quantity - 1;
    newCart[index].totPrice = price * (quantity - 1);
    newCart[index].totCrossedPrice = crossedPrice * (quantity - 1);
    dispatch({ type: "DEC_ITEM", cart: newCart });
  };

  handleInc = item => {
    const { dispatch, cart } = this.props;
    const index = cart.findIndex(cartItem => cartItem === item);
    const newCart = [...cart];
    const { quantity, price, crossedPrice } = newCart[index];
    newCart[index].quantity = quantity + 1;
    newCart[index].totPrice = price * (quantity + 1);
    newCart[index].totCrossedPrice = crossedPrice * (quantity + 1);

    dispatch({ type: "INC_ITEM", cart: newCart });
  };

  render() {
    const { cart } = this.props;
    const { sum, gross, decDisable } = this.state;
    return (
      <div className="cart-page">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <h1>Much like this page, your Cart is also empty</h1>
            <h3>Add Items to it Now</h3>
            <Link to="/products">Shop Now</Link>
          </div>
        ) : (
          <div className="cart">
            <div className="items">
              <h3>My Cart ({cart.length})</h3>
              {cart.map(item => (
                <div className="item" key={item.productId}>
                  <img src={item.imagesArray[0]} alt="" />
                  <div className="item-details">
                    <h4>{item.title}</h4>
                    <p className="price">₹{item.totPrice}</p>
                    <p className="crossed-price">₹{item.totCrossedPrice}</p>
                    <p className="off">({item.discount}% OFF)</p>
                    <Counter
                      onHandleDec={() => this.handleDec(item)}
                      onHandleInc={() => this.handleInc(item)}
                      decDisable={decDisable}
                      quantity={item.quantity}
                    />
                    <button
                      id="remove-button"
                      onClick={() => this.handleRemove(item.productId)}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={this.placeOrder} className="order">
                PLACE ORDER
              </button>
            </div>
            <div className="price-details">
              <h3>PRICE DETAILS</h3>
              <table className="price-table">
                <tbody>
                  <tr>
                    <td>Price ({cart.length} items)</td>
                    <td id="priceTotal">₹{sum}</td>
                  </tr>
                  <tr>
                    <td>Delivery</td>
                    <td id="delivery">FREE</td>
                  </tr>
                  <tr>
                    <td id="payable">Total Payable</td>
                    <td id="payable">₹{gross}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { cart: state.cart };
};

export default connect(mapStateToProps)(Cart);
