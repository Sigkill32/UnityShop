import React, { Component } from "react";
import CheckBox from "./common/checkBox";
import CollapseButton from "./common/collapseButton";
import RadioButton from "./common/radioButton";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class Filter extends Component {
  state = {
    brandCollapsed: false,
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
    const {
      brands,
      checkedBrands,
      radioVal,
      isFilterVisible,
      onHandleFilterClose
    } = this.props;
    const { brandCollapsed, discountCollapsed } = this.state;

    const radioVals = [10, 20, 30, 40, 50];
    return (
      <div
        className={
          isFilterVisible ? "filter show-filter" : "filter hide-filter"
        }
      >
        {brands.length === 0 ? null : (
          <>
            {" "}
            <h3>FILTERS</h3>
            <button
              className={
                isFilterVisible ? "filter-close" : "filter-close hide-close"
              }
              onClick={onHandleFilterClose}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="brands">
              <div className="head">
                <h5>BRANDS</h5>
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
                    className="brand-checkbox"
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
                <h5>DISCOUNT RANGE</h5>
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
                    className="discount-range"
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
