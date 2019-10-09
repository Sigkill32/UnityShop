import React, { Component } from "react";
import { connect } from "react-redux";

class ProductDesc extends Component {
  state = {
    currentIndex: null,
    imagesArray: []
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
          <div className="add-items">
            <button>ADD TO CART</button>
            <button>WISHLIST</button>
          </div>
        </div>
        <div className="product-details">
          <h1>{item.brandName}</h1>
          <h3>{item.title}</h3>
          <hr />
          <div className="prices">
            <h3>{item.price}</h3>
            <p>{item.crossedPrice}</p>
            <p>{item.discount}% OFF </p>
          </div>
          <p>Sold on : {item.ecommerce}</p>
          <p>Wear type: {item.wearType}</p>
          <p>Gender: {item.gender === "" ? "Unisex" : item.gender}</p>
          <a
            href={item.detailPageUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View product on seller's site
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { item: state.currentProduct };
};

export default connect(mapStateToProps)(ProductDesc);
