import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import PostService from "../../services/Post.service";

const postService = new PostService();

const SubscribedUserPosts = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state);
  useEffect(() => {
    postService.getSubposts().then((result) => {
      setData(result.posts);
    });
  }, []);

  const likePost = async (id) => {
    const result = await postService.likePost(id);
    const newData = data.map((item) =>
      item._id === result._id ? result : item
    );
    setData(newData);
  };
  const unlikePost = async (id) => {
    const result = await postService.unlikePost(id);
    const newData = data.map((item) =>
      item._id === result._id ? result : item
    );
    setData(newData);
  };

  const makeComment = async (text, postId) => {
    const result = await postService.addPostComment(text, postId);
    const newData = data.map((item) =>
      item._id === result._id ? result : item
    );
    setData(newData);
  };

  const deletePost = async (postId) => {
    const result = await postService.addPostComment(postId);
    const newData = data.filter((item) => item._id !== result._id);
    setData(newData);
  };

  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h5 style={{ padding: "5px" }}>
              <Link
                to={
                  item.postedBy._id !== user.id
                    ? "/user/" + item.postedBy._id
                    : "/user"
                }
              >
                {item.postedBy.name}
              </Link>
              {item.postedBy._id === user.id && (
                <i
                  className="material-icons"
                  style={{
                    float: "right",
                  }}
                  onClick={() => deletePost(item._id)}
                >
                  delete
                </i>
              )}
            </h5>
            <div className="card-image">
              <img src={item.photo} alt="" />
            </div>
            <div className="card-content">
              <i className="material-icons" style={{ color: "red" }}>
                favorite
              </i>
              {item.likes.includes(user.id) ? (
                <i
                  className="material-icons"
                  onClick={() => {
                    unlikePost(item._id);
                  }}
                >
                  thumb_down
                </i>
              ) : (
                <i
                  className="material-icons"
                  onClick={() => {
                    likePost(item._id);
                  }}
                >
                  thumb_up
                </i>
              )}

              <h6>{item.likes.length} likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              {item.comments.map((record) => {
                return (
                  <h6 key={record._id}>
                    <span style={{ fontWeight: "500" }}>
                      {record.postedBy.name}
                    </span>
                    {": "}
                    {record.text}
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  makeComment(e.target[0].value, item._id);
                }}
              >
                <input type="text" placeholder="add a comment" />
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default SubscribedUserPosts;
