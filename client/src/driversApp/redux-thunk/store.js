import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import usersReducer from './reducer.js'; // Import your individual reducers

// Combine your reducers
const rootReducer = combineReducers({
  users: usersReducer,
  // Add other slices or features here
});

// Apply middleware (Redux Thunk)
const middleware = applyMiddleware(thunkMiddleware);

// Create the Redux store with middleware
const store = createStore(rootReducer, middleware);

export default store;
