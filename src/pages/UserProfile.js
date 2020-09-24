import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import PostList from "../components/PostList";
import { UserAction } from "../redux/userReducer";

import UserService from "../services/User.service";
import ProfilePicture from "../styles/ProfilePicture";

const userService = new UserService();

const UserProfile = () => {
  const [userProfile, setProfile] = useState(null);
  const user = useSelector((state) => state);
  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    userService.getUser(userId).then((result) => setProfile(result));
  }, [userId]);

  const toggleFollowUser = async () => {
    let newUser;
    if (user) {
      if (!user.following.includes(userId)) {
        newUser = await userService.followUser(userId);
        setProfile((prevState) => ({
          ...prevState,
          user: {
            ...prevState.user,
            followers: [...prevState.user.followers, newUser._id],
          },
        }));
      } else {
        newUser = await userService.unfollowUser(userId);
        setProfile((prevState) => ({
          ...prevState,
          user: {
            ...prevState.user,
            followers: prevState.user.followers.filter(
              (item) => item !== newUser._id
            ),
          },
        }));
      }
    }
    localStorage.setItem("user", JSON.stringify(newUser));
    dispatch({
      type: UserAction.UPDATE_FOLLOWERS,
      payload: { following: newUser.following, followers: newUser.followers },
    });
  };

  return (
    <>
      {userProfile ? (
        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "18px 0px",
              borderBottom: "1px solid grey",
            }}
          >
            <div>
              <ProfilePicture alt="profile" src={userProfile.user.picture} />
            </div>
            <div>
              <h4>{userProfile.user.name}</h4>
              <button
                className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={() => toggleFollowUser()}
              >
                {!user.following.includes(userId) ? "Follow" : "UnFollow"}
              </button>
              <h5>{userProfile.user.email}</h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%",
                }}
              >
                <h6>{userProfile.posts.length} posts</h6>
                <h6>{userProfile.user.followers.length} followers</h6>
                <h6>{userProfile.user.following.length} following</h6>
              </div>
            </div>
          </div>
          <div className="gallery">
            <PostList posts={userProfile.posts} />
          </div>
        </div>
      ) : (
        <h2>loading...!</h2>
      )}
    </>
  );
};
export default UserProfile;
