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
    brands: [],
    brandFilter: [],
    initLoad: true
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
    if (this.checkWishListExistance(item.productId)) return;
    this.props.dispatch({ type: "ADD_TO_WISHLIST", item });
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.items !== this.props.items ||
      prevProps.brands !== this.props.brands
    ) {
      const { brands, items } = this.props;
      this.setState({ items, brands, initLoad: false });
    }

    if (prevProps.radioVal !== this.props.radioVal) {
      const { radioVal } = this.props;
      const items = this.fiterProductsDiscount(radioVal);
      this.setState({ items });
    }

    if (prevProps.checkedBrands !== this.props.checkedBrands) {
      const items = this.filterProductBrands(this.props.checkedBrands);
      this.setState({ items });
    }
  }

  fiterProductsDiscount = radioVal => {
    let items = [...this.state.items];
    items = items.filter(item => item.discount >= radioVal);
    return items;
  };

  filterProductBrands = checkedBrands => {
    if (checkedBrands.length === 0) return this.props.items;
    let items = [...this.props.items];
    let newItems = [];
    for (let item of items) {
      if (checkedBrands.includes(item.brandName)) newItems.push(item);
    }
    return newItems;
  };

  componentDidMount() {
    const { brands, items } = this.props;
    this.setState({ items, brands });

    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      const { dispatch } = this.props;
      dispatch({ type: "INC_PAGE" });
      dispatch({ type: "IS_LOADING" });
      dispatch({ type: "FETCH_DATA" });
    }
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  checkItemExistance = productId => {
    const { cart } = this.props;
    for (let cartItem of cart) {
      if (cartItem.productId === productId) return true;
    }
    return false;
  };

  checkWishListExistance = productId => {
    const { wishList } = this.props;
    for (let wishItem of wishList) {
      if (wishItem.productId === productId) return true;
    }
    return false;
  };

  handleImageClick = item => {
    this.props.dispatch({
      type: "UPDATE_CURRENT_PRODUCT",
      currentProduct: item
    });
  };

  handleLoad = () => {
    const { initLoad, items } = this.state;
    if (initLoad) {
      return (
        <div className="spinner">
          <Spinner name="line-scale" />
        </div>
      );
    }
    if (!initLoad) {
      if (items[0] === "Error")
        return (
          <div className="error">
            <h1>
              An Error occured while loading the items. <br /> Please check your
              network connection and reload.
            </h1>
          </div>
        );
      else if (items.length === 0)
        return <h1 className="empty-items">Nothing To Show</h1>;
      else if (items.length > 0)
        return items.map(item => (
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
        ));
    }
  };

  render() {
    const { searchStr, brands, items } = this.state;
    const { isLoading } = this.props;
    return (
      <div className="products-container">
        <Filter brands={brands} />
        <div className="products-page">
          {items[0] === "Error" ? null : (
            <Search
              onHandleSearch={this.handleSearch}
              onHandleChange={this.handleChange}
              searchStr={searchStr}
            />
          )}
          <div className="products">
            {this.handleLoad()}
            {isLoading ? (
              <h2 className="load-more">LOADING MORE ITEMS....</h2>
            ) : null}
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
    checkedBrands: state.checkedBrands,
    wishList: state.wishList,
    isLoading: state.isLoading
  };
};

export default connect(mapStateToProps)(Products);
