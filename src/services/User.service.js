export default class UserService {
  async updatePicture(url) {
    const result = await fetch("/update-picture", {
      method: "put",
      headers: this._requestHeaders(),
      body: JSON.stringify({
        picture: url,
      }),
    });
    return result.json();
  }

  async getUser(userId) {
    try {
      const result = await fetch(`/user/${userId}`, {
        headers: this._requestHeaders(),
      });
      return result.json();
    } catch (err) {
      console.log(err);
    }
  }

  async searchUser(query) {
    try {
      const result = await fetch("/search-users", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      });
      const { users } = await result.json();
      return users;
    } catch (err) {
      console.log(err);
    }
  }

  async followUser(userId) {
    try {
      const result = await fetch("/follow-user", {
        method: "put",
        headers: this._requestHeaders(),
        body: JSON.stringify({
          followId: userId,
        }),
      });
      return result.json();
    } catch (err) {
      console.log(err);
    }
  }

  async unfollowUser(userId) {
    try {
      const result = await fetch("/unfollow-user", {
        method: "put",
        headers: this._requestHeaders(),
        body: JSON.stringify({
          unfollowId: userId,
        }),
      });
      return result.json();
    } catch (err) {
      console.log(err);
    }
  }

  _requestHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    };
  }
}
