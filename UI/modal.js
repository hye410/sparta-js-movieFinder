import { debounce } from "../util/debounce.js";
import { handleBookmark,checkIsBookmark } from "../util/handleBookmark.js";

/**
 *  Modal : 영화 카드 section 클릭 시 열리는 상세 모달을 그려주는 함수
 */

const $modal = document.querySelector('.modal');
const BOOK_MARK_ADD = '북마크 추가';
const BOOK_MARK_DELETE = '북마크 삭제';

const addDebounce = debounce((value) =>  handleBookmark('add',value),100); // 북마크 추가 시 디바운스
const deleteDebounce = debounce((value) => handleBookmark('delete',value),100); // 북마크 삭제 시 디바운스

export const Modal = (data,closeModal) => {
//이미지
  const img = document.createElement('img');
  img.src = data.img;
  img.alt = data.title;

//제목
  const title = document.createElement('h3');
  title.textContent = data.title;

//상세설명
  const desc = document.createElement('p');
  desc.textContent = data.desc;

///개봉일
  const releaseInfo = document.createElement('dl');
  const releaseTitle = document.createElement('dt');
  const releaseDate = document.createElement('dd');
  releaseTitle.textContent = '개봉일';
  releaseDate.textContent = data.release;
  releaseInfo.append(releaseTitle,releaseDate);


//평점
  const rateInfo = document.createElement('dl');
  const rateTitle =  document.createElement('dt');
  const rate = document.createElement('dd');
  rateTitle.textContent = '평점';
  rate.textContent = data.rate;
  rateInfo.append(rateTitle,rate);


 //북마크 버튼
  const bookmarkBtn = document.createElement('button');
  bookmarkBtn.className = 'bookmark';
  bookmarkBtn.textContent =  checkIsBookmark(data.id) ? BOOK_MARK_DELETE : BOOK_MARK_ADD ;

  bookmarkBtn.addEventListener('click', (event) => {
    const target = event.target;
    const text = target.innerText;
    if(text === BOOK_MARK_ADD) {
      target.textContent = BOOK_MARK_DELETE;
      addDebounce(data.id);
    } else {
      target.textContent = BOOK_MARK_ADD;
      deleteDebounce(data.id);
    }    
  })


  //닫기 버튼
  const closeBtn = document.createElement('p');
  closeBtn.className = 'closeBtn';
  closeBtn.innerHTML = `&times`;
  closeBtn.addEventListener('click',closeModal);


  $modal.innerHTML = '';
  $modal.append(img, title, desc, releaseInfo, rateInfo, bookmarkBtn, closeBtn);  
}

