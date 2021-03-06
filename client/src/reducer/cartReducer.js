import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} }, // adding shippingAdresss in our state due to shipping case
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      //  setting our current item here
      const item = action.payload;

      // checking if our item exist in the state of our CartItems
      // x.product and item.product is actually matching the id
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    default:
      return state;
  }
};
