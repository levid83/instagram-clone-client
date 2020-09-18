import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { UserAction } from "./redux/userReducer";
import store from "./redux/store";
import Routing from "./routes";

import "./App.css";

import NavBar from "./components/NavBar";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: UserAction.SET_USER, payload: user });
    }
  });
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
