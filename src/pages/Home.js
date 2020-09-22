import React, { useState, useEffect } from "react";
import UserPost from "../components/UserPost";

import PostService from "../services/Post.service";

const postService = new PostService();

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService.getAllPosts().then((result) => setPosts(result.posts));
  }, []);

  const deletePost = (postId) => {
    postService.deletePost(postId).then((result) => {
      setPosts(posts.filter((post) => post._id !== result._id));
    });
  };
  return (
    <div className="home">
      {posts.map((post) => (
        <UserPost post={post} key={post._id} onDelete={deletePost} />
      ))}
    </div>
  );
};
export default Home;
