export const initialState = null;

export const UserAction = {
  SET_USER: "SET_USER",
  LOGOUT: "LOGOUT",
  UPDATE_FOLLOWERS: "UPDATE_FOLLOWERS",
  UPDATE_PICTURE: "UPDATE_PICTURE",
};
const reducer = (state, action) => {
  if (action.type === "USER") {
    return action.payload;
  }
  if (action.type === "LOGOUT") {
    return null;
  }
  if (action.type === "UPDATE") {
    return {
      ...state,
      followers: action.payload.followers,
      following: action.payload.following,
    };
  }
  if (action.type === "UPDATE_PICTURE") {
    return {
      ...state,
      picture: action.payload,
    };
  }
  return state;
};
export default reducer;
