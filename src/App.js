import React, { createContext, useReducer } from "react";
import { BrowserRouter } from "react-router-dom";
import { reducer, initialState } from "./reducers/userReducer";

import "./App.css";

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter></BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
