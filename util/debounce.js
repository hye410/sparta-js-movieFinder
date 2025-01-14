//**
// debounce 처리해주는 함수
//  */

export const debounce = (cb, delay = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => cb(...args),delay)
  }
}