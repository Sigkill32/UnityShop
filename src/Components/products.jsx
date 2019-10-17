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
    initLoad: true,
    isFilterVisible: false,
    brandSearchStr: "",
    toggle: false // search bar is not open;
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
    const wishList = this.props.wishList.filter(
      wishItem => wishItem.productId !== item.productId
    );
    this.props.dispatch({ type: "REMOVE_FROM_WISHLIST", wishList });
    newItem.quantity = 1;
    newItem.totPrice = item.price;
    newItem.totCrossedPrice = item.crossedPrice;
    this.props.dispatch({ type: "ADD_TO_CART", cart: newItem });
  };

  handleWish = item => {
    if (this.checkWishListExistance(item.productId)) return;
    this.props.dispatch({ type: "ADD_TO_WISHLIST", item });
  };

  componentDidUpdate(prevProps, prevState) {
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

    if (prevState.items !== this.state.items) {
      if (this.state.items.length > 0) this.setState({ initLoad: false });
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
    this.setState({ items, brands, initLoad: true });
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

  handleFilter = () => {
    this.setState({ isFilterVisible: true });
    const { checkedBrands } = this.props;
    this.setState({ brandFilter: checkedBrands });
  };

  handleFilterClose = () => {
    this.setState({ isFilterVisible: false });
    const { brandFilter } = this.state;
    this.props.dispatch({ type: "CLEAR_BRAND_FILTER", brands: brandFilter });
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
                onClick={() => this.handleImageClick(item)}
              />
            </Link>
            <div className="buttons dont-display">
              <button
                className="cart-button"
                onClick={() => this.handleCart(item)}
                disabled={this.checkItemExistance(item.productId)}
              >
                {this.checkItemExistance(item.productId)
                  ? "ADDED TO CART"
                  : "ADD TO CART"}
              </button>
              <button
                onClick={() => this.handleWish(item)}
                className={(() => {
                  if (this.checkWishListExistance()) return "hide";
                  else {
                    if (this.checkWishListExistance(item.productId))
                      return "wish-button wishlisted";
                    else return "wish-button";
                  }
                })()}
              >
                {this.checkWishListExistance(item.productId)
                  ? "WISHLISTED"
                  : "WISHLIST"}
              </button>
            </div>
            <h4 className="brand">
              {item.brandName ? item.brandName : "Unknown"}
            </h4>
            <p className="title">{item.title}</p>
            <p className="price">₹{item.price}</p>
            <p className="crossed-price">₹{item.crossedPrice}</p>
            <p className="off">({item.discount}% OFF)</p>
          </div>
        ));
    }
  };

  handleApply = () => {
    this.setState({ isFilterVisible: false });
  };

  handleBrandChange = event => {
    const brandSearchStr = event.target.value;
    const { brands } = this.props;
    const newBrands = brands.filter(brand =>
      brand.toLowerCase().includes(brandSearchStr.toLowerCase())
    );
    this.setState({ brands: newBrands, brandSearchStr });
  };

  handleToggle = () => {
    const { toggle } = this.state;
    const { brands } = this.props;
    if (toggle) {
      this.setState(prevState => ({
        toggle: !prevState.toggle,
        brandSearchStr: "",
        brands
      }));
      console.log("open");
    } else this.setState(prevState => ({ toggle: !prevState.toggle }));
  };

  render() {
    const {
      searchStr,
      brands,
      items,
      isFilterVisible,
      brandSearchStr,
      toggle
    } = this.state;
    const { isLoading } = this.props;
    return (
      <>
        <div className="products-container">
          <Filter
            brands={brands}
            isFilterVisible={isFilterVisible}
            onHandleFilterClose={this.handleFilterClose}
            onHandleApply={this.handleApply}
            onHandleChange={this.handleBrandChange}
            searchStr={brandSearchStr}
            toggle={toggle}
            onHandleSearchToggle={this.handleToggle}
          />
          <div className="products-page">
            {items[0] === "Error" ? null : (
              <Search
                onHandleChange={this.handleChange}
                searchStr={searchStr}
                placeholder="Search for products"
                className="search"
              />
            )}
            <div className="products">{this.handleLoad()}</div>
            {isLoading ? (
              <div className="load-more">
                <Spinner name="three-bounce" />
              </div>
            ) : null}
          </div>
        </div>
        <div
          className={isFilterVisible ? "" : "filter-button"}
          onClick={this.handleFilter}
        >
          <button>{isFilterVisible ? "CLOSE" : "APPLY FILTERS"}</button>
        </div>
      </>
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
