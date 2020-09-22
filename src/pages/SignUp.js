import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthService from "../services/Auth.service";
import UploadService from "../services/Upload.service";

import M from "materialize-css";

const SignUp = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [pictureUrl, setPictureUrl] = useState(undefined);

  useEffect(() => {
    if (pictureUrl) uploadFields();
  });

  const uploadPicture = async () => {
    const picture = await new UploadService().uploadPicture(image);
    if (picture) setPictureUrl(picture.pictureUrl);
  };

  const uploadFields = async () => {
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "invalid email", classes: "#c62828 red darken-3" });
      return;
    }
    const data = await new AuthService().signup({
      name,
      password,
      email,
      pictureUrl,
    });
    if (data.error) {
      M.toast({ html: data.error, classes: "#c62828 red darken-3" });
    } else {
      M.toast({ html: data.message, classes: "#43a047 green darken-1" });
      history.push("/signin");
    }
  };

  const PostData = () => {
    if (image) {
      uploadPicture();
    } else {
      uploadFields();
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
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
              <span>Upload picture</span>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
          <button
            className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={(e) => PostData(e)}
          >
            Sign Up
          </button>
          <h5>
            <Link to="/signin">Already have an account ?</Link>
          </h5>
        </div>
      </form>
    </div>
  );
};
export default React.memo(SignUp);
