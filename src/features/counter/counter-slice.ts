// single file
// Redux는 기본적으로 4개의 형태를 가지며, 해당 프로젝트는 단일 파일로 작성 예정으로 이를 slice-file로 지칭 -> 이유 : Redux의 한조각에 대한 논리와 데이터를 나타내기 위함

// [ DUCKS Pattern ]
// D
// U
// C
// K
// S
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// createSlice -> Redux 논리정의
// PayloadAction -> TypeScript 유형

// slice는 숫자로 다룸
interface CounterSate {
  value: number;
}
// slice 초기상태 정의
const initialState: CounterSate = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // increment
    // incremented : inline obj function
    incremented(state) {
      // it's okay todo this because immer makes it mmutable under the nood
      state.value += 1;
    },

    // PayloadAction type : obj || array || number
    amountAdded(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
    // decrement
    // reset
  },
});

// createSlice an Other
// 1. reducer 기능인 [slice audio]

export const { incremented, amountAdded } = counterSlice.actions;
export default counterSlice.reducer;
