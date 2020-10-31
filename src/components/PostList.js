import React from "react";
import styled from "styled-components";
import { Card } from "../styles/Card";
import { PictureContainer } from "../styles/PostCard";

const PostListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

const PostList = (props) => {
  const { posts } = props;
  return (
    <PostListContainer>
      {posts &&
        posts.length > 0 &&
        posts.map((post) => (
          <Card>
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
          </Card>
        ))}
      {!posts.length && <div>There are no posts yet...</div>}
    </PostListContainer>
  );
};
export default PostList;
