import React, { Component } from "react";
import Navbar from "./Components/navbar";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Components/home";
import About from "./Components/about";
import Cart from "./Components/cart";
import Products from "./Components/products";
import "./App.css";
import Wishlist from "./Components/wishlist";
import axios from "axios";
import { connect } from "react-redux";
import ProductDesc from "./Components/productDesc";

class App extends Component {
  state = {};

  // async componentDidMount() {
  //   const { data } = await axios.get(
  //     "https://fresh-rope-219511.appspot.com/?page=2"
  //   );
  //   this.props.dispatch({ type: "DATA_FETCHED", data });
  // }

  componentDidMount() {
    this.props.dispatch({ type: "FETCH_DATA" });
  }

  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/cart" component={Cart} />
          <Route path="/products" component={Products} />
          <Route path="/wishlist" component={Wishlist} />
          <Route path="/product/:id" component={ProductDesc} />
          {/* <Redirect to="/not-found" component={NotFound} /> */}
        </Switch>
      </>
    );
  }
}

const mapStateToProps = state => {
  return { items: state.items };
};

export default connect(mapStateToProps)(App);
