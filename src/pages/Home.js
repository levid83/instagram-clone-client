import React, { useState, useEffect } from "react";
import Post from "../components/Post";
import { Home as StyledHome } from "../styles/Home";
import PostService from "../services/Post.service";
import Spinner from "../styles/Spinner";

import { showError } from "../utils/toaster";

const postService = new PostService();

const Home = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    postService
      .getAllPosts()
      .then((result) => setPosts(result.posts))
      .catch((err) => {
        showError("Cannot load posts. Please try again later.");
        setPosts([]);
      });
  }, []);

  const deletePost = (postId) => {
    postService.deletePost(postId).then((result) => {
      setPosts(posts.filter((post) => post._id !== result.postId));
    });
  };
  return (
    <StyledHome>
      {posts &&
        posts.map((post) => (
          <Post post={post} key={post._id} onDelete={deletePost} />
        ))}
      {!posts && <Spinner />}
    </StyledHome>
  );
};
export default React.memo(Home);
