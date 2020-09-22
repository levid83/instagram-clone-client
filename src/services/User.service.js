export default class UserService {
  async updatePicture(url) {
    const result = await fetch("/update-picture", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        picture: url,
      }),
    });
    return result.json();
  }

  async getUser(userId) {
    try {
      const result = await fetch(`/user/${userId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      return result.json();
    } catch (err) {
      console.log(err);
    }
  }

  async followUser(userId) {
    try {
      const result = await fetch("/follow-user", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
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
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          unfollowId: userId,
        }),
      });
      return result.json();
    } catch (err) {
      console.log(err);
    }
  }
}
