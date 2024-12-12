import React, {memo, useCallback, useEffect, useState} from 'react';

import styled from 'styled-components';

import Spinner from '../../components/Spinner';
import Table from '../../components/Table';
import axiosHelper from "../../helpers/AxiosHelper";
import utilHelper from "../../helpers/UtilHelper";
import regexHelper from "../../helpers/RegexHelper";

import { useNavigate, useLocation } from 'react-router-dom';

const DepartmentContainer = styled.div`
.form-container {
    padding: 10px 0;
    margin: 0;

    input, button {
        margin-right: 15px;
        font-size: 16px;
        padding: 5px 10px;
    }
}

`;

const Department = memo(() => {
    //화면에 표시할 상태값 (ajax 연동 결과로 받아올 json) -> 초기값을 빈 배열로 정의
    //Ajax처리는 비동기이므로 데이터를 받아오는 처리의 완료 여부와 상관 없이 화면 출력이 먼저 수행된다.
    // 그러므로 Ajax의 결과를 상태값에 저장하여 데이터를 받아온 후 화면이 자동 갱신되도록 처리해야 한다.
    const [department, setDepartment] = useState([]);
    
    //현재 Ajax가 데이터를 로딩중인지를 의미하는 상태값
    const [loading, setLoading] = useState(false);

    // 페이지 강제 이동을 위한 객체 생성
    const navigate = useNavigate();

    // QueryString에 포함된 keyword 값을 취득
    const { search } = useLocation();
    const { keyword } = utilHelper.getQuery(search);

    // const [keyword, setKeyword] = useState("");

    // 수정할 항목에 대한 id값을 저장하기 위한 상태값
    const [updateId, setUpdateId] = useState(-1);

    useEffect(() => {
        (async () => {
            setLoading(true);

            let data = null;
            
            const args = {_sort: 'id', _order: 'desc'};
            if(keyword) {
                args['dname_like'] = keyword;
            }

            try {
                data = await axiosHelper.get("/department", args);
                console.log(data);
            } catch (e) {
                console.error(e);
                alert(e.message);
                return;
            } finally {
                setLoading(false);
            }

            setDepartment(data.item);
        })();
    }, [keyword]);

    const onSearchSubmit = useCallback((e) => {
        e.preventDefault();

        const form = e.currentTarget;

        const keyword = form.keyword.value;
        console.log(`검색어 : ${keyword}`);

        // setKeyword(keyword);

        /** 검색어를 QueryString으로 지정하여 페이지를 이동한다.
         * 실제로는 페이지 이동이 아니라 URL 변조만 이루어진다
         * 하지만 웹 브라우저는 주소가 변경되었으므로 페이지 이동으로 인식한다
         * --> 페이지 이동으로 인식되면 리액트는 화면상의 모든 컴포넌트를 다시 랜더링한다.
         * 즉 URL이 변조되면 화면에 표시되는 컴포넌트가 처음부터 재실행된다는 뜻 
         * --> 리액트는 페이지가 하나임에도 불구하고 뒤로가기를 클릭하면 이전 URL로 돌아가서
         * 이전에 검색했던 것들을 볼 수 있다.
         */
        navigate(`/department?keyword=${keyword}`);
    }, []);

    /** 데이터 추가 submit 이벤트 */

    const onDataAddSubmit = useCallback((e) => {
        e.preventDefault();

        //이벤트가 발생한 폼 자신
        const form = e.currentTarget;

        //입력값에 대한 유효성 검사
        try{
            regexHelper.value('#dname', '학과명을 입력하세요.');
            regexHelper.maxLength('#dname', 20, '학과명은 20자 이내로 입력하세요.');
            regexHelper.value('#loc', '위치를 입력하세요.');
            regexHelper.maxLength('#loc', 20, '위치는 20자 이내로 입력하세요.');
        } catch (e) {
            alert(e.message);
            e.element.focus();
            return;
        }

        // 폼안의 input태그에 name속성으로 접근하여 입력값 취득
        const dname = form.dname.value;
        const loc = form.loc.value;

        // ajax를 이용한 데이터 저장 요청 > post전송
        (async () => {
            //ajax 로딩 시작 알림
            // setLoading(loading => true);

            // ajax의 결과를 저장할 변수 준비
            let data = null;
           
            try{
                data = await axiosHelper.post("/department", {
                    dname: dname,
                    loc: loc
                });

                console.group("데이터 저장 결과");
                console.log(data);
                console.groupEnd();
            } catch (e){
                console.error(e);
                alert(e.message);
                return;
            }  finally {
                //ajax 로딩 종료를 알림 
                // setLoading(loading => false);
            }

            const newData = [data.item, ...department];
            setDepartment(newData);
        })();
    }, [department]);

    /** 데이터 삭제 버튼 click 이벤트 */
    const onDataDeleteClick = useCallback((e) => {
        e.preventDefault();

        // 이벤트가 발생한 버튼 자신
        const button = e.currentTarget;
        // 클릭된 자신에게 숨어있는 data-id값을 추출
        // 백엔드로부터 받아온 json에는 id값에 따옴펴가 적용되어 있지 않음 --> 숫자임
        // parseInt()를 통해 숫자로 변환
        const id = parseInt(button.dataset.id);
        const dname = button.dataset.dname;
        console.log(`삭제 대상: ${id}, ${dname} ` );

        if(!confirm(`정말 ${dname}(을)를 삭제하시겠습니까?`)) {
            return;
        }

        // 삭제 요청을 위한 Ajax 처리
        (async () => {
            // ajax 로딩시작
            // setLoading(true);

            try{
                //삭제의 경우 ajax의 응답 결과가 필요 없다.
                await axiosHelper.delete(`/department/${id}`);
            } catch (e) {
                console.error(e);
                alert(e.message);
            } finally {
                // setLoading(false);
            }

            const newData = department.filter((v, i) => v.id !== id);
            setDepartment(newData);
        })();
    
    }, [department]);

    /** 데이터 수정 버튼 click 이벤트 */
    const onDataEditClick = useCallback((e) => setUpdateId(parseInt(e.currentTarget.dataset.id)), []);

    /** 데이터 수정 버튼 submit 이벤트 */
    const onDataEditSubmit = useCallback((e) => {
        e.preventDefault();

        // 이벤트가 발생한 <form>요소 취득
        const current = e.currentTarget;

        // 입력값에 대한 유효성 검사
        try{
            regexHelper.value('#edit-form input[name="dname"]', '학과명을 입력하세요.');
            regexHelper.maxLength('#edit-form input[name="dname"]', 20, '학과명은 20자 이내로 입력하세요.');
            regexHelper.value('#edit-form input[name="loc"]', '위치를 입력하세요.');
            regexHelper.maxLength('#edit-form input[name="loc"]', 20, '위치는 20자 이내로 입력하세요.');
        } catch (e) {
            alert(e.message);
            e.element.focus();
            return;
        }

        // <form>요소 내의 <input> 요소들을 name속성값으로 접근하여 입력값을 얻음
        const id = parseInt(current.id.value);
        const dname = current.dname.value;
        const loc = current.loc.value;
        console.log(`수정할 데이터 : ${id}, ${dname}, ${loc}`);

        //백엔드에 데이터 수정 요청을 보낸다.
        (async () => {
            //ajax 로딩 시작을 알림
            // setLoading(true);

            // 수정 결과에 대한 json을 받을 변수 준비
            let data = null;

            // 예외처리
            try {
                data = await axiosHelper.put(`/department/${id}`, {
                    dname: dname,
                    loc: loc
                });

                console.group('데이터 수정 결과');
                console.log(data);
                console.groupEnd();
            } catch (e) {
                console.error(e);
                alert(e.message);
                return;
            } finally {
                // ajax 로딩 종료
                // setLoading(false);
            }

            // 현재 출력중인 상태변수 department에 수정된 항목을 교체해야 한다.
            // useEffect안에서 상태변수를 사용해야 하므로 종속변수 배열에 department를 추가한다.
            const editId = department.findIndex((v, i) => v.id === id);
            console.log("수정된 항목의 인덱스 : " + editId);
            const newData = [...department];
            newData.splice(editId, 1, data.item);
            console.log(newData);
            setDepartment(newData);

            // 상태변수를 되돌린다.
            setUpdateId(-1);
        })();
    }, [department]);
    return (
        <DepartmentContainer>
            <h2>Department</h2>
            {/* <Spinner visible={loading} width={200} /> */}

            {/* 입력폼 */}
            <form className='form-container' onSubmit={onDataAddSubmit}>
                <input type="text" name="dname" id="dname" placehoder="학과명을 입력하세요." />
                <input type="text" name="loc" id="loc" placehoder="위치를 입력하세요." />
                <button type="submit">저장하기</button>
            </form>

            {/* 검색폼 */}
            <form className='form-container' onSubmit={onSearchSubmit}>
                <input type="text" name="keyword" />
                <button type="submit">검색</button>
            </form>

            <form onSubmit={onDataEditSubmit} id="edit-form">
                <Table>
                    <thead>
                        <tr>
                            <th>학과번호</th>
                            <th>학과명</th>
                            <th>학과위치</th>
                            <th>수정</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {department.map((v, i) => {
                            if(updateId === v.id) {
                                return (
                                    <tr key={`edit-${v.id}`}>
                                        <td>
                                            {/* value 속성은 반드시 onChange 이벤트와 함께 사용해야 함 */}
                                            {/* onChange 이벤트 없이 사용할 경우 defaultValue 속성을 사용 */}
                                            <input type="hidden" name="id" defaultValue={v.id} />
                                            {v.id}
                                        </td>
                                        <td>
                                            <input type="text" name="dname" defaultValue={v.dname} />
                                        </td>
                                        <td>
                                            <input type="text" name="loc" defaultValue={v.loc} />
                                        </td>
                                        <td colSpan="2">
                                            <button type="submit">수정</button>
                                        </td>
                                    </tr>
                                )
                            } else {
                                return (
                                    <tr key={v.id}>
                                        <td>{v.id}</td>
                                        { keyword ? (
                                            <td dangerouslySetInnerHTML={{__html: v.dname.replaceAll(keyword, `<mark>${keyword}</mark>`)}}></td>
                                        ) : (
                                            <td>{v.dname}</td>
                                        )}
                                        <td>{v.loc}</td>
                                        <td>
                                            <button type="button" data-id={v.id} onClick={onDataEditClick}>수정</button>
                                        </td>
                                        <td>
                                            <button type="button" data-id={v.id} data-dname={v.dname} onClick={onDataDeleteClick}>삭제</button>
                                        </td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </Table>
            </form>
        </DepartmentContainer>
    );
});

export default Department;