import React from "react";
import PropTypes from "prop-types";

import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth === true ? <Component {...props} /> : <Redirect to="/signin/" />
    }
  />
);

GuardedRoute.propTypes = {
  component: PropTypes.any.isRequired,
  auth: PropTypes.bool.isRequired,
  path: PropTypes.string,
  exact: PropTypes.bool,
  rest: PropTypes.any,
};

export default GuardedRoute;
