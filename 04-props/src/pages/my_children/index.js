import React from "react";

import Meta from "../../components/Meta";
import MyChildrenSub from "./MyChildrenSub";

const MyChildren = () => {
    return (
        <div>
            {/* Route처리를 적용 받는 페이지에서 이 컴포넌트를 중복 사용시 App.js에서의 설정을 덮어쓰게 된다. */}

            <Meta title="MyChildren.js" description="여기는 Mychildren.js 입니다." />

            <h2>MyChildren</h2>

            <MyChildrenSub width={400} height={100}><b>Hello World</b></MyChildrenSub>
            <MyChildrenSub width={300} height={80}>안녕 React</MyChildrenSub>
            <MyChildrenSub width={200} height={50} />
        </div>
    );
};

export default MyChildren;