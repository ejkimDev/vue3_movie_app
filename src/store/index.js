/* store를 관리해주는 구성옵션을 정리해주는 파일 */
import { createStore } from 'vuex'
import movie from './movie.js'    // 영화 정보 모듈
import about from './about.js'    // 개발자 /사용자 정보 모듈

/* createStore : 스토어를 생성해주는 함수 */
export default createStore({
  /* modules : 데이터 타입들의 모듈이 연결되는 구조(영화 정보 / 프로젝트 정보 구분) */
  modules: {      
    movie, // movie: movie
    about
  }
})