import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PostComment } from "../styles/PostComment";

const PostComments = (props) => {
  const user = useSelector((state) => state);
  const { comments } = props;
  return comments.map((comment) => {
    return (
      <PostComment key={comment._id}>
        <div>
          <Link
            to={
              comment.postedBy._id !== user._id
                ? "/user-profile/" + comment.postedBy._id
                : "/profile"
            }
          >
            {comment.postedBy.name}:
          </Link>
        </div>
        <div>{comment.text}</div>
      </PostComment>
    );
  });
};
export default React.memo(PostComments);
