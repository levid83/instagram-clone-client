import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import AuthService from "../services/Auth.service";
import UploadService from "../services/Upload.service";

import UploadPicture from "../components/UploadPicture";

import M from "materialize-css";
import { AuthCard } from "../styles/AuthCard";

const uploadService = new UploadService();

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (picture) {
      setUploading(true);
      uploadService
        .uploadPicture(picture)
        .then(async (data) => {
          dispatch({ type: "UPDATE_PICTURE", payload: data.url });
          setPictureUrl(data.url);
          setUploading(false);
        })
        .catch((err) => {
          M.toast({ html: err.message, classes: "#c62828 red darken-3" });
          setPictureUrl("");
          setUploading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picture]);

  const validFields = () => {
    if (name.length < 1) {
      M.toast({
        html: "Please enter your name",
        classes: "#c62828 red darken-3",
      });
      return false;
    }
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({
        html: "Invalid email address",
        classes: "#c62828 red darken-3",
      });
      return false;
    }
    if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(
        password
      )
    ) {
      M.toast({
        html: `Your password needs to:<br>
        - include both lower and upper case characters<br>
        - include at least one number<br>
        - include at least one symbol<br>
        - be at least 8 characters long`,
        classes: "#c62828 red darken-3",
      });
      return false;
    }
    if (!picture) {
      M.toast({
        html: "Please add a profile picture",
        classes: "#c62828 red darken-3",
      });
      return false;
    }
    return true;
  };

  const submitForm = async () => {
    if (!validFields()) return;
    try {
      const result = await new AuthService().signup({
        name,
        password,
        email,
        picture: pictureUrl,
      });
      M.toast({ html: result.message, classes: "#43a047 green darken-1" });
      history.push("/signin");
    } catch (err) {
      M.toast({ html: err.message, classes: "#c62828 red darken-3" });
    }
  };

  return (
    <AuthCard className="card">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <h5>Sign Up</h5>
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
        <UploadPicture
          onSetPicture={setPicture}
          withPreview
          uploading={uploading}
        />
        <div className="links">
          <button
            className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={(e) => submitForm()}
            disabled={uploading}
          >
            Sign Up
          </button>
          <Link to="/signin">&#x2190; Back to login</Link>
        </div>
      </form>
    </AuthCard>
  );
};
export default React.memo(SignUp);
