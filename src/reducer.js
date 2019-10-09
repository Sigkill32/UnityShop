export function reducer(state = initState, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.cart] };
    case "DATA_FETCHED":
      const { productsArray: items, brands } = action.data;
      return { ...state, items: [...items], brands: [...brands] };
    case "REMOVE_FROM_CART":
      return { ...state, cart: [...action.cart] };
    case "DEC_ITEM":
      return { ...state, cart: [...action.cart] };
    case "INC_ITEM":
      return { ...state, cart: [...action.cart] };
    case "FETCH_BRANDS":
      return { ...state, brands: [...action.brands] };
    case "ADD_BRAND_FILTER":
      return {
        ...state,
        checkedBrands: [...state.checkedBrands, action.brand]
      };
    case "UPDATE_RADIO_VAL":
      return { ...state, radioVal: action.radioVal };
    case "REMOVE_BRAND_FILTER":
      return { ...state, checkedBrands: [...action.checkedBrands] };
    case "UPDATE_CURRENT_PRODUCT":
      return { ...state, currentProduct: action.currentProduct };
    default:
      return state;
  }
}

const initState = {
  items: [],
  cart: [],
  brands: [],
  radioVal: null,
  checkedBrands: [],
  currentProduct: null
};
