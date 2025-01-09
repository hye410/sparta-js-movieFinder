import { MovieCard } from "./MovieCard.js";
import { API_KEY } from "./private.js";
import { getTrimmedText } from "./util/getTrimmedText.js";

////// Dom 조작 변수 /////
const $main = document.getElementById('main');
const $userSearch = document.getElementById('userSearch');
/////////// //////////
const BASE_URL = 'https://api.themoviedb.org/3/';
const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTEyNzBkMDYxZTliNzQ0NmZiNzBiOGYzNWExNjlkYyIsIm5iZiI6MTczNjI5NTgyNi45NjgsInN1YiI6IjY3N2RjNTkyYjExZDA4ODExMTdhZjczNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kECnKC_ZIyWp-vTFYGO9m4QSto2APLO3axKckaOs11Q';


getMovieData(); // 서버에서 data를 불러온다.

let movieData = new Array();


 async function getMovieData () {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY || PUBLIC_KEY}`
    }
  };
  
  await fetch(`${BASE_URL}movie/now_playing?language=ko-KR&page=1`, options)
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

$userSearch.addEventListener("input", function(e) {
  filterSearchMovie(e.target.value);
});

const filterSearchMovie = (searchMovie) => {
  const movie = getTrimmedText(searchMovie.toLowerCase());
  
  const filteredData = movieData.filter((data) => {
    const title = getTrimmedText(data.title);
    return title.includes(movie);
  });

  $main.innerHTML = "";
  makeMovieCard(filteredData);
}

