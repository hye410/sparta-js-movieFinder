import { modal as OpenModal } from "../src/modal.js";

/**
 *  MovieCard : 영화 카드 section을 그려주는 함수
 */

const $main = document.getElementById('main');

export const MovieCard = (data) => {
 const card =  document.createElement('section'); 
 card.className = 'movieCard';
 card.dataset.id = data.id;

 // 이미지
 const img = document.createElement('img');
 img.src = data.img;
 img.alt = data.title;

 // 제목
 const h3 = document.createElement('h3'); 
 h3.innerText = data.title;
 h3.className='titleTest'

 // 평점
 const p = document.createElement('p');
 p.innerText=`평점 ${data.rate}`;

 card.append(img, h3, p);

 return card;
}

// moiveCard 클릭 시 모달을 열어주는 이벤트
$main.addEventListener('click', (event) => {
  const clickTarget = event.target;
  const movieCard = clickTarget.closest('.movieCard');
  if(movieCard) {
    const targetId = movieCard.dataset.id;
    OpenModal(targetId);
  }
})

