import { MovieCard } from "./MovieCard.js";
import { API_KEY } from "./private.js";

////// Dom 조작 변수 /////
const $main = document.getElementById('main');
/////////// //////////

getMovieData(); // 서버에서 data를 불러온다.

let movieData = new Array();

 async function getMovieData () {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  };
  
  await fetch('https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1', options)
    .then(res => res.json())
    .then(res => {
      const { results } = res;
      movieData = parseData(results);
      makeMovieCard(movieData);
    })
    .catch(err => {
      alert(err?.status_message || '에러가 발생했습니다.');
    });
};

const parseData = (data) => {
  if (data.length === 0) return;
  return data.map((_data) => {
    const { id, title, vote_average, poster_path } = _data;
    return { id, title, rate : vote_average, img : poster_path } 
  })
}

const makeMovieCard = (movieData) => {
  movieData.forEach((data) => {
    $main.appendChild(MovieCard(data));
  })
}






