import jwt from "jsonwebtoken";

export default class AuthService {
  async signup({ name, password, email, picture }) {
    let result, message;
    try {
      result = await fetch("/signup", {
        method: "post",
        headers: this._requestHeaders(),
        body: JSON.stringify({
          name,
          password,
          email,
          picture,
        }),
      });
      message = await result.json();
    } catch (err) {
      throw new Error("Connection lost. Try again later...");
    }
    if (message.error) throw new Error(message.error);
    return message;
  }

  async signin({ email, password }) {
    let result, user;
    try {
      result = await fetch("/signin", {
        method: "post",
        headers: this._requestHeaders(),
        body: JSON.stringify({
          email,
          password,
        }),
      });
      user = await result.json();
    } catch (err) {
      throw new Error("Connection lost. Try again later...");
    }
    if (user.error) throw new Error(user.error);
    return user;
  }

  async resetPasswod(email) {
    let result, message;
    try {
      result = await fetch("/reset-password", {
        method: "post",
        headers: this._requestHeaders(),
        body: JSON.stringify({
          email,
        }),
      });
      message = await result.json();
    } catch (err) {
      throw new Error("Connection lost. Try again later...");
    }
    if (message.error) throw new Error(message.error);
    return message;
  }

  async getNewPasswod(password, token) {
    let result, message;
    try {
      result = await fetch("/new-password", {
        method: "post",
        headers: this._requestHeaders(),
        body: JSON.stringify({
          password,
          token,
        }),
      });
      message = await result.json();
    } catch (err) {
      throw new Error("Connection lost. Try again later...");
    }
    if (message.error) throw new Error(message.error);
    return message;
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
