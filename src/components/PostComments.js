import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PostComments = (props) => {
  const user = useSelector((state) => state);
  const { comments } = props;
  return comments.map((comment) => {
    return (
      <div className="comment" key={comment._id}>
        <div>
          <Link
            to={
              comment.postedBy._id !== user.id
                ? "/user-profile/" + comment.postedBy._id
                : "/profile"
            }
          >
            {comment.postedBy.name}:
          </Link>
        </div>
        <div>{comment.text}</div>
      </div>
    );
  });
};
export default React.memo(PostComments);
