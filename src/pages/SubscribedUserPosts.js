import React, { useState, useEffect } from "react";

import Post from "../components/Post";

import PostService from "../services/Post.service";

import Spinner from "../styles/Spinner";

import M from "materialize-css";

const postService = new PostService();

const SubscribedUserPosts = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    postService
      .getSubposts()
      .then((result) => {
        setData(result.posts);
      })
      .catch((err) =>
        M.toast({ html: err.message, classes: "#c62828 red darken-3" })
      );
  }, []);

  const deletePost = (postId) => {
    postService
      .deletePost(postId)
      .then((result) =>
        setData(data.filter((item) => item._id !== result.postId))
      )
      .catch((err) =>
        M.toast({ html: err.message, classes: "#c62828 red darken-3" })
      );
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
