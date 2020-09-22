import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import GuardedRoute from "./GuardedRoute";

import CreatePost from "../pages/CreatePost";
import Home from "../pages/Home";
import NewPassword from "../pages/NewPassword";
import Profile from "../pages/Profile";
import ResetPassword from "../pages/ResetPassword";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import SubscribedUserPosts from "../pages/SubscribedUserPosts";
import UserProfile from "../pages/UserProfile";

const Routing = () => {
  const isAuthenticated = useSelector((state) => !!state);

  return (
    <Switch>
      <Route exact path="/" component={Home} />

      <Route path="/signin" component={SignIn} />

      <Route path="/signup" component={SignUp} />

      <GuardedRoute
        path="/profile"
        component={Profile}
        auth={isAuthenticated}
      />

      <GuardedRoute
        path="/create-post"
        component={CreatePost}
        auth={isAuthenticated}
      />

      <GuardedRoute
        path="/user-profile/:userId"
        component={UserProfile}
        auth={isAuthenticated}
      />

      <GuardedRoute
        path="/subscribed-user-posts"
        component={SubscribedUserPosts}
        auth={isAuthenticated}
      />

      <Route exact path="/reset-password" component={ResetPassword} />

      <Route path="/reset-password/:token" component={NewPassword} />
    </Switch>
  );
};
export default Routing;
