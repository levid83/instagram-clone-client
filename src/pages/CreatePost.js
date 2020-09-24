import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

import UploadService from "../services/Upload.service";
import PostService from "../services/Post.service";

import { Card } from "../styles/Card";
import UploadPicture from "../components/UploadPicture";
import styled from "styled-components";
import { device } from "../styles/devices";

const CreatePostCard = styled(Card)`
  @media ${device.small} {
    max-width: 70%;
  }
  @media ${device.medium} {
    max-width: 60%;
  }

  @media ${device.large} {
    max-width: 40%;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
            html: "Your post has been successfully created",
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
    <CreatePostCard className="card">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <h5>Create post</h5>
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
        <UploadPicture onSetPicture={setImage} />
        <button
          className="btn waves-effect waves-light #64b5f6 blue darken-1 submit"
          onClick={() => postPicture()}
        >
          Submit post
        </button>
      </form>
    </CreatePostCard>
  );
};
export default CreatePost;
