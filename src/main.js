// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'

Vue.config.productionTip = false

axios.interceptors.request.use(function (config) {
  if (!store.state.progress) store.commit('modifyProgress', { progress: 70 })
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  if (store.state.progress) store.commit('modifyProgress', { progress: 100 })
  return response.data
}, function (error) {
  return Promise.reject(error)
})

// 代码高亮
marked.setOptions({
  highlight (code) {
    return hljs.highlightAuto(code).value
  },
  breaks: true
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
