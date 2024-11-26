import React, {memo, useState, useEffect} from 'react';

import styled from 'styled-components';

import sample from "../../assets/img/sample.jpg";

const MyEffectContainer = styled.div`

`;

const MyEffect = memo(() => {

    // 0~200 사이의 값을 갖는 이미지 밝기
    const [myBrightness, setMyBrightness] = useState(100);

    // 브라우저의 넓이를 의미하는 상태값
    const [myWidth, setMyWidth] = useState(window.innerWidth);

    const onMyResize = (e) => {
        console.log(`창 사이즈 변경 >> ${window.innerWidth}`);
        setMyWidth(window.innerWidth);
    };

    useEffect(() => {
       console.log("실행");
    });

    useEffect(() => {
        console.log("밝기 상태변화를 배열 파라미터에 추가해 실행");
    }, [myBrightness]);

    
    useEffect(() => {
        console.error('[Case3] %s ::: 처음 로드될 때 처리될 기능', new Date());

        window.addEventListener("resize", onMyResize);

        return () => {
            console.log('[Case4] %s ::: 화면에서 사라지기 직전 처리될 기능', new Date());

            window.removeEventListener("resize", onMyResize);
        }
    },[]);

    return (
        <MyEffectContainer>
            <h2>MyEffect</h2>

            <img alt="Hello React" src={sample} width={myWidth * 0.2}
                style={{ filter: "brightness(" + myBrightness + " %)",

                }}
            />

            <div>
                <input type="range" min={0} max={200} step={1} value={myBrightness}
                    onChange={ (e) => { setMyBrightness(e.currentTarget.value); } }
                />
            </div>
        </MyEffectContainer>
    );
});

export default MyEffect;