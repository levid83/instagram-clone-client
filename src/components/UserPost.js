import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import PostService from "../services/Post.service";

const postService = new PostService();

const UserPost = (props) => {
  const user = useSelector((state) => state);
  const [post, setPost] = useState(props.post);

  const { onDelete } = props;

  const like = async (id) => {
    setPost(await postService.likePost(id));
  };
  const unlike = async (id) => {
    setPost(await postService.unlikePost(id));
  };

  const makeComment = async (text, postId) => {
    setPost(await postService.addPostComment(text, postId));
  };

  return (
    <div className="card home-card" key={post._id}>
      <h5 style={{ padding: "5px" }}>
        <Link
          to={
            post.postedBy._id !== user.id
              ? "/user/" + post.postedBy._id
              : "/user"
          }
        >
          {post.postedBy.name}
        </Link>
        {post.postedBy._id === user.id && (
          <i
            className="material-icons"
            style={{
              float: "right",
            }}
            onClick={() => onDelete(post._id)}
          >
            delete
          </i>
        )}
      </h5>
      <div className="card-image">
        <img src={post.photo} alt="" />
      </div>
      <div className="card-content">
        <i className="material-icons" style={{ color: "red" }}>
          favorite
        </i>
        {post.likes.includes(user.id) ? (
          <i
            className="material-icons"
            onClick={() => {
              unlike(post._id);
            }}
          >
            thumb_down
          </i>
        ) : (
          <i
            className="material-icons"
            onClick={() => {
              like(post._id);
            }}
          >
            thumb_up
          </i>
        )}

        <h6>{post.likes.length} likes</h6>
        <h6>{post.title}</h6>
        <p>{post.body}</p>
        {post.comments.map((record) => {
          return (
            <h6 key={record._id}>
              <span style={{ fontWeight: "500" }}>{record.postedBy.name}</span>
              {": "}
              {record.text}
            </h6>
          );
        })}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            makeComment(e.target[0].value, post._id);
          }}
        >
          <input type="text" placeholder="add a comment" />
        </form>
      </div>
    </div>
  );
};
export default UserPost;
