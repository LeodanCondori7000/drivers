// store.js

import { createStore, combineReducers } from 'redux';
import counterReducer from '../redux/reducer.js'; // Import your individual reducers

// Combine your reducers
const rootReducer = combineReducers({
  counter: counterReducer, // Add more reducers as needed
  // Add other slices or features here
});

// Create the Redux store
const store = createStore(rootReducer);

export default store;
