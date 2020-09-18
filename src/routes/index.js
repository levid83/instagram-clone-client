import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import GuardedRoute from "./GuardedRoute";

import CreatePost from "../components/pages/CreatePost";
import Home from "../components/pages/Home";
import NewPassword from "../components/pages/NewPassword";
import Profile from "../components/pages/Profile";
import ResetPassword from "../components/pages/ResetPassword";
import SignIn from "../components/pages/SignIn";
import SignUp from "../components/pages/SignUp";
import SubscribedUserPosts from "../components/pages/SubscribedUserPosts";
import UserProfile from "../components/pages/UserProfile";

const Routing = () => {
  const isAuthenticated = useSelector((state) => !!state);

  return (
    <Switch>
      <Route exact path="/" component={Home} />

      <Route path="/signin" component={SignIn} />

      <Route path="/signup" component={SignUp} />

      <GuardedRoute
        exact
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
        path="/user-profile/:userid"
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
