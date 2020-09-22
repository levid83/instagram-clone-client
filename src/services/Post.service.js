export default class PostService {
  async createPost({ title, body, pictureUrl }) {
    try {
      let result = await fetch("/create-post", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          picture: pictureUrl,
        }),
      });
      return result.json();
    } catch (err) {
      console.log(err);
    }
  }

  async getMyPosts() {
    try {
      const result = await fetch("/my-posts", {
        method: "get",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      return result.json();
    } catch (err) {
      console.log(err);
    }
    return { posts: [] };
  }
}
