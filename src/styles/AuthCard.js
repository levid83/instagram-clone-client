import styled from "styled-components";
import { device } from "./devices";

import { overlayBackground, border } from "../styles/variables";
import { Card } from "./Card";

export const AuthCard = styled.div`
  margin: 1em auto;
  padding: 1em;

  max-width: 100%;

  @media ${device.small} {
    max-width: 70%;
  }
  @media ${device.medium} {
    max-width: 60%;
  }

  @media ${device.large} {
    max-width: 40%;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  & div {
    align-self: center;
  }
  & .links {
    display: flex;
    justify-content: space-between;
    & a {
      margin: 1em;
    }
  }
`;
