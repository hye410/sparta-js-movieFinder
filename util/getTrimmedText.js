//**
// string내의 공백을 제거해주는 함수 
//  */

export const getTrimmedText = (text) => {
  return text.replace(/(\s*)/g,'');
}