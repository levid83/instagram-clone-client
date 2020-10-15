import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import AuthService from "../services/Auth.service";
import { UserAction } from "../redux/userReducer";

import { showError, showSuccess } from "../utils/toaster";
import { AuthCard } from "../styles/AuthCard";

const SignIn = () => {
  const history = useHistory();

  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const PostData = () => {
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      showError("Invalid email address");
      return;
    }
    const authService = new AuthService();
    authService
      .signin({ email, password })
      .then((user) => {
        authService.saveLocalUser(user);
        dispatch({
          type: UserAction.SET_USER,
          payload: authService.getLocalUser(),
        });
        showSuccess("You have successfully signed in.");
        history.push("/");
      })
      .catch((err) => showError(err.message));
  };
  return (
    <AuthCard className="card">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <h5>Sign In</h5>
        <input
          type="text"
          placeholder="email"
          value={email}
          autoComplete="username"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPasword(e.target.value)}
        />
        <button
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={(e) => PostData(e)}
        >
          Login
        </button>
        <div className="links">
          <Link to="/signup">No account yet?</Link>
          <Link to="/reset-password">Forgot password ?</Link>
        </div>
      </form>
    </AuthCard>
  );
};
export default React.memo(SignIn);
