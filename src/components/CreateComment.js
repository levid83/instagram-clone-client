import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  & .comment {
    display: flex;
    align-items: space-around;
    & button {
      self-align: middle;
      margin-left: 10px;
    }
  }
`;

const CreateComment = (props) => {
  const { postId, onComment } = props;
  return (
    <Wrapper>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onComment(e.target[0].value, postId);
        }}
      >
        <div className="input-field comment">
          <i className="material-icons prefix">mode_edit</i>
          <input type="text" placeholder="Add a comment..." />
          <button className="btn " type="submit" name="post">
            Post
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default CreateComment;
