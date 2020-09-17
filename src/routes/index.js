import React, { useEffect, useContext } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { UserContext } from "../App";

import CreatePost from "../components/pages/CreatePost";
import Home from "../components/pages/Home";
import NewPassword from "../components/pages/NewPassword";
import Profile from "../components/pages/Profile";
import ResetPassword from "../components/pages/ResetPassword";
import SignIn from "../components/pages/SignIn";
import SignUp from "../components/pages/SignUp";
import SubscribedUserPosts from "../components/pages/SubscribedUserPosts";
import UserProfile from "../components/pages/UserProfile";
import { UserAction } from "../reducers/userReducer";

const Routing = () => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: UserAction.SET_USER, payload: user });
    } else {
      if (!history.location.pathname.startsWith("/reset"))
        history.push("/signin");
    }
  }, [dispatch, history]);
  return (
    <Switch>
      <Route exact path="/" component={Home} />

      <Route path="/signin" component={SignIn} />

      <Route path="/signup" component={SignUp} />

      <Route exact path="/profile" component={Profile} />

      <Route path="/create-post" component={CreatePost} />

      <Route path="/user-profile/:userid" component={UserProfile} />

      <Route path="/subscribed-user-posts" component={SubscribedUserPosts} />

      <Route exact path="/reset-password" component={ResetPassword} />

      <Route path="/reset-password/:token" component={NewPassword} />
    </Switch>
  );
};
export default Routing;
