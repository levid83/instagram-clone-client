import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import M from "materialize-css";

import AuthService from "../services/Auth.service";

const authService = new AuthService();

const NewPassword = () => {
  const history = useHistory();
  const [password, setPasword] = useState("");
  const { token } = useParams();

  const PostData = async () => {
    const result = await authService.getNewPasswod(password, token);
    if (result.error) {
      M.toast({ html: result.error, classes: "#c62828 red darken-3" });
    } else {
      M.toast({ html: result.message, classes: "#43a047 green darken-1" });
      history.push("/signin");
    }
  };

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>

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
          Update password
        </button>
      </div>
    </div>
  );
};
export default NewPassword;
