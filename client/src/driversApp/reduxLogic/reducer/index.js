import { FETCH_DRIVERS, SEARCH_DRIVERS } from "../actions/actionTypes";

const initialState = {
  drivers: [],
  searchedDriver: []
};

// Reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DRIVERS:
      return {
        ...state,
        drivers: action.payload
      };
    case SEARCH_DRIVERS:
      return {
        ...state,
        searchedDriver: action.payload
      }
    default:
      return state;
  }
};

export default reducer;
