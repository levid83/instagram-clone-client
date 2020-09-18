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
  component: PropTypes.element.isRequired,
  auth: PropTypes.bool.isRequired,
  rest: PropTypes.any,
  path: PropTypes.string,
  exact: PropTypes.bool,
};

export default GuardedRoute;
