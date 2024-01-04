import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./driversApp/redux/store.js";
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
