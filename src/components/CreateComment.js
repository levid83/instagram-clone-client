import React, { useRef } from "react";
import { device } from "../styles/devices";
import styled from "styled-components";

const Wrapper = styled.div`
  & .create-comment {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: space-around;
    @media ${device.small} {
      flex-direction: row;
    }

    & .text {
      width: 80%;
      @media ${device.medium} {
        width: 60%;
      }
    }

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
          <textarea
            className="materialize-textarea text"
            placeholder="Add a comment..."
            ref={textInput}
          ></textarea>
          <button className="btn " type="submit" name="post">
            Send
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default CreateComment;
