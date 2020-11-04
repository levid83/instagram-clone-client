export default class UserService {
  async updatePicture(url) {
    let result, user;
    try {
      result = await fetch(`${process.env.REACT_APP_BASE_URL}/update-picture`, {
        method: "put",
        headers: this._requestHeaders(),
        body: JSON.stringify({
          picture: url,
        }),
      });
      user = await result.json();
    } catch (err) {
      throw new Error("Connection lost. Try again later...");
    }
    if (user.error) throw new Error(user.error);
    return user;
  }

  async getUser(userId) {
    let result, user;
    try {
      result = await fetch(`${process.env.REACT_APP_BASE_URL}/user/${userId}`, {
        headers: this._requestHeaders(),
      });
      user = await result.json();
    } catch (err) {
      throw new Error("Connection lost. Try again later...");
    }
    if (user.error) throw new Error(user.error);
    return user;
  }

  async searchUser(query) {
    let result, profiles;
    try {
      result = await fetch(`${process.env.REACT_APP_BASE_URL}/search-users`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      });
      profiles = await result.json();
    } catch (err) {
      throw new Error("Connection lost. Try again later...");
    }
    if (profiles.error) throw new Error(profiles.error);
    return profiles;
  }

  async followUser(userId) {
    let result, user;
    try {
      result = await fetch(`${process.env.REACT_APP_BASE_URL}/follow-user`, {
        method: "put",
        headers: this._requestHeaders(),
        body: JSON.stringify({
          followId: userId,
        }),
      });
      user = await result.json();
    } catch (err) {
      throw new Error("Connection lost. Try again later...");
    }
    if (user.error) throw new Error(user.error);
    return user;
  }

  async unfollowUser(userId) {
    let result, user;
    try {
      result = await fetch(`${process.env.REACT_APP_BASE_URL}/unfollow-user`, {
        method: "put",
        headers: this._requestHeaders(),
        body: JSON.stringify({
          unfollowId: userId,
        }),
      });
      user = await result.json();
    } catch (err) {
      throw new Error("Connection lost. Try again later...");
    }
    if (user.error) throw new Error(user.error);
    return user;
  }

  _requestHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    };
  }
}
