import React, { useState, useEffect } from "react";

import Post from "../components/Post";

import PostService from "../services/Post.service";

const postService = new PostService();

const SubscribedUserPosts = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    postService.getSubposts().then((result) => {
      setData(result.posts);
    });
  }, []);

  const deletePost = async (postId) => {
    const result = await postService.deletePost(postId);
    const newData = data.filter((item) => item._id !== result.postId);
    setData(newData);
  };

  return (
    <div className="home">
      {data.map((post) => (
        <Post post={post} key={post._id} onDelete={deletePost} />
      ))}
    </div>
  );
};
export default SubscribedUserPosts;
