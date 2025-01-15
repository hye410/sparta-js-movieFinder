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

// 현재 상영 중인 영화의 데이터를 불러옴.
export const getMoviesData = async () => {
  try{
    const res =  await fetch(`${BASE_URL}/movie/now_playing?language=ko-KR&page=1`, options);
    const result = await res.json();
    if(!res.ok) throw new Error(result.status_message || DEFAULT_FETCH_ERROR_MESSAGE)
    return result;
  } catch(error) {
    throw error|| DEFAULT_ERROR_MESSAGE;
  }
}

// 특정 영화의 상세 데이터를 불러옴.
export const getDetailMovie = async (key) => {
  try {
    const res = await fetch(`${BASE_URL}/movie/${key}?language=ko-KR`, options);
    const result = await res.json();
    if(!res.ok) throw new Error(result.status_message || DEFAULT_FETCH_ERROR_MESSAGE);
    return result;
  } catch(error) {
    throw error || DEFAULT_ERROR_MESSAGE; 
  }
};

