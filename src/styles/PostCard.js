import styled from "styled-components";
import { device } from "./devices";

import { overlayBackground, border } from "../styles/variables";
import { Card } from "./Card";

export const PostCard = styled(Card)`
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PictureContainer = styled.div`
  align-self: center;
  position: relative;

  & .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: ${overlayBackground};
    color: white;
    opacity: 0;
    transition: opacity 0.5s ease;
    text-align: center;
  }

  &:hover {
    cursor: pointer;
    & .overlay {
      opacity: 0.95;
    }
  }
  & img {
    display: block;
    max-width: 100%;
  }

  & .likes {
    width: 30%;
    align-self: center;
    display: flex;
    justify-content: space-evenly;
    & span {
      display: inline-flex;
      vertical-align: middle;
    }
  }
`;

export const PostContent = styled.div`
  padding: 1em 0;
  border-bottom: ${border};
  text-align: justify;

  & input[type="text"] {
    border-bottom: ${border};
  }

  & .input-field {
    display: flex;
    align-items: center;
    vertical-align: middle;
  }
  & .comment {
    margin: 1em 0;
    display: flex;
    align-items: flex-start;

    & :first-child {
      padding-right: 0.5em;
    }
  }
  & .create-comment {
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media ${device.small} {
      flex-direction: row;
    }

    & .text {
      width: 100%;
      @media ${device.small} {
        width: 60%;
      }
    }
  }
`;
