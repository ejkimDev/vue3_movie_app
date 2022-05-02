<template>
  <Header />
  <!-- 페이지가 바뀔때마다 바뀌는 페이지는 RouterView에서 출력 -->
  <RouterView />  <!-- vue-router 패키지에서 제공하는 전체 영역에서 쓸 수 있는 RouterView 컴포넌트 사용 -->
  <Footer />
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
@import "~/scss/main";

</style>