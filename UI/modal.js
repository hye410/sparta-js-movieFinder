import { handleBookmark,checkIsBookmark } from "../handleBookmark.js";

const $modal = document.querySelector('.modal');
const BOOK_MARK_ADD = '북마크 추가';
const BOOK_MARK_DELETE = '북마크 삭제';

export const Modal = (data,closeModal) => {

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
  bookmarkBtn.className = 'bookmark';
  bookmarkBtn.textContent =  checkIsBookmark(data.id) ? BOOK_MARK_DELETE : BOOK_MARK_ADD ;

  bookmarkBtn.addEventListener('click', (event) => {
    const target = event.target;
    const text = target.innerText;
    if(text === BOOK_MARK_ADD) {
      target.textContent = BOOK_MARK_DELETE;
      handleBookmark('add',data.id);
    } else {
      target.textContent = BOOK_MARK_ADD;
      handleBookmark('delete',data.id);
    }    
  })

  const closeBtn = document.createElement('p');
  closeBtn.className = 'closeBtn';
  closeBtn.innerHTML = `&times`;
  closeBtn.addEventListener('click',closeModal);

  $modal.innerHTML = '';
  $modal.append(img, title, desc, releaseInfo, rateInfo, bookmarkBtn, closeBtn);  
}

