import styled from "styled-components";

export const Card = styled.div`
  margin: 1em auto;
  padding: 1em;

  max-width: 100%;

  @media (min-width: 600px) {
    max-width: 80%;
  }
  @media (min-width: 768px) {
    max-width: 70%;
  }

  @media (min-width: 1024px) {
    max-width: 50%;
  }
`;
