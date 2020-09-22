import React from "react";
const PostList = (props) => {
  const { posts } = props;
  return posts.map((item) =>
    item.photo ? (
      <img key={item._id} className="item" src={item.photo} alt={item.title} />
    ) : (
      <div key={item._id} className="item">
        {item.title}
      </div>
    )
  );
};
export default PostList;
