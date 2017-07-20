import Vue from 'vue'
import Vuex from 'vuex'

if (process.env.NODE_ENV === 'development') {
  Vue.use(Vuex)
}

export default new Vuex.Store({
  state: {
    inMobile: /mobile/i.test(window.navigator.userAgent),
    progress: 'wait',
    back2TopVisible: false,
    articles: {},
    comments: {}
  },
  mutations: {
    setProgress (state, { step }) {
      state.progress = step
    },
    concatArticleList (state, { category, list }) {
      if (!state.articles[category]) state.articles[category] = []
      state.articles[category] = state.articles[category].concat(list)
    },
    addCommentList (state, { category, number, list }) {
      if (!state.comments[category]) state.comments[category] = {}
      state.comments[category][number] = list
    },
    toggleBack2TopVisible (state, { visible }) {
      state.back2TopVisible = visible
    }
  }
})
