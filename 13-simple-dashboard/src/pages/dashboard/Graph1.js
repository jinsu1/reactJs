import React, {memo, useMemo} from 'react';

import styled from 'styled-components';

import { useSelector } from 'react-redux';
import mq from '../../components/MediaQuery';

import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement } from 'chart.js';

import { Bar } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement);

const Graph1Container = styled.div`
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

const Graph1 = memo(() => {
    const { item } = useSelector((state) => state.TitanicSlice);
    console.log(item);

    const {keys, values} = useMemo(() => {
        if(!item) {
            return {keys: null, values: null};
        }

        console.group("Graph1");

        const ageData = item.reduce((acc, cur) => {
            const ageLevel = `${parseInt(cur.age / 10) * 10}대`;

            if (acc[ageLevel] == undefined) {
                acc[ageLevel] = 1;
            } else {
                acc[ageLevel]++;
            }

            return acc;
        }, {});

        console.log(ageData);

        const keys = Object.keys(ageData).sort();
        console.log('keys :', keys);

        const values = keys.map((v, i) => ageData[v]);
        console.log(values);

        const result = {keys, values};
        console.log('result :', result);

        console.groupEnd();

        return result;
        }, [item]);

    return (
        <Graph1Container>
            <div className="container">
            {/* {keys && JSON.stringify(keys)} */}
            {/* <br /> */}
            {/* {values && JSON.stringify(values)} */}
            {keys && values && (
                <Bar data={{
                    labels: keys, // x축
                    datasets: [{
                        label: "명",
                        data: values,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                        title: {
                            display: true,
                            text: "연령별 탑승객 집계",
                            font: {
                                size: 18,
                                color: "#000"
                            }
                        }
                    },
                }}/>
            )}
            </div>
        </Graph1Container>
    );
});

export default Graph1;