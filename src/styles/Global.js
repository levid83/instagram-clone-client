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

  a {
    color: #00376b !important;
    font-weight: 500 !important;
  }

  h5 {
    font-size: 1.5em;
    padding: 0.2em;
  }

  .material-icons:hover {
    cursor: pointer;
  }
  .input-field input[type="text"]:focus {
    border-bottom: 1px solid rgb(8, 93, 252);
    box-shadow: 0 1px 0 0 rgb(8, 93, 252);
  }
  .input-field input[type="password"]:focus {
    border-bottom: 1px solid rgb(8, 93, 252) !important;
    box-shadow: 0 1px 0 0 rgb(8, 93, 252) !important;
  }

  #toast-container {
    bottom: 30px !important;
    right: 20px !important;
    left: auto !important;
  }

`;

export default Global;
