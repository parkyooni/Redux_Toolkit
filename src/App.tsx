import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { incremented, amountAdded } from "./features/counter/counter-slice";
import { useFetchBreedsQuery } from "./features/dogs/dogs-api-slice";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0); -> React state의 기능 create react할때 초기 설정로직

  // useAppSelector 별도로 작성 가능 || inline function 가능
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const handleDispatch = () => {
    // incremented by 1
    // dispatch(incremented());
    // amountAdded by a fixed amount
    dispatch(amountAdded(3));
  };

  // API 요청한 데이터를 select 태그를 통해서 데이터 배열의 길이 사용자가 설정하기
  const [numDogs, setNumDogs] = useState(10);
  // -> 처음 API를 useFetchBreedsQuery 함수를 통해 요청할때 기본값이 10개이며,
  // 해당 부분의 select의 변경으로 10개보다 이하일떄는 데이터를 재용청하지않고, store에 데이터가 캐싱되어 그값을 사용,
  // 10개의 기본값보다 많은 값을 요청할경우 데이터 요청
  // 캐싱된 데이터튼 일정시간이 흐른뒤에 캐싱된 데이터는 자동으로 삭제됨. (이벤트 동작이 더이상 발생하지않는경우)

  const { data = [], isFetching } = useFetchBreedsQuery(numDogs);
  // data는 undefined를 뜨기떄문에 안정적인 코드를 위해 빈배열로 담음
  // isFetching : promise로 데이터를 요청해서 받아올때, pending으로 불러오는중에 true이면 이전 데이터가 있는경우를 제외하고 Loading식으로 보여줌.

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

      <div>
        <p>Dogs to fetch: </p>
        <select
          name=""
          id=""
          value={numDogs}
          onChange={(e) => setNumDogs(Number(e.target.value))} // 문자열로 받아온 데이터값으로 인하여 e.target.value
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>

      <div className="read-the-docs">
        <p>Number of dogs fetched {data.length}</p>
        {/* 10개의 limte으로 인하여 개발자도구 : redux에 10개의 배열이 담긴것 확인됨 -> 해당 데이터를 table로 UI 작용
        useFetchBreedsQuery()의 기본값이 10개로, 값을 직접 추가시, 해당 데이터길이로 가져옴*/}
        <div>{isFetching ? "...refetching" : ""}</div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {data.map((breed) => (
              <tr key={breed.id}>
                <td>{breed.name}</td>
                <td>
                  <img src={breed.image.url} alt={breed.name} height={250} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
