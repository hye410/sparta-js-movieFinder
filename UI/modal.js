import { BASE_URL, PUBLIC_KEY } from "../index.js";
import { API_KEY } from "../private.js";


const $modal = document.querySelector('.modal');
const $closeButton = document.querySelector('.closeBtn');
export const Modal = (key) => {
  if(key) {
    $modal.className = 'openModal';
    getDetailMovieData(key);
  }

  $closeButton.addEventListener('click', function () {
    $modal.className = 'closeModal'
  })
}

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY || PUBLIC_KEY}`
  }
}

const getDetailMovieData = async (key) => {
  await fetch(`${BASE_URL}/movie/${key}?language=ko-KR`, options)
    .then(res => res.json())
    .then(res => {
     console.log(res)
    })
    .catch((err) => {
      alert(err?.status_message || '에러가 발생했습니다.');
    });
}

  

