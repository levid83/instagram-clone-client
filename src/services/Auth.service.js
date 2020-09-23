import jwt from "jsonwebtoken";

export default class AuthService {
  async signup({ name, password, email, pictureUrl }) {
    try {
      let result = await fetch("/signup", {
        method: "post",
        headers: this._requestHeaders(),
        body: JSON.stringify({
          name,
          password,
          email,
          picture: pictureUrl,
        }),
      });
      return result.json();
    } catch (err) {
      console.log(err);
    }
  }

  async signin({ email, password }) {
    try {
      let result = await fetch("/signin", {
        method: "post",
        headers: this._requestHeaders(),
        body: JSON.stringify({
          email,
          password,
        }),
      });
      return result.json();
    } catch (err) {
      console.log(err);
    }
  }

  saveLocalUser(data) {
    localStorage.setItem("jwt", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  getLocalUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  expiredToken() {
    const token = localStorage.getItem("jwt");
    if (!token) return true;
    const decodedToken = jwt.decode(token);
    return !decodedToken || decodedToken.exp <= Date.now() / 1000;
  }

  _requestHeaders() {
    return {
      "Content-Type": "application/json",
    };
  }
}
