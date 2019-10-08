import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="home-page">
        <div className="home">
          <div className="home-head">
            <h1>Unity Shop</h1>
            <h3>
              All your favorite products from your favorite sites in one place
            </h3>
          </div>
          <div className="home-hero">
            <p>Explore various products from your favorite shoping sites.</p>
            <p>
              Order the product you like and sit back, we'll do the shoping for
              you.
            </p>
          </div>
          <div className="category">
            <Link to="/products">Explore</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
