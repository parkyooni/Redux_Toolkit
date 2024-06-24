// dogs의 API를 받아와서 Redux에 넣을 key 세팅
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const DOGS_API_KEY = "cbfb51a2-84b6-4025-a3e2-ed8616edf311";

// API에서 다시 가져올것으로 예상되는 데이터 유형 정의
interface Breed {
  id: string;
  name: string;
  image: {
    url: string;
  };
}

// 각각에 대한 endpoint의 API를정의
export const apiSlice = createApi({
  // Redux Store에 연결할때,  reducer 데이터를 어디에 보관하고 있는지 코드가 아는데 도움을 줌.
  // reducerPath : 문자열 필드
  reducerPath: "api",
  // 가져오기 기반 쿼리 자체 래퍼 in Query
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.thedogapi.com/v1", // API는 Angular 작업된 사이트로, 해당 API에서 필요한 부분을 endpoint로 가져올예정
    prepareHeaders(headers) {
      //요청하여 통신할 key를 baseUrl에 담아 보내기 위해 header에 넣기
      headers.set("x-api-key", DOGS_API_KEY);

      return headers;
    },
  }),

  // RTK Query : 구조의 일부로 예상되는 끝점을 미리 정의하는 접근 방식으로 endpoint 접근
  endpoints(builder) {
    // 내부 객체 반환.
    // 해당 API의 builder에서 생성된 endpoint정의 역할
    // RTK는 Angular와 함께 작동 가능.
    return {
      // 품종가져오기 API 가져올예정
      fetchBreeds: builder.query<Breed[], number | void>({
        query(limit = 10) {
          // 10개씩 가져올예정
          return `/breeds?limit=${limit}`;
        },
      }),
    };
  },
});

// fetchBreeds: 가져오기위한 쿼리문
// useFetchBreedsQuery:  업데이트 데이터를 게시하기 위해 변형 요청 수행
export const { useFetchBreedsQuery } = apiSlice;
