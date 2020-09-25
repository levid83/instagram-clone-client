import React from "react";
import styled from "styled-components";
import { PictureContainer } from "../styles/PostCard";

const PostListContainer = styled.div`
  margin: 10px 0;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostList = (props) => {
  const { posts } = props;
  return (
    <PostListContainer>
      {posts.map((post) => (
        <PictureContainer key={post._id}>
          {post.photo ? (
            <>
              <img
                key={post._id}
                className="post-image"
                src={post.photo}
                alt={post.title}
              />
              <div className="overlay">
                <h6>{post.title}</h6>
              </div>
            </>
          ) : (
            <h6>{post.title}</h6>
          )}
        </PictureContainer>
      ))}
    </PostListContainer>
  );
};
export default PostList;
