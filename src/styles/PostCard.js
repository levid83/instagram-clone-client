import styled from "styled-components";
import px2vw from "../utils/px2vw";

import {
  cardImageMaxWidth,
  overlayBackground,
  border,
} from "../styles/variables";

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
    max-width: ${px2vw(cardImageMaxWidth)};
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
  align-self: stretch;
  & .content {
    padding-bottom: 10px;
    border-bottom: ${border};
  }

  & input[type="text"] {
    border: ${border};
  }

  & .input-field {
    display: flex;
    align-items: center;
    vertical-align: middle;
  }
`;
