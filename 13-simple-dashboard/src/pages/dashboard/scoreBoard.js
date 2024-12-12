import React, {memo, useMemo} from 'react';

import styled from 'styled-components';

import CountUp from "react-countup";
import { useSelector, useDispatch } from 'react-redux';

const ScoreBoardContainer = styled.div`
    display: flex;
    justify-content: space-between;
    
    .my-counter {
        margin: 0 10px;
        width: 25%;
        height: 140px;
        background-color: #06f6;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &:first-child {
            margin-left: 0;
        }

        &:last-child {
            margin-right: 0;
        }

        h2 {
            font-size: 20px;
            font-weight: 600;
            margin: 0;
            font-weight: normal;
            color: #fff;
            margin-bottom: 10px;
        }

        .my-counter-number {
            font-size: 45px;
            font-weight: 700;
            margin: 0;
            color: #fff;

            &.per:after {
                content: '%';
            }
        }
    }
`;

const ScoreBoard = memo(() => {
    const { item } = useSelector((state) => state.TitanicSlice);

    const [ totalPassenger, totalSurvived, totalDead, survivalRate] = useMemo(() => {
        if(!item) {
            return [0, 0, 0, 0];
        }

        const totalPassenger = item.length;

        const totalSurvived = item.filter((v, i) => v.survived).length;

        const totalDead = totalPassenger - totalSurvived;

        const survivalRate = (totalSurvived / totalPassenger) * 100;

        return [
            totalPassenger,
            totalSurvived,
            totalDead,
            survivalRate
        ];
    }, [item]);

    return (
        <ScoreBoardContainer>
            <div className="my-counter">
                <h2>전체 탑승객 수</h2>
                <CountUp
                    start={1}
                    end={totalPassenger}
                    duration={3}
                    enableScrollSpy
                    scrollSpyDelay={1000}
                    className='my-counter-number'
                />
            </div>
            <div className="my-counter">
                <h2>생존자 수</h2>
                <CountUp
                    start={1}
                    end={totalSurvived}
                    duration={3}
                    enableScrollSpy
                    scrollSpyDelay={1000}
                    className='my-counter-number'
                />
            </div>
            <div className="my-counter">
                <h2>사망자 수</h2>
                <CountUp
                    start={1}
                    end={totalDead}
                    duration={3}
                    enableScrollSpy
                    scrollSpyDelay={1000}
                    className='my-counter-number'
                />
            </div>
            <div className="my-counter">
                <h2>생존률</h2>
                <CountUp
                    start={1}
                    end={survivalRate}
                    duration={3}
                    enableScrollSpy
                    scrollSpyDelay={1000}
                    className='my-counter-number'
                />
            </div>
        </ScoreBoardContainer>
    );
});

export default ScoreBoard;