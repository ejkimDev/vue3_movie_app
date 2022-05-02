<template>
  <!-- 배경으로 영화 포스터를 출력, 내부에 영화 정보 출력 -->
  <RouterLink
    :to="`/movie/${movie.imdbID}`"
    :style="{ backgroundImage: `url(${movie.Poster})` }"
    class="movie">
    <!-- imageLoading이 true일 때, Loader 출력
    / size = 1.5 : size는 1.5rem 
    / absolute = true : 부모 요소(div)의 가운데에 배치 -->   
    <Loader
      v-if="imageLoading"
      :size="1.5"
      absolute />
    <div class="info">
      <div class="year">
        {{ movie.Year }}
      </div>
      <div class="title">
        {{ movie.Title }}
      </div>
    </div>
  </RouterLink>
</template>

<script>
import Loader from '~/components/Loader'

export default {
  components: {
    Loader
  },
  props: {
    movie: {
      type: Object,
      // 객체 or 배열 데이터를 직접 사용하지 않고 함수로 반환
      // default: function() { return {} }
      default: () => ({})
    }
  },
  data() {
    return {
      imageLoading: true
    }
  },
  mounted() {       // MovieItem 컴포넌트가 연결이 된 직후에 
    this.init();    // init 메소드 실행
  },
  methods: {
    async init() {
      const poster = this.movie.Poster;
      
      if (!poster || poster === 'N/A') {          // Poster가 없거나 값이 N/A이면 false 처리
        this.imageLoading = false;                // false 처리
      } else {
        await this.$loadImage(poster);            // 이미지 로딩이 완료되면
        this.imageLoading = false;                // false 처리
      }
    }
  }
}
</script>

<style lang="scss" scoped> 
@import "~/scss/main";    /* 부트스트랩을 사용할 수 있게 import */

  .movie {
    $width: 200px;      // width 변수 선언
    width: $width;
    height: $width * 3 / 2;
    margin: 10px;
    border-radius: 4px;
    background-color: $gray-400;
    background-size: cover;     // 배경 이미지를 더 넓게 출력
    overflow: hidden;           // 이미지가 넘치면 숨김
    position: relative;
    &:hover::after {            // 요소에 마우스를 올렸을 때
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border: 6px solid $primary;
    }
    .info {
      background-color: rgba($black, .3);     // 부트스트랩에서 제공하는 black을 30퍼센트의 투명도로 출력
      width: 100%;
      padding: 14px;
      font-size: 14px;
      text-align: center;
      position: absolute;       // 부모 요소 기준으로 배치
      left: 0;
      bottom: 0;
      backdrop-filter: blur(10px);
      .year {
        color: $primary;
      }
      .title {
        color: $white;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>   