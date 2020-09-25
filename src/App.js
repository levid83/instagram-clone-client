import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { UserAction } from "./redux/userReducer";
import AuthService from "./services/Auth.service";

import Routing from "./routes";

import NavBar from "./components/NavBar";
import Global from "./styles/Global";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const authService = new AuthService();
    if (!authService.expiredToken()) {
      dispatch({
        type: UserAction.SET_USER,
        payload: authService.getLocalUser(),
      });
    }
  });
  return (
    <BrowserRouter>
      <Global />
      <NavBar />
      <Routing />
    </BrowserRouter>
  );
}

export default App;
