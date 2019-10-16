import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

class ProductDesc extends Component {
  state = {
    currentIndex: null,
    imagesArray: [],
    disableNext: false,
    disablePrevious: true
  };

  componentDidMount() {
    const { item } = this.props;
    this.setState({ currentIndex: 0, imagesArray: item.imagesArray });
  }

  handleImageClick = currentIndex => {
    this.setState({ currentIndex });
  };

  handleMouseOver = currentIndex => {
    this.setState({ currentIndex });
  };

  handleCart = () => {
    const { item } = this.props;
    let newItem = { ...this.props.item };
    newItem.quantity = 1;
    newItem.totPrice = item.price;
    newItem.totCrossedPrice = item.crossedPrice;
    this.props.dispatch({ type: "ADD_TO_CART", cart: newItem });
  };

  checkItemExistance = () => {
    const { item, cart } = this.props;
    for (let cartItem of cart) {
      if (cartItem.productId === item.productId) return true;
    }
    return false;
  };

  handleWish = () => {
    const { dispatch, item } = this.props;
    if (this.checkWishListExistance(item.productId)) return;
    dispatch({ type: "ADD_TO_WISHLIST", item });
  };

  checkWishListExistance = productId => {
    const { wishList } = this.props;
    for (let wishItem of wishList) {
      if (wishItem.productId === productId) return true;
    }
    return false;
  };

  handleNext = () => {
    this.setState(prevState => ({ currentIndex: prevState.currentIndex + 1 }));
  };

  handlePrevious = () => {
    this.setState(prevState => ({ currentIndex: prevState.currentIndex - 1 }));
  };

  render() {
    const { imagesArray, currentIndex } = this.state;
    const { item } = this.props;
    return (
      <div className="product-desc-page">
        <div className="image-list">
          {imagesArray.map((image, index) => (
            <img
              className={currentIndex === index ? "highlight" : ""}
              src={image}
              key={index}
              alt={image}
              onClick={() => this.handleImageClick(index)}
              onMouseOver={() => this.handleMouseOver(index)}
            />
          ))}
        </div>
        <div className="product-desc">
          <div className="item-img">
            <img src={imagesArray[currentIndex]} alt="" />
          </div>
          <div className="slide-buttons">
            <button onClick={this.handlePrevious} disabled={currentIndex === 0}>
              PREVIOUS
            </button>
            <button
              onClick={this.handleNext}
              disabled={currentIndex === imagesArray.length - 1}
            >
              NEXT
            </button>
          </div>
        </div>
        <div className="product-details">
          <h1 className="brand-name">{item.brandName}</h1>
          <h1 className="title">{item.title}</h1>
          <div className="prices">
            <h3 className="price">₹{item.price}</h3>
            <p className="crossed-price">₹{item.crossedPrice}</p>
            <p className="off">({item.discount}% OFF) </p>
          </div>
          <h4 className="p-details">PRODUCT DETAILS</h4>
          <div className="details">
            <p>
              Sold on <span>{item.ecommerce ? item.ecommerce : "N/A"}</span>
            </p>
            <p>
              Wear type <span>{item.wearType ? item.wearType : "N/A"}</span>
            </p>
            <p>
              Gender <span>{item.gender === "" ? "Unisex" : item.gender}</span>
            </p>
            <a
              href={item.detailPageUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View product on seller's site &nbsp; &nbsp;
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </div>
          <div className="add-items">
            <button
              className="cart-button"
              onClick={this.handleCart}
              disabled={this.checkItemExistance(item.productId)}
            >
              {this.checkItemExistance() ? "ADDED TO CART" : "ADD TO CART"}
            </button>
            <button
              onClick={this.handleWish}
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    item: state.currentProduct,
    cart: state.cart,
    wishList: state.wishList
  };
};

export default connect(mapStateToProps)(ProductDesc);
