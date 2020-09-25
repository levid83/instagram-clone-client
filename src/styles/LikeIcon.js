import styled from "styled-components";

const LikeIcon = styled.i`
  color: ${(props) => (props.liked ? "#ed4956" : "white")};
`;
export default LikeIcon;
