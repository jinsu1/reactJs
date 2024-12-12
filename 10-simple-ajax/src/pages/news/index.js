import React, { useState, useEffect } from 'react';

import { Link, Routes, Route } from 'react-router-dom';
import NewsCard from './NewsCard';
import NewsList from './NewsList';
import styled from 'styled-components';

import axiosHelper from '../../helpers/AxiosHelper';

// import { InfinitySpin } from 'react-loader-spinner';
import Spinner from '../../components/Spinner';

const LoadingBox = styled.div`
    position: fixed;
    z-index: 9999;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const News = () => {
    const [newsData, setNewsData] = useState([]);

    const [loading, setLoading ] = useState(false);

    useEffect(() => {
        (async () => {
            let data = null;

            setLoading(true);

            try {
                data = await axiosHelper.get("/news");
            } catch (e) {
                alert(e.message);
                return;
            }
            
            console.log(data.item);

            setNewsData(data.item);

            setLoading(false);
        })();
    }, []);


    return (
        <div>
            <h1>News</h1>

            <nav>
                <Link to='/news/card'>카드형</Link>&nbsp;|&nbsp;
                <Link to='/news/list'>리스트형</Link>
            </nav>

            <LoadingBox>
                {/* <Spinner visible={loading} /> */}
            </LoadingBox>
            
            <Routes>
                <Route path='/card' element={<NewsCard news={newsData} />} />
                <Route path='/list' element={<NewsList news={newsData} />} />
            </Routes>
        </div>
    );
};

export default News;