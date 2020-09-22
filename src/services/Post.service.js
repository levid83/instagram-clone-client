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

  async getSubposts() {
    try {
      const result = await fetch("/subposts", {
        method: "get",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      return result.json();
    } catch (err) {
      console.log(err);
    }
  }
  async likePost(id) {
    try {
      const result = await fetch("/like-post", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          postId: id,
        }),
      });
      return result.json();
    } catch (err) {
      console.log(err);
    }
  }

  async unlikePost(id) {
    try {
      const result = await fetch("/unlike-post", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          postId: id,
        }),
      });
      return result.json();
    } catch (err) {
      console.log(err);
    }
  }

  async addPostComment(text, postId) {
    try {
      const result = await fetch("/add-post-comment", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          postId,
          text,
        }),
      });
      return result.json();
    } catch (err) {
      console.log(err);
    }
  }

  async deletePost(postId) {
    try {
      const result = await fetch(`/delete-post/${postId}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      return result.json();
    } catch (err) {
      console.log(err);
    }
  }
}
