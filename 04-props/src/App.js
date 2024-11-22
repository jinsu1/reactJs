import React from 'react';
import { Link, Routes, Route } from "react-router-dom"

import Meta from './components/Meta';

import MyProps from './pages/my_props';
import MyPropTypes from './pages/my_prop_types';
import MyChildren from './pages/my_children';
import GradeTable from './pages/grade_table';

function App() {
  return (
    <>
        <Meta />
        
        <h1>04-props</h1>
        <nav>
            <Link to="/myprops">MyProps</Link>&nbsp;|&nbsp;
            <Link to="/myproptypes">MyPropTypes</Link>&nbsp;|&nbsp;
            <Link to="/mychildren">MyChildren</Link>&nbsp;|&nbsp;
            <Link to="/grade_table">GradeTable</Link>&nbsp;|&nbsp;
        </nav>

        <hr/>

        <Routes>
            <Route path="/myprops" element={<MyProps/>} />
            <Route path="/myproptypes" element={<MyPropTypes/>} />
            <Route path="/mychildren" element={<MyChildren/>} />
            <Route path="/grade_table" element={<GradeTable/>} />
        </Routes>
    </>
  );
}

export default App;
