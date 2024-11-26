import React, {memo, useState} from 'react';

import styled from 'styled-components';

const MyStateContainer = styled.div`

`;

const MyState = memo(() => {
    /**
     * state 값 정의
     * - 이 페이지 안에서 유효한 전역변수 같은 개념
     * - 화면에 출력할 용도의 변수라고 이해하면 된다.
     * - const [ 변수이름, 변수에대한setter함수] = React.useState(변수의 기본값);
     * - state값은 대입연산자를 사용하여 직접 변경할 수 없고 반드시 setter를 통해서만 변경 가능하다.
     */

    const [myName, setMyName] = useState('');
    const [myPoint, setMyPoint] = useState(50);

    /** 이벤트 핸들러로 사용될 함수는 컴포넌트 함수 안에서 정의된다. */
    const onMyNameChange = e => {
        // 상태변수에 직접 대입은 에러 myName = e.currentTarget.value;
        // setter 함수를 통해 변경된 상태 변수는 모든 출력 위치에 자동 반영된다.
        setMyName(e.currentTarget.value);
    };

    return (
        <MyStateContainer>
            <h2>MyReducer</h2>

            <div>
                <label htmlFor="myNameInput">이름: </label>
                <input type="text" id="myNameInput" value={myName} onChange={onMyNameChange} />
            </div>

            <div>
                <label htmlFor="myPointInput">점수: </label>
                <input id="myPointInput" type="range" min="0" max="100" value={myPoint} step="1" onChange={e => setMyPoint(e.currentTarget.value)} />
            </div>

            <h2>{myName}님의 점수는 {myPoint}점 입니다.</h2>
        </MyStateContainer>
    );
});

export default MyState;