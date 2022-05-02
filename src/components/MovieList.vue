<template>
  <div class="container">
    <!-- 영화 목록이 없으면 no-result 출력 -->
    <div 
      :class="{ 'no-result' : !movies.length }" 
      class="inner">
      <!-- loading이 true일 때만 로딩 애니메이션 출력 -->
      <Loader v-if="loading" />
      <!-- message에 데이터가 있을때만 message 출력
      message가 없으면 영화 목록 출력 -->
      <div 
        v-if="message" 
        class="message">
        {{ message }}
      </div>
      <div v-else class="movies">
        <!-- props 활용 : movies 배열에 있는 movie 객체를 movie라는 이름으로 MovieItem이라는 컴포넌트에 전달 -->
        <MovieItem 
          v-for="movie in movies"
          :key="movie.imdbID" 
          :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script>
import MovieItem from '~/components/MovieItem'
import Loader from '~/components/Loader'
import { mapState } from 'vuex'

export default {
  components: {
    MovieItem,
    Loader
  },
  computed: {
    ...mapState('movie', [        // 인수 => store의 사용할 모듈 명시, 배열데이터 > 사용할 데이터 명시
      'movies',
      'message',
      'loading'
    ])
  }
}
</script>

<style lang="scss" scoped> 
@import "~/scss/main";    /* 부트스트랩을 사용할 수 있게 import */

.container {
  margin-top: 30px;
  .inner {
    background-color: $gray-200;
    padding: 10px 0;
    border-radius: 4px;
    text-align: center;
    &.no-result {   // no-result가 있으면
      padding: 70px 0;
    }
  }
  .message {
    color: $gray-400;
    font-size: 20px;
  }
  .movies {
    display: flex;      // 수평 정렬
    flex-wrap: wrap;    // 줄바꿈이 가능하도록 감싸도록 변경
    justify-content: center;    // 가운데 정렬
  }
}
</style>