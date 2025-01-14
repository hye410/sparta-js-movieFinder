import { API_KEY } from "./private.js";
const BASE_URL = 'https://api.themoviedb.org/3';
const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTEyNzBkMDYxZTliNzQ0NmZiNzBiOGYzNWExNjlkYyIsIm5iZiI6MTczNjI5NTgyNi45NjgsInN1YiI6IjY3N2RjNTkyYjExZDA4ODExMTdhZjczNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kECnKC_ZIyWp-vTFYGO9m4QSto2APLO3axKckaOs11Q';
const DEFAULT_ERROR_MESSAGE = '에러가 발생했습니다.';
const DEFAULT_FETCH_ERROR_MESSAGE = '데이터를 불러오지 못했습니다.';


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY || PUBLIC_KEY}`
  }
}


export const getMoviesData = async () => {
  try{
    const res =  await fetch(`${BASE_URL}/movie/now_playing?language=ko-KR&page=1`, options);
    if(!res.ok) throw new Error(DEFAULT_FETCH_ERROR_MESSAGE);
    const data = await res.json();
    return data;
  } catch(error) {
    throw error|| DEFAULT_ERROR_MESSAGE;
  }
}

export const getDetailMovie = async (key) => {
  try {
    const res = await fetch(`${BASE_URL}/movie/${key}?language=ko-KR`, options);
    if(!res.ok) throw new Error(DEFAULT_FETCH_ERROR_MESSAGE);
    const data = await res.json();
    return data;
  } catch(error) {
    throw error || DEFAULT_ERROR_MESSAGE; 
  }
};

// export const getMoviesDataTest = async (key) => {
//   try{
//     const res =  await fetch(`${BASE_URL}/movie/now_playing/${key}?language=ko-KR&page=1`, options);
//     // if(!res.ok){ throw new Error(res?.status_message || DEFAULT_FETCH_ERROR_MESSAGE);}
//     if (!res.ok) {
//       const errorData = await res.json().catch(() => null);
//       const errorMessage = errorData?.status_message || DEFAULT_FETCH_ERROR_MESSAGE;
//       throw new Error(errorMessage); 
//     }
//     const data = await res.json();
//     return data;
//   } catch(error) {
//     throw error;
//   }
// }