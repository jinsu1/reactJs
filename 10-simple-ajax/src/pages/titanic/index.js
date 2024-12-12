import React, {memo, useState, useEffect, useCallback} from 'react';

import styled from 'styled-components';
import axiosHelper from '../../helpers/AxiosHelper';

import Table from '../../components/Table';
import Spinner from '../../components/Spinner';
import { SexLabel, EmbarkedLabel, SurvivedLabel } from './Labels';


const TitanicContainer = styled.div`
    .dropdown-container {
        padding: 10px 0;
        margin: 0;

        select {
            margin-right: 15px;
            font-size: 16px;
            padding: 5px 10px;
        }
    }
`;

const Titanic = memo(() => {
    // Ajax 결과를 저장할 상태 변수
    const [titanicData, setTitanicData] = useState([]);

    const [loading, setLoading] = useState(false);

    /* 드롭다운의 선택을 저장하기 위한 상태변수 */
    const [sex, setSex] = useState("");
    const [embarked, setEmbarked] = useState("");
    const [survived, setSurvived] = useState("");

    /**  */
    // 컴포넌트 렌더링과 동시에 실행되기 위한 hook
    useEffect(() => {
        console.log(`성별: ${sex}, 탑승지: ${embarked}, 생존여부: ${survived}`);

        const args = {};

        if(sex) {
            args['sex'] = sex;
        }

        if(embarked) {
            args['embarked'] = embarked;
        }

        if(survived) {
            args['survived'] = survived == "true";
        }

        console.group("백엔드에 전달할 파라미터");
        console.log(args);
        console.groupEnd();

        // Ajax처리를 위한 비동기 구조
        (async() => {
            let data = null;

            setLoading(true);

            try {
                data = await axiosHelper.get("/titanic", args);
                console.log(data);
            } catch (e) {
                alert(e.message);
                return;
            }

            setTitanicData(data.item);

            setLoading(false);
        })();
    }, [sex, embarked, survived]);

    /** 드롭다운 박스 선택값 변경 이벤트 처리 */
    const onSexSelectChange = useCallback((e) => setSex(e.currentTarget.value), []);
    const onEmbarkedSelectChange = useCallback((e) => setEmbarked(e.currentTarget.value), []);
    const onSurvivedSelectChange = useCallback((e) => setSurvived(e.currentTarget.value), []);

    return (
        <TitanicContainer>
            <h2>Titanic</h2>

            {/* <Spinner visible={loading} width={200} /> */}

            <div className='dropdown-container'>
                <select name='sex' onChange={onSexSelectChange}>
                    <option value="">-- 성별 선택 --</option>
                    <option value="male">남자</option>
                    <option value="female">여자</option>
                </select>

                <select name='embarked' onChange={onEmbarkedSelectChange}>
                    <option value="">-- 탑승지 선택 --</option>
                    <option value="C">세르브루</option>
                    <option value="Q">퀸즈타운</option>
                    <option value="S">사우샘프턴</option>
                </select>

                <select name='survived' onChange={onSurvivedSelectChange}>
                    <option value="">-- 생존여부 선택 --</option>
                    <option value="true">생존</option>
                    <option value="false">사망</option>
                </select>
            </div>

            <Table>
                <thead>
                    <tr>
                        <th>승객번호</th>
                        <th>승객이름</th>
                        <th>성별</th>
                        <th>나이</th>
                        <th>동승자 수</th>
                        <th>객실등급</th>
                        <th>방 호수</th>
                        <th>티켓번호</th>
                        <th>요금</th>
                        <th>탑승지</th>
                        <th>생존여부</th>
                    </tr>
                </thead>
                <tbody>
                    {titanicData.map((v, i) => {
                        return (
                            <tr key={v.id}>
                                <td>{v.id}</td>
                                <td>{v.name}</td>
                                <td><SexLabel sex={v.sex} /></td>
                                <td>{v.age}</td>
                                <td>{v.sibsp + v.parch}</td>
                                <td>{v.pclass}등급</td>
                                <td>{v.cabin}</td>
                                <td>{v.ticket}</td>
                                <td>{v.fare}</td>
                                <td><EmbarkedLabel embarked={v.embarked} /></td>
                                <td><SurvivedLabel survived={v.survived} /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </TitanicContainer>
    );
});

export default Titanic;