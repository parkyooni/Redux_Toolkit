import React from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { incremented } from "./features/counter/counter-slice";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0); -> React state의 기능 create react할때 초기 설정로직

  // useAppSelector 별도로 작성 가능 || inline function 가능
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const handleDispatch = () => {
    dispatch(incremented());
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}> */}
        <button onClick={handleDispatch}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
