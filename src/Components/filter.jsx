import React, { Component } from "react";
import CheckBox from "./common/checkBox";
import CollapseButton from "./common/collapseButton";

class Filter extends Component {
  state = {
    brandCollapsed: true
  };

  handleClick = () => {
    this.setState(prevState => ({ brandCollapsed: !prevState.brandCollapsed }));
  };

  render() {
    const { brands, checked, onHandleCheck } = this.props;
    const { brandCollapsed } = this.state;
    return (
      <div className="filter">
        {brands.length === 0 ? null : (
          <>
            {" "}
            <h3>Filters</h3>
            <div className="brands">
              <div className="brand-head">
                <h5>Brands</h5>
                <CollapseButton
                  brandCollapsed={brandCollapsed}
                  onHandleClick={this.handleClick}
                />
              </div>
              <div
                className={brandCollapsed ? "brand-names hide" : "brand-names"}
              >
                {brands.map(brand => (
                  <CheckBox
                    key={brand === "" ? "unknown" : brand}
                    name={brand === "" ? "unknown" : brand}
                    onHandleCheck={onHandleCheck}
                    value={brand === "" ? "unknown" : brand}
                    checked={checked}
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

export default Filter;
