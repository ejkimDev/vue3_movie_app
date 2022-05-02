/* 페이지를 관리해주는 구성옵션을 정리해주는 파일 */

import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'

// 기본 내보내기
export default createRouter({
  // Hash, History 모드 중 골라서 사용
  history: createWebHashHistory(),  // Hash 모드
  scrollBehavior() {
    return { top: 0 }
  },
  // routes : 각각의 페이지에 연결할 컴포넌트를 만들어서 적용해줌
  routes: [     // pages(페이지들을 구분해주는 개념)
    {
      path: '/',        // 페이지의 메인페이지로 이동하겠다는 의미
      component: Home   // 상단 지정된 path 페이지에 연결될 컴포넌트 지정
    },
    {
      path: '/movie/:id',   // movie router > path에 id 입력 가능하게 설정
      component: Movie
    },
    {
      path: '/about',
      component: About
    },
    { 
      path: '/:notFound(.*)',   // notFound 아닌 아무 파라미터 이름도 상관없다.
      component: NotFound       // NotFound 페이지로 이동
    }
  ]
})