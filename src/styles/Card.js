import styled from "styled-components";
import { cardWidth, cardMargin, cardPadding } from "../styles/variables";
import px2vw from "../utils/px2vw";

export const Card = styled.div`
  margin: ${px2vw(cardMargin)} auto;
  padding: ${px2vw(cardPadding)};
  max-width: ${px2vw(cardWidth)};
`;
