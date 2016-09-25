import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App.vue'
import Card from './components/Card.vue'
import Article from './components/Article.vue'
import ArticleList from './components/Article-List.vue'
import ArticleContent from './components/Article-Content.vue'
import Worklog from './components/Worklog.vue'
import WorklogList from './components/Worklog-List.vue'

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
    component: Article,
    subRoutes: {
      '/': {
        name: 'article-list',
        component: ArticleList
      },
      '/:num': {
        name: 'article-content',
        component: ArticleContent
      },
      '/label/:labelName': {
        name: 'label-article-list',
        component: ArticleList
      }
    }
  },
  '/worklog': {
    name: 'worklog',
    component: Worklog,
    subRoutes: {
      '/': {
        name: 'worklog-list',
        component: WorklogList
      },
      '/:num': {
        name: 'worklog-content',
        component: ArticleContent
      }
    }
  }
})

router.start(App, '#app')
