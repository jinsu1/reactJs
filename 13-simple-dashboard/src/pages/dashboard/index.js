import React, {memo, useEffect, useMemo} from 'react';

import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { getList } from '../../slices/TitanicSlice';

import CountUp from "react-countup";
import ScoreBoard from './scoreBoard';
import GraphBoard from './graphBoard';

const PagesContainer = styled.div`
      
`;

const Pages = memo(() => {
    const { status, message, item } = useSelector((state) => state.TitanicSlice);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getList());
    }, []);

    return (
        <PagesContainer>
            { status !== 200 && (
                <div className='error-info'>
                    <h1>{status} Error</h1>
                    <p>{message}</p>
                </div>
            )}

            <ScoreBoard />

            <GraphBoard />
        </PagesContainer>
    );
});

export default Pages;