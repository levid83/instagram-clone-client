import React, { useState, useEffect } from "react";

import Post from "../components/Post";

import PostService from "../services/Post.service";

import Spinner from "../styles/Spinner";

import { showError } from "../utils/toaster";

const postService = new PostService();

const SubscribedUserPosts = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    postService
      .getSubposts()
      .then((result) => {
        setData(result.posts);
      })
      .catch((err) => showError(err.message));
  }, []);

  const deletePost = (postId) => {
    postService
      .deletePost(postId)
      .then((result) =>
        setData(data.filter((item) => item._id !== result.postId))
      )
      .catch((err) => showError(err.message));
  };

  return (
    <div className="home">
      {data.length > 0 &&
        data.map((post) => (
          <Post post={post} key={post._id} onDelete={deletePost} />
        ))}
      {!data && <Spinner />}
    </div>
  );
};
export default React.memo(SubscribedUserPosts);
