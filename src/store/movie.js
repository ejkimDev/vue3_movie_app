/* 영화 검색과 관련된 데이터를 취급하는 파일 */
import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'   // uniqBy 기능만 사용할 것이기 때문에 lodash/uniqBy 명시

export default {
  /*
  * namespaced : 해당 파일이 모듈화돼서 사용할 수 있다는 것을 나타내는 옵션.(true / false)
  * state : 실제로 취급해야하는 데이터. store 개념에서는 data를 state라고 부른다.(data와 같은 개념)
  * getters : 계산된 상태를 만들어내는 개념.(computed와 같은 개념)
  * mutations : 변이라는 뜻. 관리하는 데이터를 변경시켜줄 수 있는 methods. mutations에서만 데이터를 수정할 수 있다.
  * actions : 비동기로 동작하는 methods. 데이터를 수정할 수 없다. state 옵션 사용 불가능 -> context 사용해야한다.
  * - context.state / context.getters / context.commit 사용 => 객체구조분해를 통해 {state, getters, commit} 으로 사용할 수 있다.
  */
  namespaced: true,
  state: () => ({
    movies: [],
    message: 'Search for the movie title!',   // 초기 상태 메시지
    loading: false,                           // loading 상태 여부 (기본값 : 로딩이 되고 있지 않음)
    theMovie: {}                              // 영화 상세 정보
  }),
  getters: {},
  mutations: {
    /* state를 바꿔줄 수 있는건 mutations 밖에 없기 때문에
    state에 정의된 데이터를 통합적으로 갱신할 수 있는 mutation을 만들어준다. */
    updateState(state, payload) {   // 상태를 갱신할때마다 수정하는 메소드
      // Object.keys : 객체 데이터 속성의 이름만 갖고 새로운 배열 데이터 생성 (ex.['movies', 'message', 'loading'])
      Object.keys(payload).forEach(key => {   // ex. key : movies, message, loading
        // state.movies = payload.movies를 동적으로 전표기법을 제거하고 state['movies']라고 지정할 수 있다.
        // state['movies'] = payload['movies'] => state[key] = payload[key]
        state[key] = payload[key];
      })
    },
    resetMovies(state) {
      state.movies = [];
      state.message = 'Search for the movie title!';   // 초기 상태 메시지
      state.loading = false;
    }
  },
  actions: {
    /*
    * SearchMovies : 여러 개의 영화 검색 결과 목록을 가져옴 
    */
    // actions의 메소드에는 context, payload 매개변수를 제공한다.
    // context : state, getters.commit 활용
    // payload : 인수로 들어온 데이터를 받아줌
    async searchMovies({ state, commit }, payload) {    // (c, p)로도 사용이 가능하다. (매개변수 이름 변경 가능)
      if(state.loading) return; // 로딩 중이면 함수를 빠져나감 (동작 중복 제거)

      commit('updateState', {   // 검색을 시작하면 message는 초기화
        message: '',
        loading: true           // 로딩 중
      });

      try {
        // 최초 요청은 page가 1
        const res = await _fetchMovie({
          // searchMovies의 payload에 이미 원하는 데이터가 있기 때문에 전개 연산자 사용
          ...payload,
          page : 1
        });
        
        // res 검색결과의 data에 실제 검색결과가 존재하므로 res.data 사용 
        const { Search, totalResults } = res.data;    // 검색 결과의 data를 객체구조분해
        // context의 commit 활용
        commit('updateState', {    // updateState 메소드가 실행될 때, 객체가 payload 인수로 전달된다.
          movies: _uniqBy(Search, 'imdbID'),    // imdbID 기준으로 movies 중복 제거
          message: '', 
          loading: true
        });
        console.log(totalResults) // ex) frozen을 검색했을 때, 305 => 31번 요청해야함.
        console.log(typeof totalResults); // string

        const total = parseInt(totalResults, 10); // 10진법의 정수로 형변환
        // Math.ceil : 올림 처리
        const pageLength = Math.ceil(total / 10); // 305/10을 올림 처리 -> 31번 요청 처리.

        // 1번 이상 요청해야한다면, 추가 요청 전송
        if(pageLength > 1){
          for (let page = 2; page <= pageLength; page++) {
            // 영화 목록을 몇개 가져올지(number) 조건문을 이용해 for문 종료
            if (page > (payload.number / 10)) break;    // for문 종료

            // 추가 요청은 page가 2부터 검색
            const res = await _fetchMovie({
              // searchMovies의 payload에 이미 원하는 데이터가 있기 때문에 전개 연산자 사용
              ...payload,
              page
            });

            const { Search } = res.data;
            /*
            * movies에는 이미 영화가 들어가져 있는 상태이기 때문에 
            * 새로운 요청을 할때마다 새로운 배열을 만들어서 movies에 할당
            */
            commit('updateState', {
              // ... : 전개 연산자
              movies: [
                ...state.movies, 
                ..._uniqBy(Search, 'imdbID')] // state.movies를 먼저 전개하고, Search 데이터를 전개
            });
          }
        }
      } catch (message) {
        commit('updateState', {
          movies: [],           // 에러가 발생하면 영화 정보 초기화
          message
        })    
      } finally {       // 검색이 정상실행되던, 에러가 발생하던 로딩은 끝났으니 loading : false
          commit('updateState', {
            loading: false
          })    
      }
    },
    /*
    * searchMovieWithId : ID를 이용해 영화 상세 정보를 가져옴
    */
    async searchMovieWithId({ state, commit }, payload) {
      if(state.loading) return; // 로딩 중이면 함수를 빠져나감 (동작 중복 제거)

      commit('updateState', {  
        theMovie: {},           // 기존 영화 상세 정보 초기화
        loading: true           // 로딩 중인 상태로 만듦
      });

      try {
        const res = await _fetchMovie(payload);
        console.log(res.data);
        commit('updateState', {  
          theMovie: res.data
        });
      } catch (error) {
        commit('updateState', {  
          theMovie: {}
        });
      } finally {
        commit('updateState', {  
          loading: false           // 로딩 끝
        });
      }
    }
  } 
}

function _fetchMovie(payload) {
  const {title, type, year, page, id} = payload;
  const OMDB_API_KEY = '7035c60c';
  // id가 있으면 영화 상세 정보 요청
  // id가 없으면 영화 검색
  const url = id
              ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
              : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;

  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(res => {
        if (res.data.Error) {   // 응답받은 영화정보 데이터에 에러가 있다면 예외처리
          reject(res.data.Error);
        }
        resolve(res);           // 정상동작하면 결과값 반환
      })
      .catch(err => {
        reject(err.message);    // 에러 반환
      })
  })

}