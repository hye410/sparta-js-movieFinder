const $modal = document.getElementsByClassName('modal');

// loading spinner 

export class Loading  {
  constructor (location) {
    this.location = location; 
  }
  create () {
    const loading = document.createElement('div');
    loading.id = 'loading';
    loading.style.display = 'none';
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    loading.append(spinner);
    this.location.append(loading);
  }
  start () {
    const $loading = document.querySelector('#loading');
    $loading.style.display = 'block';
  } 
  end () {
    const $loading = document.querySelector('#loading');
    $loading.style.display = 'none';
    $loading.remove();
  }
}