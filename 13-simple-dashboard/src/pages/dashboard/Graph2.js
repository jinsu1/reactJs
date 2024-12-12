import React, {memo, useMemo} from 'react';

import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement } from 'chart.js';
import mq from '../../components/MediaQuery';

import { Bar } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement);

const Graph2Container = styled.div`
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

const Graph2 = memo(() => {
    const { item } = useSelector((state) => state.TitanicSlice);

    const { keys, survived, dead } = useMemo(() => {
        if(!item) {
            return { keys: [], survived: [], dead: []};
        }

        console.group("Graph2");

        const ageData = item.reduce((acc, cur) => {
            const ageLevel = `${parseInt(cur.age / 10) * 10}대`;

            if (acc[ageLevel] == undefined) {
                acc[ageLevel] = { survived: 0, dead: 0 };
            }

            if(cur.survived) {
                acc[ageLevel].survived++;
            } else {
                acc[ageLevel].dead++;
            }

            return acc;
        }, {});

        console.log(ageData);

        const keys = Object.keys(ageData).sort();
        console.log(keys);

        const survived = keys.map((v, i) => ageData[v].survived);
        console.log(survived);

        const dead = keys.map((v, i) => ageData[v].dead);
        console.log(dead);

        const result = { keys, survived, dead };
        console.log(result);

        console.groupEnd();

        return result;
    }, [item]);
    return (
        <Graph2Container>
            <div className="container">
                {keys && survived && dead && (
                    <Bar 
                        data={{
                            labels:keys, // x축
                            datasets: [
                                {
                                    label: "생존",
                                    data: survived,
                                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                                    borderColor: "rgba(53, 162, 235, 1)",
                                    borderWidth: 1,
                                },
                                {
                                    label: "사망",
                                    data: dead,
                                    backgroundColor: 'rgba(258, 235, 153, 0.5)',
                                    borderColor: 'rgba(258, 234, 153, 1)',
                                    borderWidth: 1,
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: "bottom",
                                },
                                title: {
                                    display: true,
                                    text: "연령별 생존 여부 집계",
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
        </Graph2Container>
    );
});

export default Graph2;