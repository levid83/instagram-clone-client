export default class PostService {
  async getAllPosts() {
    try {
      const result = await fetch("/all-posts", {
        headers: this._requestHeaders(),
      });
      const posts = await result.json();
      if (posts.error) throw new Error(posts.error);
      return posts;
    } catch (err) {
      console.log(err);
    }
    return { posts: [] };
  }

  async getMyPosts() {
    try {
      const result = await fetch("/my-posts", {
        headers: this._requestHeaders(),
      });
      const posts = await result.json();
      if (posts.error) throw new Error(posts.error);
      return posts;
    } catch (err) {
      console.log(err);
    }
    return { posts: [] };
  }

  async getSubposts() {
    try {
      const result = await fetch("/subposts", {
        headers: this._requestHeaders(),
      });
      const posts = await result.json();
      if (posts.error) throw new Error(posts.error);
      return posts;
    } catch (err) {
      console.log(err);
    }
    return { posts: [] };
  }

  async createPost({ title, body, pictureUrl }) {
    try {
      let result = await fetch("/create-post", {
        method: "post",
        headers: this._requestHeaders(),
        body: JSON.stringify({
          title,
          body,
          picture: pictureUrl,
        }),
      });
      const post = await result.json();
      if (post.error) throw new Error(post.error);
      return post;
    } catch (err) {
      console.log(err);
    }
    return { posts: null };
  }

  async deletePost(postId) {
    try {
      const result = await fetch(`/delete-post/${postId}`, {
        method: "delete",
        headers: this._requestHeaders(),
      });
      return result.json();
    } catch (err) {
      console.log(err);
    }
  }

  async likePost(postId) {
    try {
      const result = await fetch("/like-post", {
        method: "put",
        headers: this._requestHeaders(),
        body: JSON.stringify({
          postId: postId,
        }),
      });
      return result.json();
    } catch (err) {
      console.log(err);
    }
  }

  async unlikePost(postId) {
    try {
      const result = await fetch("/unlike-post", {
        method: "put",
        headers: this._requestHeaders(),
        body: JSON.stringify({
          postId: postId,
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
        headers: this._requestHeaders(),
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

  _requestHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    };
  }
}
