import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import PostService from "../services/Post.service";
import UserService from "../services/User.service";
import UploadService from "../services/Upload.service";
import PostList from "../components/PostList";

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
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div
        style={{
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>
            <img
              alt="profile"
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src={user ? user.picture : "loading"}
            />
          </div>
          <div>
            <h4>{user ? user.name : "loading"}</h4>
            <h5>{user ? user.email : "loading"}</h5>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "108%",
              }}
            >
              <h6>{posts.length} posts</h6>
              <h6>{user ? user.followers.length : "0"} followers</h6>
              <h6>{user ? user.following.length : "0"} following</h6>
            </div>
          </div>
        </div>

        <div className="file-field input-field" style={{ margin: "10px" }}>
          <div className="btn #64b5f6 blue darken-1">
            <span>Update picture</span>
            <input
              type="file"
              onChange={(e) => setPicture(e.target.files[0])}
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
      </div>
      <div className="gallery">
        <PostList posts={posts} />
      </div>
    </div>
  );
};
export default Profile;
