import React, {memo, useMemo} from 'react';

import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement } from 'chart.js';
import mq from '../../components/MediaQuery';

import { Bar } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement);

const Graph3Container = styled.div`
    /* background-color: yellow; */
    width: 50%;

    ${mq.maxWidth('md')`
        width:100%
    `}

    .container {
        /* background-color: lightyellow; */
        margin:10px;
        height: 300px;
    }
`;

const Graph3 = memo(() => {
    const { item } = useSelector((state) => state.TitanicSlice);

    const sex = useMemo(() => {
        if(!item) {
            return [0, 0];
        }

        const maleData = item.reduce((acc, cur) => {
            acc[cur.sex == 'male' ? 0 : 1]++
            return acc;
        }, [0, 0]);

        console.group("Graph3");
        console.log(maleData);
        console.groupEnd();

        return maleData;
    },[item]);

    return (
        <Graph3Container>
            <div className="container">
                {sex && (
                    <Bar 
                        data={{
                            labels:['male', 'female'], // x축
                            datasets: [
                                {
                                    label: "명",
                                    data: sex,
                                    backgroundColor: ["#29ab3688", "#ed6b0e88"],
                                    borderColor: ["#29ab36", "#ed6b0e"],
                                    borderWidth: 1,
                                }
                            ],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false, // 세로 높이 스스로 설정 (false면 부모에 맞춤)
                            indexAxis: "y",
                            plugins: {
                                legend: {
                                    position: "bottom", //범주의 위치
                                },
                                title: {
                                    display: true,
                                    text: "성별 탑승객 집계",
                                    font: {
                                        size: 18,
                                        color: "#000",
                                    },
                                },
                            },
                        }}
                    />
                )}
            </div>
        </Graph3Container>
    );
});

export default Graph3;