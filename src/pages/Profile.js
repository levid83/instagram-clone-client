import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import PostService from "../services/Post.service";
import UserService from "../services/User.service";
import UploadService from "../services/Upload.service";
import PostList from "../components/PostList";
import { Card } from "../styles/Card";
import ProfilePicture from "../styles/ProfilePicture";
import UploadPicture from "../components/UploadPicture";

import styled from "styled-components";
import { UserProfile } from "../styles/UserProfile";

const Gallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const postService = new PostService();
const userService = new UserService();
const uploadService = new UploadService();

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [picture, setPicture] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state);

  useEffect(() => {
    postService.getMyPosts().then((result) => setPosts(result.posts));
  }, []);

  useEffect(() => {
    if (picture) {
      uploadService
        .uploadPicture(picture)
        .then(async (data) => {
          let result = await userService.updatePicture(data.url);
          localStorage.setItem(
            "user",
            JSON.stringify({ ...user, picture: result.picture })
          );
          dispatch({ type: "UPDATE_PICTURE", payload: result.picture });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picture]);

  return (
    <>
      <UserProfile className="card">
        <div className="picture">
          <ProfilePicture alt="profile" src={user.picture} />
          <UploadPicture onSetPicture={setPicture} />
        </div>
        <div>
          <h5>{user.name}</h5>
          <h6>{user.email}</h6>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{posts.length} posts</span>
            <span>{user.followers.length} followers</span>
            <span>{user.following.length} following</span>
          </div>
        </div>
      </UserProfile>
      <Card className="card">
        <Gallery>
          <PostList posts={posts} />
        </Gallery>
      </Card>
    </>
  );
};
export default Profile;
