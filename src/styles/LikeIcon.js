import styled from "styled-components";

const LikeIcon = styled.i`
  color: ${(props) => (props.liked ? "red" : "white")};
`;
export default LikeIcon;
