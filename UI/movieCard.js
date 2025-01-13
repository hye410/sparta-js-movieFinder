import { modal as OpenModal } from "../src/modal.js";


export const MovieCard = (data) => {
 const card =  document.createElement('section'); 
 card.className = 'movieCard';
 card.dataset.id = data.id;

 const img = document.createElement('img');
 img.src = data.img;
 img.alt = data.title;

 const h3 = document.createElement('h3'); 
 h3.innerText = data.title;

 const p = document.createElement('p');
 p.innerText=`평점 ${data.rate}`;


card.addEventListener('click', () => {
  
  const movieKey = card.dataset.id;
  OpenModal(movieKey);
})

 card.append(img, h3, p);

 return card;
}

