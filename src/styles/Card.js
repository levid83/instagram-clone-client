import styled from "styled-components";
import { device } from "./devices";

export const Card = styled.div`
  margin: 1em auto;
  padding: 1em;

  max-width: 100%;

  @media ${device.small} {
    max-width: 80%;
  }
  @media ${device.medium} {
    max-width: 70%;
  }

  @media ${device.large} {
    max-width: 50%;
  }
`;
