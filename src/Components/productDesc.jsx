import React, { Component } from "react";

class ProductDesc extends Component {
  state = {
    currentImage: "",
    index: null
  };

  componentDidMount() {
    const { item } = this.props;
    this.setState({ currentImage: item.imagesArray[0], index: 0 });
  }

  handleNext = () => {
    this.setState(prevState => ({ index: prevState.index + 1 }));
  };

  render() {
    const { item } = this.props;
    const { currentImage, index } = this.state;
    return (
      <div className="product-desc">
        <div className="item-img">
          <button onClick={this.handlePrev} disabled={index === 0}>
            prev
          </button>
          <img src={currentImage} alt="" />
          <button
            onClick={this.handleNext}
            disabled={index === item.length - 1}
          >
            next
          </button>
        </div>
      </div>
    );
  }
}

export default ProductDesc;
