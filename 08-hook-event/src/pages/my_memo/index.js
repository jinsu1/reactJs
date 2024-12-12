import React, {memo, useState, useEffect, useMemo} from 'react';

import styled from 'styled-components';

const MyMemoContainer = styled.div`

`;

const MyMemo = memo(() => {

    // 사용자의 입력을 저장할 상태변수
    const [myNumber, setMyNumber]  = useState(0);

    // 입력값에 따라 상태변수를 갱신할 이벤트 핸들러
    const onMyNumberChange = (e) => {
        const inputValue = e.currentTarget.value;
        const inputNumber = isNaN(inputValue) ? 0 : parseInt(inputValue);
        setMyNumber(inputNumber);
    }

    // const [myResult, setMyResult] = useState(0);
    
    // // myNumber값이 변경되었을 때 실행되는 hook
    // useEffect(() => {
    //     console.log("값 변경 인지");

    //     setMyResult(myNumber * 234)
    // }, [myNumber]);

    const myResult = useMemo(() => {
        return myNumber * 234;
    }, [myNumber]);

    return (
        <MyMemoContainer>
            <h2>MyMemo</h2>

            <input type="number" value={myNumber} onChange={onMyNumberChange} /> x 234 = {myResult}
        </MyMemoContainer>
    );
});

export default MyMemo;