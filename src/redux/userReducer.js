export const initialState = {};

export const UserAction = {
  SET_USER: "SET_USER",
  LOGOUT: "LOGOUT",
  UPDATE_FOLLOWERS: "UPDATE_FOLLOWERS",
  UPDATE_PICTURE: "UPDATE_PICTURE",
};
const reducer = (state, action) => {
  if (action.type === UserAction.SET_USER) {
    return action.payload;
  }
  if (action.type === UserAction.LOGOUT) {
    return null;
  }
  if (action.type === UserAction.UPDATE_FOLLOWERS) {
    return {
      ...state,
      followers: action.payload.followers,
      following: action.payload.following,
    };
  }
  if (action.type === UserAction.UPDATE_PICTURE) {
    return {
      ...state,
      picture: action.payload,
    };
  }
  return state;
};
export default reducer;
