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
    default:
      return state;
  }
}

const initState = {
  items: [],
  cart: [],
  brands: []
};
