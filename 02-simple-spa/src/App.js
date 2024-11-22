import React from 'react';

import { Link, Routes, Route } from "react-router-dom";

import Home from './pages/home';
import About from './pages/about';

const App = () => {
    return (
        <div>
            <h1>02-simple-spa</h1>
            <hr />

            {/* 링크 구성 부분 */}
            <nav>
                <Link to="/">[Home]</Link>
                <Link to="/about">[About]</Link>
            </nav>

            <a href="/about">일반링크</a>

            {/* 페이지 역할을 할 컴포넌트 명시 */}

            <Routes>
                {/* 첫 페이지로 사용되는 컴포넌트의 경우 exact={true}를 명시해야한다. */}
                {/* 첫 페이지로 사용되는 컴포넌트는 path에 "/"를 권장 */}
                <Route path="/" element={<Home/>} exact={true} />
                <Route path="/about" element={<About/>}/>
            </Routes>
        </div>
    );
};

export default App;
