import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import PostService from "../services/Post.service";

import { PostCard, PictureContainer, PostContent } from "../styles/PostCard";
import LikeIcon from "../styles/LikeIcon";
import CreateComment from "./CreateComment";
import PostComments from "./PostComments";

const postService = new PostService();

const Post = (props) => {
  const user = useSelector((state) => state);
  const [post, setPost] = useState(props.post);

  const { onDelete } = props;

  const toggleLike = async (id) => {
    if (post.likes.includes(user.id)) setPost(await postService.unlikePost(id));
    else setPost(await postService.likePost(id));
  };
  const isLiked = () => {
    return post.likes.includes(user.id);
  };

  const comment = async (text, postId) => {
    setPost(await postService.addPostComment(text, postId));
  };

  return (
    <PostCard className="card" key={post._id}>
      <PictureContainer>
        <img src={post.photo} alt="" />
        <div className="overlay">
          <h6>{post.title}</h6>
          <div className="likes">
            <span>
              <LikeIcon
                className="material-icons"
                onClick={() => toggleLike(post._id)}
                liked={isLiked()}
              >
                favorite
              </LikeIcon>
              {post.likes.length} likes{" "}
            </span>
            {post.postedBy._id === user.id && (
              <i className="material-icons" onClick={() => onDelete(post._id)}>
                delete
              </i>
            )}
          </div>
        </div>
      </PictureContainer>
      <PostContent className="content">
        <Link
          to={
            post.postedBy._id !== user.id
              ? "/user-profile/" + post.postedBy._id
              : "/profile"
          }
        >
          {post.postedBy.name}
        </Link>
        : {post.body}
        <PostComments comments={post.comments} />
        <CreateComment onComment={comment} postId={post._id} />
      </PostContent>
    </PostCard>
  );
};
export default Post;
