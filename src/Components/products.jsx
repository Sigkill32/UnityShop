import React, { Component } from "react";
import Search from "./search";
import { connect } from "react-redux";
import Spinner from "react-spinkit";
import Filter from "./filter";
import { Link } from "react-router-dom";

class Products extends Component {
  state = {
    searchStr: "",
    items: [],
    brands: []
  };

  handleChange = event => {
    const searchStr = event.target.value;
    const { items } = this.props;
    const newItems = items.filter(item =>
      item.title.toLowerCase().includes(searchStr.toLowerCase())
    );
    this.setState({ items: newItems, searchStr });
  };

  handleCart = item => {
    let newItem = { ...item };
    newItem.quantity = 1;
    newItem.totPrice = item.price;
    newItem.totCrossedPrice = item.crossedPrice;
    this.props.dispatch({ type: "ADD_TO_CART", cart: newItem });
  };

  handleWish = item => {
    this.props.dispatch({ type: "ADD_TO_WISHLIST", item });
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.items !== this.props.items ||
      prevProps.brands !== this.props.brands
    ) {
      const { brands, items } = this.props;
      this.setState({ items, brands });
    }
  }

  componentDidMount() {
    const { brands, items } = this.props;
    this.setState({ items, brands });
  }

  checkItemExistance = productId => {
    const { cart } = this.props;
    for (let cartItem of cart) {
      if (cartItem.productId === productId) return true;
    }
    return false;
  };

  handleImageClick = item => {
    this.props.dispatch({
      type: "UPDATE_CURRENT_PRODUCT",
      currentProduct: item
    });
  };

  render() {
    const { searchStr, items, brands } = this.state;
    return (
      <div className="products-container">
        <Filter brands={brands} />
        <div className="products-page">
          <Search
            onHandleSearch={this.handleSearch}
            onHandleChange={this.handleChange}
            searchStr={searchStr}
          />
          <div className="products">
            {items.length === 0 ? (
              <div className="spinner">
                <Spinner name="line-scale" />
              </div>
            ) : (
              items.map(item => (
                <div className="product" key={item.productId}>
                  <Link to={`/product/${item.productId}`}>
                    <img
                      src={item.imagesArray[0]}
                      alt=""
                      height="300px"
                      width="220px"
                      onClick={() => this.handleImageClick(item)}
                    />
                  </Link>
                  <h4 className="brand">
                    {item.brandName ? item.brandName : "Unknown"}
                  </h4>
                  <p className="title">{item.title}</p>
                  <p className="price">₹{item.price}</p>
                  <p className="crossed-price">₹{item.crossedPrice}</p>
                  <p className="off">({item.discount}% OFF)</p>
                  <div className="buttons">
                    <button
                      id="cart-button"
                      onClick={() => this.handleCart(item)}
                      disabled={this.checkItemExistance(item.productId)}
                    >
                      {this.checkItemExistance(item.productId)
                        ? "ADDED TO CART"
                        : "ADD TO CART"}
                    </button>
                    <button
                      id="wish-button"
                      onClick={() => this.handleWish(item)}
                      className={
                        this.checkItemExistance(item.productId) ? "hide" : ""
                      }
                    >
                      WISHLIST
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items,
    brands: state.brands,
    cart: state.cart,
    radioVal: state.radioVal,
    checkedBrands: state.checkedBrands
  };
};

export default connect(mapStateToProps)(Products);
