import { IMAGE_BASE_URL } from "../index.js";
import { Modal as renderModal } from '../ui/Modal.js';
import { Loading } from "../util/loading.js";
import { getDetailMovie } from "../api.js";


const $curtain = document.querySelector('#curtain');
const $modal = document.querySelector('.modal');

const loading = new Loading($modal);

const getDetailMovieData =  async (key) => {
  try{
    const data = await getDetailMovie(key);
   return parseDetailData(data);
  } catch  (error) {
      alert(error);
      closeModal();
  }
}

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
    const movieDetailData = await getDetailMovieData(key);
    loading.end();
    renderModal(movieDetailData,closeModal);
  }
}

const closeModal = () => {
    $modal.className = 'closeModal'
    $curtain.style.display = 'none';
    $modal.innerHTML = '';
    document.body.style.overflow = 'scroll';
}



