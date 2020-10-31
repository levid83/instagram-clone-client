import styled from "styled-components";
import { device } from "./devices";
import { Card } from "./Card";

export const UserProfile = styled(Card)`
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
  flex-wrap: wrap;
  justify-content: space-evenly;
  & .picture {
    align-self: center;
  }
  & .stats {
    display: flex;
    justify-content: space-between;
    width: 100%;
    & span {
      margin-right: 0.2em;
    }
  }
`;
