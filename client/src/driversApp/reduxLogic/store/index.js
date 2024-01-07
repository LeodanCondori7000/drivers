import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducer'; // Import your individual reducers

// Combine your reducers
const rootReducer = combineReducers({
  drivers: reducer,
  // Add other slices or features here
});

// Apply middleware (Redux Thunk)
const middleware = applyMiddleware(thunkMiddleware);

// Create the Redux store with middleware
const store = createStore(rootReducer, middleware);

export default store;
