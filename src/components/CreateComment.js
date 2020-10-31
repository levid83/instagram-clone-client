import React, { useRef } from "react";
import { device } from "../styles/devices";
import { border } from "../styles/variables";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  margin: 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-around;
  @media ${device.small} {
    flex-direction: row;
  }
  & input[type="text"] {
    border-bottom: ${border};
  }

  & .text {
    align-self: center;
    width: 80%;
    @media ${device.medium} {
      width: 60%;
    }
  }

  & button {
    width: 100px;
    align-self: center;
  }
`;

const CreateComment = (props) => {
  const textInput = useRef();
  const { postId, onComment } = props;

  const comment = () => {
    onComment(textInput.current.value, postId);
    textInput.current.value = "";
  };
  return (
    <Wrapper>
      <textarea
        className="materialize-textarea text"
        placeholder="Add a comment..."
        ref={textInput}
      ></textarea>
      <button className="btn send" type="submit" name="post" onClick={comment}>
        Send
      </button>
    </Wrapper>
  );
};
export default CreateComment;
