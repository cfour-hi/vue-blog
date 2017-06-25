// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import './app/js/marked-config'

if (store.state.inMobile) document.documentElement.classList.add('in-mobile')

Vue.config.productionTip = false

axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  if (store.state.progress === 'loading') store.commit('setProgress', { step: 'success' })
  return response.data
}, error => {
  if (store.state.progress === 'loading') store.commit('setProgress', { step: 'error' })
  return Promise.reject(error)
})

router.beforeEach((to, from, next) => {
  // 当加载文章列表时如果切换到其它路由
  // 会导致内容加载不出来（数据保存到 store 出错）
  if (store.state.progress === 'loading') return next(false)
  next()
})

if (!store.state.inMobile) {
  let scrollTimeout = 0
  document.addEventListener('scroll', () => {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        store.commit('toggleBack2TopVisible', { visible: !!document.scrollingElement.scrollTop })
        scrollTimeout = clearTimeout(scrollTimeout)
      }, 300)
    }
  }, false)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
