import React from 'react';

import MySubComponent from './MySubComponent';

/**
 * 함수형 컴포넌트 정의
 * 함수 이름은 혼선을 방지하기 위해 소스파일 이름과 동일하게 구성하는 것이 일반적
 */

const MyComponent2 = () => {
    return (
        <div>
            <h2>Virtual DOM</h2>
            <p>This is React Component</p>

            <MySubComponent />
            <MySubComponent />
            <MySubComponent />
        </div>
    );
};

export default MyComponent2;