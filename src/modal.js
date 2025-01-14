import { IMAGE_BASE_URL } from "../index.js";
import { Modal as renderModal } from '../ui/Modal.js';
import { Loading } from "../util/loading.js";
import { getDetailMovie } from "../api.js";


const $curtain = document.querySelector('#curtain');
const $modal = document.querySelector('.modal');

const loading = new Loading($modal);

// 특정 영화의 상세 데이터를 서버에서 받아온다.
const getDetailMovieData = async (key) => {
  try{
    const data = await getDetailMovie(key);
   return parseDetailData(data);
  } catch  (error) {
      console.error(error);
      alert(error);
      closeModal();
  }
}

// 받아온 데이터에서 필요한 요소만 거른다.
const parseDetailData = (data) => {
  if(Object.keys(data).length === 0) return;
  return {
    id:data.id,
    title : data.title,
    desc : data.overview,
    release : data.release_date,
    rate : data.vote_average?.toFixed(1),
    img : `${IMAGE_BASE_URL}${data.poster_path}`
  }
}

export const modal = async (key) => {
  if(!key) return;
  if(key) {
    loading.create();
    loading.start();
    $modal.className = 'openModal';
    $curtain.style.display = 'block';
    document.body.style.overflow = 'hidden';
    try{
      const movieDetailData = await getDetailMovieData(key);
      loading.end();
      renderModal(movieDetailData,closeModal);
    } catch(error) {
      console.error(error);
      alert(error);
    }
  }
}

const closeModal = () => {
    $modal.className = 'closeModal'
    $curtain.style.display = 'none';
    $modal.innerHTML = '';
    document.body.style.overflow = 'scroll';
}



