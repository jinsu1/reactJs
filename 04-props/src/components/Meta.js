import React from "react";

import { Helmet, HelmetProvider} from "react-helmet-async";
import sample from "../assets/img/sample.png"


const Meta = ({title = "React Example", description = "React.js 예제 입니다.", author = "진수",
               subject = "React.js Frontend Programming", copyright = "park J.S",
               keywords = "React", url = window.location.href, image = sample,
               icon = null, shortcutIcon = null, appleTouchIcon = null }) => {
    return (
        <HelmetProvider>
            <Helmet>
                <meta charset="utf-8" />
                <title>{title}</title>
                {/* SEO 태그 */}
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <meta name="subject" content={subject} />
                <meta name="copyright" content={copyright} />
                <meta name="content-language" content="ko" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={url} />
                <meta property="og:image" content={image} />
                <link rel="icon" href={icon} type="image/png" />
                <link rel="shortcut" href={shortcutIcon} type="image/png" />
                <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap" rel="stylesheet" />
            </Helmet>
        </HelmetProvider>
    );
};

export default Meta;