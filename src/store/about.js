/* 개발자 / 사용자와 관련된 데이터를 취급하는 파일 */
export default {
  namespaced: true,
  // state는 객체 데이터를 반환
  // 함수로 만든 이유? 
  // 객체 데이터는 배열 데이터와 동일하게 참조형 데이터이다. 
  // => 데이터의 불변성을 유지하려면 함수로 만들어서 반환해야 데이터가 고유해진다.
  state: () => ({
    name: 'EJKIM',
    email: 'ejkim.dev@gmail.com',
    blog: 'https://searchkim.tistory.com',
    phone: '+82-10-6631-6158',
    image: 'https://tistory3.daumcdn.net/tistory/4669904/skinSetting/4a03d2214cc74c7cb8c599a9b55c1a81'
  })
}
