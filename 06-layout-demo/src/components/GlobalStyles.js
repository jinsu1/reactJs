import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *:not(.fa) {  // 아이콘 빼고 모든 곳에 적용 (아이콘에 폰트를 먹이면 아이콘이 안나오는 경우가 있음)
        font-family: "Noto Sans KR", "NaumGothic", "Malgun Gothic";
    }
    
    * {
        box-sizing: border-box;
    }

    body {
        padding: 30px 50px;
        margin: 0;
    }
`;

export default GlobalStyles;