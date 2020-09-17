import React, { useEffect, useContext } from "react";
import { Switch, useHistory } from "react-router-dom";

const Routing = (props) => {
  const history = useHistory();
  const { dispatch } = useContext(props.context);
  useEffect(() => {}, []);
  return <Switch></Switch>;
};
export default Routing;
