import React, {memo, useReducer} from 'react';

import styled from 'styled-components';

const MyReducerContainer = styled.div`

`;

function setCounterValue(state, action) {
    console.log("[%o] %o", action, state);

    switch (action) {
        case 'Hello':
             return state + 4;
        case 'World':
             return state - 1;
        default:
            return 0;
    }
}

const MyReducer = memo(() => {

    const [myCounter, setMyCounter] = useReducer(setCounterValue, 0);
    return (
        <MyReducerContainer>
            <h2>MyReducer</h2>
            <p>현재 카운트 값: {myCounter}</p>
            <button type="button" onClick={e => setMyCounter('Hello')}>Up</button>
            <button type="button" onClick={e => setMyCounter('World')}>Down</button>
            <button type="button" onClick={e => setMyCounter('')}>Reset</button>
        </MyReducerContainer>
    );
});

export default MyReducer;