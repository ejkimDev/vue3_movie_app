export default {    // 객체 데이터 기본 내보내기
  install(app) {
    app.config.globalProperties.$loadImage = (src) => {    // src를 인수로 받아서 매개변수로 사용
      return new Promise(resolve => {
        const img = document.createElement('img');    // img 요소를 생성해서 메모리에 저장
        img.src = src;
        img.addEventListener('load', () => {          // 이미지가 준비되어 로드가 완료되면 콜백함수 실행
          // 로드가 완료되었다.
          resolve();
        });
      }) 
    }
  }
}