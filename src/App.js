import React, { createContext, useReducer } from "react";
import { BrowserRouter } from "react-router-dom";
import { reducer, initialState } from "./reducers/userReducer";
import Routing from "./routes";

import "./App.css";

import NavBar from "./components/Navbar";

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
