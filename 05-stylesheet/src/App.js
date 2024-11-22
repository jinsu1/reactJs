import React from 'react';
import styled from 'styled-components';
import { NavLink, Routes, Route } from "react-router-dom"

import Meta from './components/Meta';

/** 전역 SCSS 적용을 위한 StyledComponent */
import GlobalStyles from './components/GlobalStyles';


import CssClass from './pages/css_class';
import InlineCss from './pages/inline_css';
import CssModule from './pages/css_module';
import News from './pages/news';
import Responsive from './pages/responsive';
import StyleComponent from './pages/style_component';


// const Menubar = styled.nav`
//     .menu-item {
//         font-size: 20px;
//         cursor: pointer;
//         text-decoration: none;
//         padding-bottom: 2px;
//         color: #222;

//         &:hover {
//             color: #22b8cf;
//         }

//         &:after {
//             content: '|';
//             display: inline-block;
//             padding: 0 7px;
//             color: #ccc;
//         }

//         &:last-child {
//             &:after {
//                 color: #fff;
//             }
//         }

//         &.active {
//             text-decoration: underline;
//             color: #22b8cf;
//         }
//     }`

function App() {
  return (
    <>
        <Meta />
        <GlobalStyles />

        <h1>05-stylesheet</h1>
        <nav>
            <NavLink to="/inline_css">InlineCss</NavLink>&nbsp;&nbsp;|&nbsp;&nbsp;
            <NavLink to="/css_class">CssClass</NavLink>&nbsp;&nbsp;|&nbsp;&nbsp;
            <NavLink to="/css_module">CssModule</NavLink>&nbsp;&nbsp;|&nbsp;&nbsp;
            <NavLink to="/style_component">StyleComponent</NavLink>&nbsp;&nbsp;|&nbsp;&nbsp;
            <NavLink to="/responsive">Responsive</NavLink>&nbsp;&nbsp;|&nbsp;&nbsp;
            <NavLink to="/news">News(Demo)</NavLink>
        </nav>

        <hr/>

        <Routes>
            <Route path="/inline_css" element={<InlineCss />} />
            <Route path="/css_class" element={<CssClass />} />
            <Route path="/css_module" element={<CssModule />} />
            <Route path="/style_component" element={<StyleComponent />} />
            <Route path="/responsive" element={<Responsive />} />
            <Route path="/news/*" element={<News />} />
        </Routes>
    </>
  );
}

export default App;
