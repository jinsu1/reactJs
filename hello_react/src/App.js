import React from "react";

import Hello from './MyComponent1';
import World from './MyComponent2';

// App 이라는 이름의 함수형 컴포넌트 정의
// 반환되는 HTML 코드는 JSX 문법을 사용한다.
// JSX : XML 과 비슷한 React 전용 Javascript 확장 문법
function App() {
  return (
    <div>
        <h1>Hello React</h1>
        
        {/* Hello와 World 라는 이름의 컴포넌트 출력 */}
        <Hello></Hello>
        <World />
    </div>
  );
}

export default App;
