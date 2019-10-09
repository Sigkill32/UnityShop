import React, { Component } from "react";
import CheckBox from "./common/checkBox";
import CollapseButton from "./common/collapseButton";
import RadioButton from "./common/radioButton";
import { connect } from "react-redux";

class Filter extends Component {
  state = {
    brandCollapsed: true,
    discountCollapsed: false,
    radioVal: null
  };

  handleClick = collapseVar => {
    this.setState(prevState => ({ [collapseVar]: !prevState[collapseVar] }));
  };

  handleCheck = brand => {
    let checkedBrands = [...this.props.checkedBrands];
    const { dispatch } = this.props;
    if (!checkedBrands.includes(brand))
      dispatch({ type: "ADD_BRAND_FILTER", brand });
    else {
      checkedBrands = checkedBrands.filter(b => b !== brand);
      dispatch({ type: "REMOVE_BRAND_FILTER", checkedBrands });
    }
  };

  handleRadio = radioVal => {
    this.props.dispatch({ type: "UPDATE_RADIO_VAL", radioVal });
  };

  render() {
    const { brands, checkedBrands, radioVal } = this.props;
    const { brandCollapsed, discountCollapsed } = this.state;

    const radioVals = [10, 20, 30, 40, 50];
    return (
      <div className="filter">
        {brands.length === 0 ? null : (
          <>
            {" "}
            <h3>Filters</h3>
            <div className="brands">
              <div className="head">
                <h5>Brands</h5>
                <CollapseButton
                  collapsed={brandCollapsed}
                  onHandleClick={() => this.handleClick("brandCollapsed")}
                />
              </div>
              <div
                className={brandCollapsed ? "brand-names hide" : "brand-names"}
              >
                {brands.map(brand => (
                  <CheckBox
                    key={brand === "" ? "unknown" : brand}
                    name={brand === "" ? "unknown" : brand}
                    onHandleCheck={() => this.handleCheck(brand)}
                    value={brand === "" ? "unknown" : brand}
                    checked={checkedBrands.includes(brand)}
                  />
                ))}
              </div>
            </div>
            <div className="discounts">
              <div className="head">
                <h5>Discount range</h5>
                <CollapseButton
                  collapsed={discountCollapsed}
                  onHandleClick={() => this.handleClick("discountCollapsed")}
                />
              </div>
              <div
                className={
                  discountCollapsed ? "disconut-list hide" : "disconut-list"
                }
              >
                {radioVals.map(val => (
                  <RadioButton
                    key={val}
                    onHandleRadio={() => this.handleRadio(val)}
                    value={val}
                    checked={val === radioVal}
                    name={`${val}% or more`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { checkedBrands: state.checkedBrands, radioVal: state.radioVal };
};

export default connect(mapStateToProps)(Filter);
