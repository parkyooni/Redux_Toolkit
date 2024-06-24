// TS사용자들에게 권장되는 새로운 패턴
// React-Redux : hooks가 있으며, 해당하는 hookrk 어떻게 작성하는지 알려주는 TS가 있으나, 특정 상태에 대해 아무것도 모르는 단점이있음.

// 단점으로 인해 state * dispatch에 적합한 유형을 이미 알고있는 React-Redux hook의 사전 정의 버전으로 만드는작업이 가장 효율적
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
