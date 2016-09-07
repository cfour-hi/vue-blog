import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App.vue'
import Card from './components/Card.vue'
import Article from './components/Article.vue'
import ArticleContent from './components/Article-Content.vue'
import Worklog from './components/Worklog.vue'
import WorklogContent from './components/Worklog-Content.vue'

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter()

router.map({
  '/': {
    name: 'card',
    component: Card
  },
  '/article': {
    name: 'article',
    component: Article
  },
  '/article/:num': {
    name: 'article-content',
    component: ArticleContent
  },
  '/worklog': {
    name: 'worklog',
    component: Worklog
  },
  '/worklog/:num': {
    name: 'worklog-content',
    component: WorklogContent
  }
})

router.start(App, '#app')
