import { FETCH_DRIVERS } from "../actions/actionTypes";

const initialState = {
  drivers: [],
};

// Reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DRIVERS:
      return {
        ...state,
        drivers: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
