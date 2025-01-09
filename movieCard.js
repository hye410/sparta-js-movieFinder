const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

export const MovieCard = (data) => {
 const card =  document.createElement('section'); 
 card.className = 'movieCard';

 const img = document.createElement('img');
 img.src = `${IMAGE_BASE_URL}${data.img}`;
 img.alt = data.title;

 const h3 = document.createElement('h3'); 
 h3.innerText = data.title;

 const p = document.createElement('p');
 p.innerText=`평점 ${data.rate}`;

 card.append(img, h3, p);

 return card;
}