import React, { useState, useEffect } from "react";
import Post from "../components/Post";

import PostService from "../services/Post.service";
import Spinner from "../styles/Spinner";

const postService = new PostService();

const Home = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    postService.getAllPosts().then((result) => setPosts(result.posts));
  }, []);

  const deletePost = (postId) => {
    postService.deletePost(postId).then((result) => {
      setPosts(posts.filter((post) => post._id !== result.postId));
    });
  };
  return (
    <>
      {posts &&
        posts.map((post) => (
          <Post post={post} key={post._id} onDelete={deletePost} />
        ))}
      {!posts && <Spinner />}
    </>
  );
};
export default React.memo(Home);
