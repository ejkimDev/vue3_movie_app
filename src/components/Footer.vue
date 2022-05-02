<template>
  <footer>
    <Logo />
    <a
      href="https://github.com/ejkimDev"
      target="_blank">    <!-- 새 탭 -->
      (c){{ new Date().getFullYear() }} {{ name }}
    </a>
  </footer>
</template>

<script>
import Logo from '~/components/Logo'

export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss" scoped>
footer {
  padding: 70px 0;      // 위,아래 70px / 좌우에는 내부여백 X
  text-align: center;
  opacity: .3;          // 30% 불투명도
  .logo {
    display: block;
    margin-bottom: 4px;
  }
}
</style>