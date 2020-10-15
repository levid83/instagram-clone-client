export default class PostService {
  async getAllPosts() {
    let result, posts;
    try {
      result = await fetch("/all-posts", {
        headers: this._requestHeaders(),
      });
      posts = await result.json();
    } catch (err) {
      throw new Error("Connection lost. Try again later...");
    }
    if (posts.error) throw new Error(posts.error);
    return posts;
  }

  async getMyPosts() {
    let result, posts;
    try {
      result = await fetch("/my-posts", {
        headers: this._requestHeaders(),
      });
      posts = await result.json();
    } catch (err) {
      throw new Error("Connection lost. Try again later...");
    }
    if (posts.error) throw new Error(posts.error);
    return posts;
  }

  async getSubposts() {
    let result, posts;
    try {
      result = await fetch("/subposts", {
        headers: this._requestHeaders(),
      });
      posts = await result.json();
    } catch (err) {
      throw new Error("Connection lost. Try again later...");
    }
    if (posts.error) throw new Error(posts.error);
    return posts;
  }

  async createPost({ title, body, pictureUrl }) {
    let result, post;
    try {
      result = await fetch("/create-post", {
        method: "post",
        headers: this._requestHeaders(),
        body: JSON.stringify({
          title,
          body,
          picture: pictureUrl,
        }),
      });
      post = await result.json();
    } catch (err) {
      throw new Error("Connection lost. Try again later...");
    }
    if (post.error) throw new Error(post.error);
    return post;
  }

  async deletePost(postId) {
    let result, message;
    try {
      result = await fetch(`/delete-post/${postId}`, {
        method: "delete",
        headers: this._requestHeaders(),
      });
      message = await result.json();
    } catch (err) {
      throw new Error("Connection lost. Try again later...");
    }
    if (message.error) throw new Error(message.error);
    return message;
  }

  async toggleLike(postId, liked) {
    let result, post;
    try {
      result = await fetch(liked ? "/unlike-post" : "/like-post", {
        method: "put",
        headers: this._requestHeaders(),
        body: JSON.stringify({
          postId: postId,
        }),
      });
      post = await result.json();
    } catch (err) {
      throw new Error("Connection lost. Try again later...");
    }
    if (post.error) throw new Error(post.error);
    return post;
  }

  async unlikePost(postId) {
    let result, post;

    try {
      result = await fetch("/unlike-post", {
        method: "put",
        headers: this._requestHeaders(),
        body: JSON.stringify({
          postId: postId,
        }),
      });
      post = await result.json();
    } catch (err) {
      throw new Error("Connection lost. Try again later...");
    }
    if (post.error) throw new Error(post.error);
    return post;
  }

  async addPostComment(text, postId) {
    let result, post;
    try {
      result = await fetch("/add-post-comment", {
        method: "put",
        headers: this._requestHeaders(),
        body: JSON.stringify({
          postId,
          text,
        }),
      });
      post = await result.json();
    } catch (err) {
      throw new Error("Connection lost. Try again later...");
    }
    if (post.error) throw new Error(post.error);
    return post;
  }

  _requestHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    };
  }
}
