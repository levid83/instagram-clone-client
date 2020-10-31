import styled from "styled-components";
import { device } from "./devices";
import { overlayBackground, border } from "../styles/variables";
import { Card } from "./Card";

export const PostCard = styled(Card)`
  width: 300px;
  height: 500px;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  @media ${device.small} {
    width: 400px;
    max-height: 600px;
  }

  @media ${device.large} {
    width: 500px;
    max-height: 800px;
  }
`;

export const PictureContainer = styled.div`
  position: relative;
  border-bottom: ${border};
  width: 100%;
  max-height: 60%;
  & .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
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
    width: 100%;
    height: 100%;
    object-fit: cover;
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
  padding: 1em;
  overflow-y: scroll;
  box-sizing: content-box; /* So the width will be 100% + 17px */
  text-align: justify;
`;
