import React, {memo, useCallback} from 'react';

import styled from 'styled-components';

import { collapseContent } from '../../dataset';

const CollapseExContainer = styled.div`
    .collapse-title {
        background-color: #777;
        color:white;
        cursor: pointer;
        padding: 22px;
        box-sizing: border-box;
        margin: 0;
        font-size: 16px;

        &:hover {
            background-color: #555;
        }

        &.active {
            background-color: #222;
        }
    }

    .collapse-content {
        background-color: #f1f1f1;
        border-left: 1px solid #222;
        border-right: 1px solid #222;
        height: 0;
        overflow: hidden;
        transition: height .2s ease-out;

        p {
            margin: 0;
            padding: 20px 40px;
        }

        &:last-child {
            border-bottom: 1px solid #222;
        }
    }

`;

const CollapseEx = memo(() => {

    const onCollapseTitleClick = useCallback((e) => {
        const current = e.currentTarget;
        current.classList.toggle('active');

        const content = current.parentElement.querySelector('.collapse-content');

        if(current.classList.contains('active')) {
            content.style.height = `${content.scrollHeight}px`;
        } else {
            content.style.height = "0px";
        }
    }, []);
    

    return (
        <CollapseExContainer>
            <h2>CollapseEx</h2>

            { collapseContent.map( ({title, content}, i) => {
                return (
                    <div key={i}>
                        <h1 className="collapse-title" onClick={onCollapseTitleClick}>
                            {title}
                        </h1>
                        <div className="collapse-content">
                            <p>{content}</p>
                        </div>
                    </div>
                )
            })}
        </CollapseExContainer>
    );
});

export default CollapseEx;