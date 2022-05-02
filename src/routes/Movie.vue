<template>
  <div class="container">
    <template v-if="loading"> <!-- 로딩중이면 skeleton 출력 -->
      <div class="skeletons">
        <div class="skeleton poster"></div>
          <div class="specs">
            <div class="skeleton title"></div>
            <div class="skeleton spec"></div>
            <div class="skeleton plot"></div>
            <div class="skeleton etc"></div>
            <div class="skeleton etc"></div>
            <div class="skeleton etc"></div>
          </div>
      </div>
      <Loader  
      :size="3"
      :zIndex="9"
      fixed />   <!-- 정중앙에 로딩애니메이션 동작 -->
    </template>
    <div
      v-else
      class="movie-details">    <!-- 로딩중이지 않으면 상세정보 출력 -->
      <div
        :style="{ backgroundImage: `url(${requestDiffSizeImage(theMovie.Poster)})` }" 
        class="poster">
        <Loader  
          v-if="imageLoading"
          absolute />
        </div>
      <div class="specs">
        <div class="title">
          {{ theMovie.Title }}
        </div>
        <div class="labels">
          <span>{{ theMovie.Released }}</span>
          <span>{{ theMovie.Runtime }}</span>
          <span>{{ theMovie.Country }}</span>
        </div>
        <div class="plot">
          {{ theMovie.Plot }}
        </div>
        <div class="ratings">
          <h3>Ratings</h3>
          <div class="rating-wrap">
            <!-- {Source, Value} : theMovie.Ratings의 객체 데이터를 구조 분해 
            { Source: name, Value:point } : Source를 name, Value를 point로 활용하겠다고 지정
            -->
            <div
              v-for="{ Source: name, Value: point } in theMovie.Ratings"
              :key="name" 
              :title="name"
              class="rating">
              <img 
                :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png`" 
                :alt="name" />
              <span>{{ point }}</span>
            </div>
          </div>
        </div>
        <div>
          <h3>Actors</h3>
          {{ theMovie.Actors }}
        </div>
        <div>
          <h3>Director</h3>
          {{ theMovie.Director }}
        </div>
        <div>
          <h3>Production</h3>
          {{ theMovie.Production }}
        </div>
        <div>
          <h3>Genre</h3>
          {{ theMovie.Genre }}
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Loader from '~/components/Loader'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Loader
  },
  data() {
    return {
      imageLoading: true
    }
  },
  computed: {
    ...mapState('movie', [        // 인수 => store의 사용할 모듈 명시, 배열데이터 > 사용할 데이터 명시
      'theMovie',
      'loading'
    ])
  },
  created() {      // Movie 컴포넌트가 실행되면
    console.log(this.$route);     // 현재 페이지 주소 정보를 가져옴
    //this.$store.dispatch('movie/searchMovieWithId', {
    this.searchMovieWithId({
      // ex) movie/tt1234545
      id: this.$route.params.id   // 주소 부분의 파라미터에서 omdbID를 가져옴
    });
  },
  methods: {
    ...mapActions('movie', [  
      'searchMovieWithId'
    ]),
    requestDiffSizeImage(url, size = 700) {       // size 기본값 : 700
      if (!url || url === 'N/A') {                // url 없거나 값이 N/A이면 false 처리
        this.imageLoading = false;                // false 처리
        return '';                                // 빈 문자열 반환
      } 
      const src = url.replace('SX300',`SX${size}`);   // 이미지 사이즈를 바꿔서 전송
      this.$loadImage(src)
        .then(() => {
          this.imageLoading = false;
        });
      return src;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main";    /* 부트스트랩을 사용할 수 있게 import */

.container {
  padding-top: 40px;
}
.skeletons {
  display: flex;
  .poster {
    flex-shrink: 0;     // 감소 너비를 사용하지 않겠다.
    width: 500px;
    height: 500px * 3 / 2;
    margin-right: 70px;
    position: relative;
  }
  .specs {
    flex-grow: 1;       // 증가 너비를 최대한 많이 사용하겠다.
  }
  .skeleton {
    border-radius: 10px;
    background-color: $gray-200;
    &.title {
      width: 80%;
      height: 70px;
    }
    &.spec {
      width: 60%;
      height: 30px;
      margin-top: 20px;
    }
    &.plot {
      width: 100%;
      height: 250px;
      margin-top: 20px;
    }
    &.etc {
      width: 50%;
      height: 50px;
      margin-top: 20px;
    }
  }
}

.movie-details {
  display: flex;
  color: $gray-600;
  .poster {
    width: 500px;
    height: 500px * 3/2;
    margin-right: 70px;
    border-radius: 10px;
    background-color: $gray-200;
    background-size: cover;
    background-position: center;
    position: relative;
    flex-shrink: 0;
  }
  .specs {
    flex-grow: 1;
    .title {
      color: $black;
      font-family: "Oswald", sans-serif;
      font-size: 70px;
      line-height: 1;
      margin-bottom: 30px;
    }
    .labels {
      color: $primary;
      span {
        &::after {    // 가상요소 생성
          content: "\00b7";   // 가운데점
          margin: 0 6px;
        }
        &:last-child::after {
          display: none;
        }
      }
    }
    .plot {
      margin-top: 20px;
    }
    .ratings {
      .rating-wrap {
        display: flex;
        .rating {
          display: flex;
          align-items: center;  
          margin-right: 32px;
          img {
            height: 30px;
            flex-shrink: 0;       /*  flex item의 감소너비를 적용하지 않게 적용 */
            margin-right: 6px;
          }
        }
      }
    }
    h3 {
      margin: 24px 0 6px;
      color: $black;
      font-family: "Oswald", sans-serif;
      font-size: 20px;
    }
  }
  @include media-breakpoint-down(xl) {
    .poster {
      width: 300px;
      height: 300px * 3/2;
      margin-right: 40px;
    }
  }
  @include media-breakpoint-down(lg) {
    display: block;
    .poster {
      margin-bottom: 40px;
    }
  }
  @include media-breakpoint-down(md) {
    .specs {
      .title {
        font-size: 50px;
      }
      .ratings {
        .rating-wrap {
          display: block;
          .rating {
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>