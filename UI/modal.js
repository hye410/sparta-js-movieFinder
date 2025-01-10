import { BASE_URL, IMAGE_BASE_URL, PUBLIC_KEY } from "../index.js";
import { API_KEY } from "../private.js";

const $modal = document.querySelector('.modal');
const $curtain = document.querySelector('#curtain');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY || PUBLIC_KEY}`
  }
}

const getDetailMovieData = async (key) => {
  try{
   const res = await fetch(`${BASE_URL}/movie/${key}?language=ko-KR`, options);
   if(!res.ok) throw new Error('데이터를 불러오지 못했습니다.');
   const data = await res.json();
   return parseDetailData(data);
  } catch  (crror) {
      alert(err?.status_message || '에러가 발생했습니다.');
      closeModal();
  }
}

const parseDetailData = (data) => {
  if(Object.keys(data).length === 0) return;
  return {
    title : data.title,
    desc : data.overview,
    release : data.release_date,
    rate : data.vote_average,
    img : `${IMAGE_BASE_URL}${data.poster_path}`
  }
  // return makeModal(movieDetailData);
}

export const Modal = async (key) => {
  if(!key) return;
  if(key) {
    console.log('key',key)
    $modal.className = 'openModal';
    $curtain.style.display = 'block';
    document.body.style.overflow = 'hidden';
    const movieDetailData = await getDetailMovieData(key);
    makeModal(movieDetailData);
  }
}


const makeModal = (data) => {
  const img = document.createElement('img');
  img.src = data.img;
  img.alt = data.title;
  const title = document.createElement('h3');
  title.textContent = data.title;
  const desc = document.createElement('p');
  desc.textContent = data.desc;
  const releaseInfo = document.createElement('dl');
  const releaseTitle = document.createElement('dt');
  releaseTitle.textContent = '개봉일';
  const releaseDate = document.createElement('dd');
  releaseDate.textContent = data.release;
  releaseInfo.append(releaseTitle,releaseDate);

  const rateInfo = document.createElement('dl');
  const rateTitle =  document.createElement('dt');
  rateTitle.textContent = '평점';
  const rate = document.createElement('dd');
  rate.textContent = data.rate;
  rateInfo.append(rateTitle,rate);
 
  const bookmarkBtn = document.createElement('button');
  bookmarkBtn.textContent = '북마크 추가';
  const closeBtn = document.createElement('p');
  closeBtn.className = 'closeBtn';
  closeBtn.innerHTML = `&times`;
  closeBtn.addEventListener('click',closeModal)


  $modal.innerHTML = '';
  $modal.append(img, title, desc, releaseInfo, rateInfo, bookmarkBtn, closeBtn);  
}

const closeModal = () => {
    $modal.className = 'closeModal'
    $curtain.style.display = 'none';
    $modal.innerHTML = '';
    document.body.style.overflow = 'scroll';
}