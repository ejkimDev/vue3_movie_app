<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div 
        v-for="nav in navigations" 
        :key="nav.name"
        class="nav-item">
        <!-- RouterLink 
            - vue-router에서는 페이지 이동할 수 있는 a 태그 대신에 RouterLink라는 컴포넌트를 제공
            - a 태그의 href와 같은 기능으로 to라는 속성을 제공
            - RouterLink는 현재 페이지에 어떤 navigation이 활성화되었는지 확인할 수 있음 
            => active-class을 이용해 RouterLink에 active를 추가 
            - nav.path가 일치하면 active 클래스 추가 -->
        <RouterLink 
          :to="nav.href" 
          :class="{ active: isMatch(nav.path) }"
          active-class="active"
          class="nav-link">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
    <div 
      class="user"
      @click="toAbout">
      <img 
        :src="image" 
        :alt="name"
         style="border-radius:50%;" >
    </div>
  </header>
</template>

<script>
import Logo from '~/components/Logo'
import { mapState } from 'vuex'

export default {
  components: {
    Logo
  },
  data() {
    return {
      navigations: [
        {
          name: 'Search',
          href: '/'
        },
        {
          name: 'Movie',
          href: '/movie/tt4520988',   // tt4520988 : 겨울왕국2 영화 ID
          path: /^\/movie/            // /movie로 시작하는 경로인 경우, 일치(정규표현식 사용)
        },
        {
          name: 'About',
          href: '/about'
        }
      ]
    }
  },
  methods: {
    isMatch(path) {
      if(!path) return false;   // path가 없으면 매치 안할거다!(false)
      return path.test(this.$route.fullPath);   // 실제 url 주소가 정규표현식과 일치하는지 확인
    },
    toAbout() {
      this.$router.push('/about');    // router 컴포넌트를 사용해서 about 페이지로 이동
    }
  },
  computed: {
    ...mapState('about', [        // 인수 => store의 사용할 모듈 명시, 배열데이터 > 사용할 데이터 명시
      'image',
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main";    /* 부트스트랩을 사용할 수 있게 import */

header { 
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: relative;
  .logo {
    margin-right: 40px;
  }
  .user {
    width: 40px;
    height: 40px;
    padding: 6px;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    margin: auto;
    transition: .4s;
    &:hover {
      background-color: darken($gray-200, 10%);
    }
    img {
      width: 100%;
    }
  }
  @include media-breakpoint-down(sm) {    // 뷰포트의 크기가 small 사이즈보다 작은 경우 navigation 숨김 처리
    .nav {
      display: none;
    }
  }
}
</style>