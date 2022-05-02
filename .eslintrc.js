module.exports = {
  env: {
    // 브라우저 환경에서 동작하는 전역개념, Node.js에서 동작하는 전역개념을 코드 검사할 것인지 설정 
    browser : true,
    node : true
  },
  extends: [    // ESLint 규칙을 정해주는 곳
    /* vue
    * vue.js의 기본적인 규칙
    * - 'plugin:vue/vue3-essential',              // Lv1
    * - 'plugin:vue/vue3-strongly-recommended',   // Lv2
    * - 'plugin:vue/vue3-recommended',            // Lv3 : 가장 엄격
    */
    'plugin:vue/vue3-strongly-recommended',   // Lv2
    // js
    'eslint:recommended'    // eslint에서 권장하는 코드 규칙으로 JavaScript 문법 검사
  ],
  parserOptions: {    // 코드를 분석할 수 있는 분석기 지정
    //parser : 'babel-eslint'   // ES6 이상의 문법을 구 버전의 브라우저에서도 동작할 수 있도록 ES5로 변경
    //parser: 'vue-eslint-parser'
  },
  // extends에 기본적인 규칙을 선언하였다면 rules에 안적어도 되지만, 규칙을 변경해야하는 상황이 생긴다면 선언해도 됨.
  rules: {
    "vue/html-closing-bracket-newline": ["error", {
      "singleline": "never",
      "multiline": "never"
    }],
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "always",
        "normal": "never",
        "component": "always"
      },
      "svg": "always",
      "math": "always"
    }]
  }
}