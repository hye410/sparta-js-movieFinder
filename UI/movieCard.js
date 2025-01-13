import { modal as OpenModal } from "../src/modal.js";

const $main = document.getElementById('main');

export const MovieCard = (data) => {
 const card =  document.createElement('section'); 
 card.className = 'movieCard';
 card.dataset.id = data.id;

 const img = document.createElement('img');
 img.src = data.img;
 img.alt = data.title;

 const h3 = document.createElement('h3'); 
 h3.innerText = data.title;
 h3.className='titleTest'

 const p = document.createElement('p');
 p.innerText=`평점 ${data.rate}`;

 card.append(img, h3, p);

 return card;
}

$main.addEventListener('click', (event) => {
  const clickTarget = event.target;
  const movieCard = clickTarget.closest('.movieCard');
  if(movieCard) {
    const targetId = movieCard.dataset.id;
    OpenModal(targetId);
  }
})

