import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

import UploadService from "../../services/Upload.service";
import PostService from "../../services/Post.service";

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");

  useEffect(() => {
    const createPost = async () => {
      if (pictureUrl) {
        let result = await new PostService().createPost({
          title,
          body,
          pictureUrl,
        });
        if (result.error) {
          M.toast({ html: result.error, classes: "#c62828 red darken-3" });
        } else {
          M.toast({
            html: "Post has been successfully created",
            classes: "#43a047 green darken-1",
          });
          history.push("/");
        }
      }
    };
    createPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pictureUrl]);

  const postPicture = async () => {
    const result = await new UploadService().uploadPicture(image);
    if (result && result.url) setPictureUrl(result.url);
    else
      M.toast({ html: result.error.message, classes: "#c62828 red darken-3" });
  };

  return (
    <div
      className="card input-field"
      style={{
        margin: "30px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn #64b5f6 blue darken-1">
          <span>Upload picture</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        className="btn waves-effect waves-light #64b5f6 blue darken-1"
        onClick={() => postPicture()}
      >
        Submit post
      </button>
    </div>
  );
};
export default CreatePost;
