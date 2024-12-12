import React, {memo, useRef} from 'react';

import styled from 'styled-components';
import MyBox from './MyBox';

const MyRefContainer = styled.div`

`;

const MyRef = memo(() => {
    // HTML 태그를 React안에서 참조할 수 있는 참조변수를 생성
    const myDname = useRef();
    const myLoc = useRef();
    const myResult = useRef();

    // 자식 컴포넌트에 설정하기 위한 참조변수를 생성
    const myBoxRef = useRef();
    
    return (
        <MyRefContainer>
            <h2>MyRef</h2>

            {/* 미리 준비한 컴포넌트 참조변수와 HTML태그를 연결 */}
            <div>
                <label htmlFor="dname">학과명 : </label>
                <input type="text" ref={myDname} id="dname" />
            </div>

            <div>
                <label htmlFor="dname">학과위치 : </label>
                <input type="text" ref={myLoc} id="loc" />
            </div>

            <p>
                입력값 확인: <span ref={myResult} id='result'></span>
            </p>

            <button onClick={e => {
                /** 기존의 javascript 방식 
                 *  React의 SPA 작동 원리 특성상 사이트 전체에서 id값이 고유해야한다. (React는 페이지이동없이 모두 한 페이지) 
                 *  id값은 사용하기 어렵다
                 * 
                 * 컴포넌트 참조변수를 사용해서 다른 HTML태그에 접근 가능
                 * --> "참조변수.current" 해달 HTML을 의미하는 javascript DOM 객체
                 * --> myDname.currnet와 document.querySelector(#dname)이 동일한 DOM객체이다
                */

                const dname = myDname.current.value;
                const loc = myLoc.current.value;
                myResult.current.innerHTML = dname + ", " + loc;
            }}>클릭</button>

            <h3>컴포넌트에 ref 적용하기</h3>

            <MyBox a={100} b={200} ref={myBoxRef} />

            <button type="button" onClick={() => {
                // <MyBox>를 통해 myBoxRef를 주입받은 DOM에 접근하여 제어함.
                myBoxRef.current.style.backgroundColor = '#f00';
            }}>Red</button>

            <button type="button" onClick={() => {
                // <MyBox>를 통해 myBoxRef를 주입받은 DOM에 접근하여 제어함.
                myBoxRef.current.style.backgroundColor = '#00f';
            }}>Blue</button>

        </MyRefContainer>
    );
});

export default MyRef;