import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import UploadService from "../services/Upload.service";
import PostService from "../services/Post.service";

import { Card } from "../styles/Card";
import UploadPicture from "../components/UploadPicture";

import styled from "styled-components";
import { device } from "../styles/devices";

import { showError, showSuccess } from "../utils/toaster";

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
          showError(err.message);
          setPictureUrl("");
          setPicture("");
          setUploading(false);
        });
    }
  }, [picture]);

  const validFields = () => {
    if (!title.length) {
      showError("Please enter a title");
      return false;
    }
    if (!body.length) {
      showError("Please enter your post content");
      return false;
    }
    if (!picture) {
      showError("Please upload your post picture");
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
        showSuccess("Your post has been successfully created");
        history.push("/");
      })
      .catch((err) => {
        showError(err.message);
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
