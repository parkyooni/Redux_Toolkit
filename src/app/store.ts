import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
// Redux Create Store Redux Dev Tools Extenstions 자동으로 on.
// Thunk 미들웨어를 자동으로 추가 및 우발적인 돌연병이와 같은 일반적인 실수를 감지하고, 몇 가지 개발 검사를 자동으로 활성화.
import counterReducer from "../features/counter/counter-slice";

import { apiSlice } from "../features/dogs/dogs-api-slice";

export const store = configureStore({
  reducer: {
    // Combine Reducer가 호출되어 state에 "state.counterfield" 생성
    counter: counterReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // middleware field : callback 함수로 정의
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

// TS 선언으로 dispatch를 store에서 내보냄
export type AppDispatch = typeof store.dispatch;

// 해당 저장소에 더 많은 slice reducer를 추가하면, 해당 유형이 자동으로 업뎃 처리해줌
export type RootState = ReturnType<typeof store.getState>; // <typeof store.getState>; TS의 내장객체
