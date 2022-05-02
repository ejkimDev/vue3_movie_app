<template>
  <RouterLink 
    to="/" 
    class="logo">
    <span>OMDbAPI</span>.COM
  </RouterLink>
</template>

<style lang="scss" scoped>
@import "~/scss/main";    /* 부트스트랩을 사용할 수 있게 import */

.logo {
  font-family: "Oswald", sans-serif;   /* 폰트 이름은 ""로 묶어서 사용하는 것을 권장 */
  font-size: 20px;
  color: $black;          /* 부트스트랩을에 정의된 색상변수를 사용함 */
  text-decoration: none;
  &:hover {
    color: $black;
  }
  span {
    color: $primary;
  }
}
</style>