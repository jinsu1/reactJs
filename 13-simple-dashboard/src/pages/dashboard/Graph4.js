import React, {memo, useMemo} from 'react';

import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement } from 'chart.js';
import mq from '../../components/MediaQuery';

import { Bar } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement);

const Graph4Container = styled.div`
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

const Graph4 = memo(() => {
    const { item } = useSelector((state) => state.TitanicSlice);

    const { survived, dead } = useMemo(() => {
        if(!item) {
            return { survived: [0, 0], dead: [0, 0]};
        }

        console.group("Graph4");

        const maleData = item.reduce((acc, cur) => {
            const idx = cur.sex == 'male' ? 0 : 1;
            const key = cur.survived ? 'survived' : 'dead';
            acc[key][idx]++;
            return acc;
        }, {survived: [0, 0], dead: [0, 0]});

        console.log(maleData);
        console.groupEnd();
        
        return maleData;
    }, [item]);

    return (
        <Graph4Container>
            <div className="container">
                {survived && dead && (
                    <Bar 
                        data={{
                            labels: ['male', 'female'], // x축
                            datasets: [
                                {
                                    label: "생존",
                                    data: survived,
                                    backgroundColor: "#03a9fc66",
                                    borderColor: "#03a9fc",
                                    borderWidth: 1,
                                },
                                {
                                    label: "사망",
                                    data: dead,
                                    backgroundColor: '#fc033d66',
                                    borderColor: '#fc033d',
                                    borderWidth: 1,
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            indexAxis: "y",
                            plugins: {
                                legend: {
                                    position: "bottom",
                                },
                                title: {
                                    display: true,
                                    text: "성별 생존 여부 집계",
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
        </Graph4Container>
    );
});

export default Graph4;