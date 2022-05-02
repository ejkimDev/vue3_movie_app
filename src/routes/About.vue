<template>
  <div class="about">
    <div class="photo">
      <Loader 
        v-if="imageLoading"
        absolute
        />
      <img 
        :src="image" 
        :alt="name">
    </div>
    <div class="name">
      {{  name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ blog }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loader from '~/components/Loader'

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
    // 함수 실행 결과가 객체데이터로 반환 -> 전개연산자로 전개해서 computed라는 계산된 데이터에 등록
    // 함수 실행 결과가 반환되고 계산된 데이터처럼 객체 데이터 내부에 등록될 수  있도록 ... 전개 연산자 사용 
    ...mapState('about', [        // 인수 => store의 사용할 모듈 명시, 배열데이터 > 사용할 데이터 명시
      'image',
      'name',
      'email',
      'blog',
      'phone'
    ])
  },
  // 라이프사이클에선 비동기를 사용하면 안된다.
  // 그럴 땐, 별도의 비동기 메소드를 만들어서 라이플 사이클에서 호출하면 된다.
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await this.$loadImage(this.image);
      this.imageLoading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main";    /* 부트스트랩을 사용할 수 있게 import */

.about {
  text-align: center;
  .photo {
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 30px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    position: relative;
    img {
      width: 100%;
      border-radius: inherit;
    }
  }
  .name {
    font-size: 40px;
    font-family: "Oswald", sans-serif;
    margin-bottom: 20px;
  }
}
</style>