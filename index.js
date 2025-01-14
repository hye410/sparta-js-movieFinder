import { MovieCard } from "./ui/MovieCard.js";
import { getMoviesData } from "./api.js";
import { getTrimmedText } from "./util/getTrimmedText.js";
import { Loading } from "./util/loading.js";
import { handleBookmark } from "./handleBookmark.js";

////// Dom 조작 변수 /////
const $main = document.getElementById('main');
const $userSearch = document.getElementById('userSearch');
const $bookmark = document.getElementById('bookmarkedMovies');
/////////// //////////


export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';


let movieData = new Array();
const loading = new Loading($main);

getMovieData(); // 서버에서 data를 불러온다.


 async function getMovieData() {
  loading.create();
  loading.start();
  try{
    const data = await getMoviesData();
    const { results } = data;
    movieData = parseData(results);
    renderMoviCard(movieData);
    loading.end();
  } catch(error) {
    alert(error);
  }
};

const parseData = (data) => {
  if (data.length === 0) return;
  const parsedData = data.map((_data) => {
    const { id, title, vote_average, poster_path } = _data;
    return { id, title, rate : vote_average.toFixed(1), img :`${IMAGE_BASE_URL}${poster_path}` } 
  });
  return parsedData;
};


const renderMoviCard = (movieData) => {
  movieData.forEach((data) => $main.appendChild(MovieCard(data)))
};


$userSearch.addEventListener('input', function(e) {
  filterSearchMovie(e.target.value);
});



const filterSearchMovie = (searchMovie) => {
  const $movieCards = document.querySelectorAll('.movieCard');
  const movie = getTrimmedText(searchMovie.toLowerCase());
  
  const filteredData = movieData.filter((data) => {
    const title = getTrimmedText(data.title);
    return title.includes(movie);
  });

  $movieCards.forEach((card) => card.remove())
  renderMoviCard(filteredData);
};


$bookmark.addEventListener('click',() => {
  const $movieCards = document.querySelectorAll('.movieCard');
  const bookmarkedMovies = new Set(handleBookmark('get'));
  const newRenderData = movieData.filter(data => bookmarkedMovies.has(data.id));
  $movieCards.forEach((card) => card.remove());
  renderMoviCard(newRenderData);
})

