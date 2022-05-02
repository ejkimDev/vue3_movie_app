<template>
  <div class="container">
    <input
      v-model="title"
      class="form-control"
      type="text"
      placeholder="Search for Movies, Series & more" 
      @keyup.enter="apply"/>   <!-- enter를 누르면 apply 메서드 실행 -->
    <div class="selects">
      <!-- v-model="$data[filter.name]" 
          : filter가 반복될때마다 filter.name으로 $data에서 
            type, number, year를 찾아서 동적으로 연결해줌 
          $data : script의 data() 메소드와 같다. 
          $data.type, $data.number, $data.year으로 연결할 수 있다. -->
      <select 
        v-for="filter in filters"
        v-model="$data[filter.name]"
        :key="filter.name"
        class="form-select">
        <option v-if="filter.name === 'year'" value=""> <!-- filter.name이 year일 경우에만 All Years 옵션 출력 -->
          All Years
        </option>
        <option 
        v-for="item in filter.items"
        :key="item">    <!-- value가 없으면 content를 값으로 사용한다. -->
        {{ item }}
        </option>
      </select>
    </div>
    <button 
      class="btn btn-primary" 
      @click="apply">
      Apply
    </button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      title: '',
      type: 'movie',    /* movie가 선택된 상태 */
      number: 10,       /* 10이 선택된 상태 */
      year: '',         /* 아무것도 선택하지 않은 상태 */
      // filters 베열을 이용해서 각각의 옵션을 v-for 디렉티브를 이용해서 제어
      filters: [  
        {
          name: 'type',
          items: ['movie', 'series', 'episode']
        },
        {
          name: 'number',
          items: [10, 20, 30]
        },
        {
          name: 'year',
          // (function (){})() : 첫번째 소괄호 안에 있는 함수를 즉시 실행하겠다. => 즉시 실행 함수
          // (() => {})()와 같음
          items: (() => {   // [2022, 2021, 2020...] 형식의 배열이 만들어짐
            const years = [];
            const thisYear = new Date().getFullYear();    // 현재 년도 반환
            for (let i = thisYear; i >= 1985; i--) {
              years.push(i);
            }
            return years;   // 만든 배열 반환
          })()    
        }
      ]
    }
  },
  methods: {
    async apply() {
      /*
       * Store의 Mutations를 실행할 때는 .commit() 메소드를
       * Actions를 실행할 때는 .dispatch() 메소드를 사용한다. 
       *  
      */ 
      this.$store.dispatch('movie/searchMovies', {  // store > movie 모듈의 searchMovies 실행
        // payload 객체 전달
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main";    /* 부트스트랩을 사용할 수 있게 import */

.container {
  display: flex;
  > * {  /* 자식요소 모두가 margin-right : 10px인데 마지막 자식요소만 0px */
    margin-right: 10px;
    font-size: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
  .selects {
    display: flex;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink: 0;     /* 버튼 크기가 감소하지 않게 만들어줌 */
  }
  @include media-breakpoint-down(lg) {    // 뷰포트의 크기가 large 사이즈보다 작은 경우
    display: block;                       // 요소가 수평에서 수직으로 바꿔줌
    input {
      margin-right: 0;
      margin-bottom: 10px;
    }
    .selects {
      margin-right: 0;
      margin-bottom: 10px;
      select {
        width: 100%;
      }
    }
    .btn {
      width: 100%;
    }
  }
}

</style>