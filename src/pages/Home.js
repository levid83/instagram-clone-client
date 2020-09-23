import React, { useState, useEffect } from "react";
import Post from "../components/Post";

import PostService from "../services/Post.service";

const postService = new PostService();

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService.getAllPosts().then((result) => setPosts(result.posts));
  }, []);

  const deletePost = (postId) => {
    postService.deletePost(postId).then((result) => {
      setPosts(posts.filter((post) => post._id !== result.postId));
    });
  };
  return (
    <div className="home">
      {posts.map((post) => (
        <Post post={post} key={post._id} onDelete={deletePost} />
      ))}
    </div>
  );
};
export default Home;
