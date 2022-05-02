// App.vue 파일을 main.js에서 시작

import { createApp } from 'vue'   // 객체구조분해를 통해서 바로 createApp 가져옴
import App from './App'
import router from './routes'    // router 연결을 위해 import
import store from './store'      // store 연결을 위해 import
import loadImage from './plugins/loadImage'      // plugin 연결을 위해 import

// html에서 app이라는 id를 가지고 있는 요소에 vue.js 프로젝트를 연결
// .use : 현재 프로젝트에서 특정한 플러그인을 연결할 때 사용
createApp(App)
  .use(router)    // $route, $router
  .use(store)     // $store
  .use(loadImage) // $loadImage
  .mount('#app')