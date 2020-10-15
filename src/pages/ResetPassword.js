import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { showError, showSuccess } from "../utils/toaster";

import AuthService from "../services/Auth.service";

import { AuthCard } from "../styles/AuthCard";

const authService = new AuthService();

const ResetPassword = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");

  const postEmail = () => {
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      showError("invalid email");
      return;
    }
    authService
      .resetPasswod(email)
      .then((message) => {
        showSuccess(message);
        history.push("/signin");
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
        <h5>Reset password</h5>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={() => postEmail()}
        >
          Submit
        </button>
      </form>
    </AuthCard>
  );
};
export default ResetPassword;
