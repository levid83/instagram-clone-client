export default class AuthService {
  async signup({ name, password, email, pictureUrl }) {
    try {
      let result = await fetch("/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
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
}
