import styled from "styled-components";
import { device } from "./devices";
import { Card } from "./Card";
export const AuthCard = styled(Card)`
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
