import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Home from "./Home";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </Provider>
  );
}

export default App;
