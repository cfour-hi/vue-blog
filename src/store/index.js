import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    progress: 0,
    articles: {},
    comments: {}
  },
  mutations: {
    modifyProgress (state, payload) {
      state.progress = payload.progress
    },
    concatArticleList (state, payload) {
      if (!state.articles[payload.category]) state.articles[payload.category] = []
      state.articles[payload.category] = state.articles[payload.category].concat(payload.list)
    },
    addCommentList (state, payload) {
      if (!state.comments[payload.category]) state.comments[payload.category] = {}
      state.comments[payload.category][payload.number] = payload.list
    }
  }
})
