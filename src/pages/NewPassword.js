import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import M from "materialize-css";

import AuthService from "../services/Auth.service";

import { AuthCard } from "../styles/AuthCard";

const authService = new AuthService();

const NewPassword = () => {
  const history = useHistory();
  const [password, setPasword] = useState("");
  const { token } = useParams();

  const PostData = () => {
    authService
      .getNewPasswod(password, token)
      .then((message) => {
        M.toast({ html: message, classes: "#43a047 green darken-1" });
        history.push("/signin");
      })
      .catch((err) =>
        M.toast({ html: err.message, classes: "#c62828 red darken-3" })
      );
  };

  return (
    <AuthCard className="card">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <h5>New password</h5>

        <input
          type="password"
          placeholder="enter a new password"
          value={password}
          onChange={(e) => setPasword(e.target.value)}
        />
        <button
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={() => PostData()}
        >
          Update
        </button>
      </form>
    </AuthCard>
  );
};
export default NewPassword;
