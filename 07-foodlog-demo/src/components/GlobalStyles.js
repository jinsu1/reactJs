import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *:not(.fa) {
        font-family: "Noto Sans KR", "NaumGothic", "Malgun Gothic";
    }
    
    * {
        box-sizing: border-box;
    }

    a {
        text-decoration: none;
        color: #000
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
`;

export default GlobalStyles;