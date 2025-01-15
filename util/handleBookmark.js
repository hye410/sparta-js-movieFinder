
export const handleBookmark = (type,key) => {
  const bookmarkedMovies = localStorage.getItem('bookmark');
  const parsedBookmarkedMovies = JSON.parse(bookmarkedMovies) || []; 
  // 북마크 추가
  if(type === 'add') {
    parsedBookmarkedMovies.push(key);
    const strigifyNewData = stringifyData(parsedBookmarkedMovies);
    localStorage.setItem('bookmark',strigifyNewData);
    alert('북마크에 추가되었습니다.');
  }

  // 북마크 삭제
  else if(type === 'delete') {
    const newData = parsedBookmarkedMovies.filter((data) => data !== key);
    const strigifyNewData = stringifyData(newData);
    localStorage.removeItem('bookmark');
    localStorage.setItem('bookmark',strigifyNewData);
    alert('북마크에서 삭제되었습니다.');
  }
 
  // 북마크된 데이터 내보내기
  else if(type === 'get') {
    const bookmarkedMovies = localStorage.getItem('bookmark');
    return JSON.parse(bookmarkedMovies);
  }

};

// 매개변수로 받은 key가 현재 localStorage bookmard에 저장되어있는지 확인하는 함수
export const checkIsBookmark = (key) => {
  const bookmarkedMovies = localStorage.getItem('bookmark');
  const parsedBookmarkedMovies = JSON.parse(bookmarkedMovies) || []; 
  return parsedBookmarkedMovies.findIndex((data) => data === key) !== -1;
};

const stringifyData = (data) => JSON.stringify(data); // localStorage에 저장하기 위해 문자열로 반환하는 함수