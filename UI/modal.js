const $modal = document.querySelector('.modal');

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
  bookmarkBtn.textContent = '북마크 추가';
  const closeBtn = document.createElement('p');
  closeBtn.className = 'closeBtn';
  closeBtn.innerHTML = `&times`;
  closeBtn.addEventListener('click',closeModal)


  $modal.innerHTML = '';
  $modal.append(img, title, desc, releaseInfo, rateInfo, bookmarkBtn, closeBtn);  
}