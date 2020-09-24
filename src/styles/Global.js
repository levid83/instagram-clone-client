import { createGlobalStyle } from "styled-components";
import { device } from "./devices";

export const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :root {
      font-size:14px;

      @media ${device.small} {
        font-size: 16px;
      }
      @media ${device.medium}{
        font-size: 18px;
      }

      @media ${device.large} {
        font-size: 18px;
      }
    }
`;

export default Global;
