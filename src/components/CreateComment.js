import React, { useRef } from "react";
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
  const textInput = useRef();
  const { postId, onComment } = props;
  return (
    <Wrapper>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.target[0].value !== "" && onComment(e.target[0].value, postId);
          textInput.current.value = "";
        }}
      >
        <div className="input-field create-comment">
          <div className="text">
            <i className="material-icons prefix">mode_edit</i>
            <textarea
              className="materialize-textarea"
              placeholder="Add a comment..."
              ref={textInput}
            ></textarea>
          </div>
          <button className="btn " type="submit" name="post">
            Post
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default CreateComment;
