import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import UploadService from "../services/Upload.service";
import PostService from "../services/Post.service";

import { Card } from "../styles/Card";
import UploadPicture from "../components/UploadPicture";

import styled from "styled-components";
import { device } from "../styles/devices";

import M from "materialize-css";

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

const uploadService = new UploadService();
const postService = new PostService();

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [picture, setPicture] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (picture) {
      setUploading(true);
      uploadService
        .uploadPicture(picture)
        .then((data) => {
          setPictureUrl(data.url);
          setUploading(false);
        })
        .catch((err) => {
          M.toast({ html: err.message, classes: "#c62828 red darken-3" });
          setPictureUrl("");
          setPicture("");
          setUploading(false);
        });
    }
  }, [picture]);

  const validFields = () => {
    if (!title.length) {
      M.toast({
        html: "Please enter a title",
        classes: "#c62828 red darken-3",
      });
      return false;
    }
    if (!body.length) {
      M.toast({
        html: "Please enter your post content",
        classes: "#c62828 red darken-3",
      });
      return false;
    }
    if (!picture) {
      M.toast({
        html: "Please upload your post picture",
        classes: "#c62828 red darken-3",
      });
      return false;
    }
    return true;
  };

  const submitPost = async () => {
    if (!validFields()) return;
    postService
      .createPost({
        title,
        body,
        pictureUrl,
      })
      .then((result) => {
        M.toast({
          html: "Your post has been successfully created",
          classes: "#43a047 green darken-1",
        });
        history.push("/");
      })
      .catch((err) => {
        M.toast({ html: err.message, classes: "#c62828 red darken-3" });
      });
  };

  return (
    <CreatePostCard className="card">
      <h5>Create post</h5>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Share your thoughts with the world..."
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      <UploadPicture
        onSetPicture={setPicture}
        withPreview={true}
        uploading={uploading}
      />
      <button
        className="btn waves-effect waves-light #64b5f6 blue darken-1 submit"
        onClick={() => submitPost()}
        disabled={uploading}
      >
        Submit post
      </button>
    </CreatePostCard>
  );
};
export default React.memo(CreatePost);
