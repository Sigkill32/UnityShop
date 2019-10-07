import React, { Component } from "react";
import Search from "./search";
import { connect } from "react-redux";
import Spinner from "react-spinkit";
import Filter from "./filter";

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
    console.log(item);
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
                  <div className="buttons">
                    <button
                      id="cart-button"
                      onClick={() => this.handleCart(item)}
                    >
                      ADD TO CART
                    </button>
                    <button
                      id="wish-button"
                      onClick={() => this.handleWish(item)}
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
  return { items: state.items, brands: state.brands };
};

export default connect(mapStateToProps)(Products);
