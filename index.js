const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTEyNzBkMDYxZTliNzQ0NmZiNzBiOGYzNWExNjlkYyIsIm5iZiI6MTczNjI5NTgyNi45NjgsInN1YiI6IjY3N2RjNTkyYjExZDA4ODExMTdhZjczNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kECnKC_ZIyWp-vTFYGO9m4QSto2APLO3axKckaOs11Q`
  }
};

fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', options)
  .then(res => res.json())
  .then(res => console.log('!!!!!!res',res))
  .catch(err => console.error(err));

