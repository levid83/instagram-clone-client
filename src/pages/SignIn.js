import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import AuthService from "../services/Auth.service";
import { UserAction } from "../redux/userReducer";

import M from "materialize-css";

const SignIn = () => {
  const history = useHistory();

  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const PostData = async () => {
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "invalid email", classes: "#c62828 red darken-3" });
      return;
    }
    const authService = new AuthService();
    const data = await authService.signin({ email, password });

    if (data.error) {
      M.toast({ html: data.error, classes: "#c62828 red darken-3" });
    } else {
      authService.saveLocalUser(data);
      dispatch({
        type: UserAction.SET_USER,
        payload: authService.getLocalUser(),
      });
      M.toast({
        html: "signedin success",
        classes: "#43a047 green darken-1",
      });
      history.push("/");
    }
  };
  return (
    <div className="mycard">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="card auth-card input-field">
          <h2>Instagram</h2>
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
          <h5>
            <Link to="/signup">Dont have an account ?</Link>
          </h5>
          <h6>
            <Link to="/reset-password">Forgot password ?</Link>
          </h6>
        </div>
      </form>
    </div>
  );
};
export default React.memo(SignIn);
