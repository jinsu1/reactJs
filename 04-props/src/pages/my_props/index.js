import React from "react";

import Meta from "../../components/Meta";
import MyPropsSub from "./MyPropsSub";

const MyProps = () => {
    return (
        <div>
            <h2>MyProps</h2>

            <MyPropsSub />
            <MyPropsSub name='민호' age='19' />
            <MyPropsSub name='수영' age={20} />
        </div>
    );
};

export default MyProps;