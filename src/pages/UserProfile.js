import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { UserAction } from "../redux/userReducer";
import UserService from "../services/User.service";

import PostList from "../components/PostList";

import { UserProfile } from "../styles/UserProfile";
import { Gallery } from "../styles/Gallery";
import ProfilePicture from "../styles/ProfilePicture";
import Spinner from "../styles/Spinner";

import { showError } from "../utils/toaster";

const userService = new UserService();

const Profile = () => {
  const [userProfile, setProfile] = useState(null);
  const user = useSelector((state) => state);
  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    userService
      .getUser(userId)
      .then((result) => setProfile(result))
      .catch((err) => showError(err.message));
  }, [userId]);

  const toggleFollowUser = () => {
    if (user) {
      if (!user.following.includes(userId)) {
        followUser(userId);
      } else {
        unfollowUser(userId);
      }
    }
  };

  const followUser = (userId) => {
    userService
      .followUser(userId)
      .then((newUser) => {
        setProfile((prevState) => ({
          ...prevState,
          user: {
            ...prevState.user,
            followers: [...prevState.user.followers, newUser._id],
          },
        }));
        saveLocalUser(newUser);
      })
      .catch((err) => {
        showError(err.message);
      });
  };
  const unfollowUser = (userId) => {
    userService
      .unfollowUser(userId)
      .then((newUser) => {
        setProfile((prevState) => ({
          ...prevState,
          user: {
            ...prevState.user,
            followers: prevState.user.followers.filter(
              (item) => item !== newUser._id
            ),
          },
        }));
        saveLocalUser(newUser);
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  const saveLocalUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({
      type: UserAction.UPDATE_FOLLOWERS,
      payload: {
        following: user.following,
        followers: user.followers,
      },
    });
  };

  return (
    <>
      {userProfile ? (
        <>
          <UserProfile className="card">
            <div className="picture">
              <ProfilePicture alt="profile" src={userProfile.user.picture} />
            </div>
            <div>
              <h6>{userProfile.user.name}</h6>
              <button
                className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={() => toggleFollowUser()}
              >
                {!user.following.includes(userId) ? "Follow" : "UnFollow"}
              </button>
              <h6>{userProfile.user.email}</h6>
              <div className="stats">
                <span>{userProfile.posts.length} posts</span>
                <span>{userProfile.user.followers.length} followers</span>
                <span>{userProfile.user.following.length} following</span>
              </div>
            </div>
          </UserProfile>
          <Gallery>
            <PostList posts={userProfile.posts} />
          </Gallery>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};
export default React.memo(Profile);
