/**
 * 리액트의 전체 페이지를 구성하는 컴포넌트
 */
/** 리액트 기본 패키지 참조 (모든 파일에서 무조건 참조한다.) */
import React, {memo} from 'react';
/** 링크와 페이지 구성에 필요한 컴포넌트 참조 */
import { Routes, Route } from "react-router-dom";
import MenuLink from './components/MenuLink';
/** SEO 설정 */
import Meta from './components/Meta';
/** 전역 SCSS 적용을 위한 reset.css와 StyledComponent */
import { Reset } from 'styled-reset';
import GlobalStyles from './components/GlobalStyles';

/** 하위 페이지를 담당하는 컴포넌트(직접제작)들 참조 */
// 모든 페이지 공용 컴포넌트
import Header from './pages/Header';
import Footer from './pages/Footer';

import Main from './pages/main';

const App = memo(() => {
    return (
        <>
            <Meta />
            <Reset />
            <GlobalStyles />
            <Header />
            <Routes>
                <Route path='/' exact={true} element={<Main />} />
            </Routes>
            <Footer />
        </>
    )
});

export default App;