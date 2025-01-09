export const MovieCard = (data) => {
 const card =  document.createElement('section'); 
 card.className = 'movieCard';

 const img = document.createElement('img');
 img.src = `https://image.tmdb.org/t/p/original${data.img}`;
 img.alt = data.title;
 card.appendChild(img);

 const h3 = document.createElement('h3'); 
 h3.innerText = data.title;
 card.appendChild(h3);

 const p = document.createElement('p');
 p.innerText=`평점 ${data.rate}`;
 card.appendChild(p);

 return card;
}