import { MovieCard } from "./ui/MovieCard.js";
import { getMoviesData } from "./api.js";
import { getTrimmedText } from "./util/getTrimmedText.js";
import { Loading } from "./util/loading.js";
import { handleBookmark } from "./util/handleBookmark.js";
import { debounce } from "./util/debounce.js";

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
    movieData = parseData(results) || [];
    renderMoviCard(movieData);
    loading.end();
  } catch(error) {
    console.error(error);
    alert(error);
    loading.end();
  }
};

// 서버에서 받아온 데이터에서 필요한 요소만 골라 정제하는 함수
const parseData = (data) => {
  if (!data || data.length === 0) return;
  const parsedData = data.map((_data) => {
    const { id, title, vote_average, poster_path } = _data;
    return { id, title, rate : vote_average.toFixed(1), img :`${IMAGE_BASE_URL}${poster_path}` } 
  });
  return parsedData;
};

// 영화 카드 하나 하나를 그려주는 함수
const renderMoviCard = (movieData) => {
  if(movieData.length === 0 ) return;
  movieData.forEach((data) => $main.appendChild(MovieCard(data)))
};

// 영화 검색 시, 타이핑마다 filtering을 실시하지 않도록 디바운스를 걸어주는 함수
const filterDebounce =  debounce((value) => filterSearchMovie(value));

// 영화 검색 인풋 이벤트
$userSearch.addEventListener('input', function(e) {
   const { value } = e.target;
   filterDebounce(value);
});

// 인풋에서 받아온 검색 값에 맞는 데이터를 필터링하는 함수
const filterSearchMovie = (searchMovie) => {
  const $movieCards = document.querySelectorAll('.movieCard');
  const $noMovie = document.querySelector('.noMovie');
  
  if($noMovie) $noMovie.remove();

  const movie = getTrimmedText(searchMovie.toLowerCase());
  
  const filteredData = movieData.filter((data) => {
    const title = getTrimmedText(data.title);
    return title.includes(movie);
  });

  $movieCards.forEach((card) => card.remove());
  
  renderMoviCard(filteredData);
};

// 북마크 보기
$bookmark.addEventListener('click',() => {
    const $movieCards = document.querySelectorAll('.movieCard');
    const bookmarkedMovies = new Set(handleBookmark('get'));
    const newRenderData = movieData.filter(data => bookmarkedMovies.has(data.id));
    $movieCards.forEach((card) => card.remove());

    if(newRenderData.length === 0){
        //기존에 이미 해당 요소('북마크된 영화가 없습니다.')가 추가되어 있으면 추가하지 않기 위해 분기 처리
      if (!$main.querySelector('.noMovie')) {
        const noBookmarkedMovie = document.createElement('div');
        noBookmarkedMovie.className = 'noMovie';
        noBookmarkedMovie.textContent = '북마크된 영화가 없습니다.';
        $main.appendChild(noBookmarkedMovie);
      } 

    } else renderMoviCard(newRenderData);
})

