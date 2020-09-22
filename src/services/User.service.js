export default class UserService {
  async updatePicture(url) {
    let result = await fetch("/update-picture", {
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
}
