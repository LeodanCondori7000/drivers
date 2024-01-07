import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// import store from "./driversApp/redux/store.js";
// import store from "./driversApp/redux-thunk/store.js";
import store from "./driversApp/reduxLogic/store";
import AllComponents from "./driversApp/AllComponents.jsx"

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AllComponents />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
