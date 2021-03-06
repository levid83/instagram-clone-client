import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import PostService from "../services/Post.service";
import UserService from "../services/User.service";
import UploadService from "../services/Upload.service";

import PostList from "../components/PostList";
import UploadPicture from "../components/UploadPicture";

import { UserProfile } from "../styles/UserProfile";
import { Gallery } from "../styles/Gallery";
import ProfilePicture from "../styles/ProfilePicture";
import Spinner from "../styles/Spinner";

import { showError } from "../utils/toaster";

const postService = new PostService();
const userService = new UserService();
const uploadService = new UploadService();

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [picture, setPicture] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state);

  useEffect(() => {
    postService
      .getMyPosts()
      .then((result) => setPosts(result.posts))
      .catch((err) => showError(err.message));
  }, []);

  useEffect(() => {
    if (picture) {
      setUploading(true);
      uploadService
        .uploadPicture(picture)
        .then(async (data) => {
          await updatePictureUrl(data.url);
          setUploading(false);
        })
        .catch((err) => {
          showError(err.message);
          setUploading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picture]);

  const updatePictureUrl = async (url) => {
    try {
      let result = await userService.updatePicture(url);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, picture: result.picture })
      );
      dispatch({ type: "UPDATE_PICTURE", payload: result.picture });
    } catch (err) {
      showError(err.message);
    }
  };

  const renderPosts = (posts) => {
    if (posts) {
      return (
        <Gallery>
          <PostList posts={posts} />
        </Gallery>
      );
    } else {
      return <Spinner />;
    }
  };
  return (
    <>
      <UserProfile className="card">
        <div className="picture">
          <ProfilePicture alt="profile" src={user.picture} />
        </div>
        <div>
          <h6>{user.name}</h6>
          <h6>{user.email}</h6>
          <div className="stats">
            <span>{posts.length} posts</span>
            <span>{user.followers.length} followers</span>
            <span>{user.following.length} following</span>
          </div>
          <UploadPicture onSetPicture={setPicture} uploading={uploading} />
        </div>
      </UserProfile>
      {renderPosts(posts)}
    </>
  );
};
export default React.memo(Profile);
