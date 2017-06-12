import Vue from 'vue'
import Router from 'vue-router'
import MainContainer from '@/components/MainContainer'
import AboutMe from '@/components/AboutMe'
import ArticleList from '@/components/ArticleList'
import ArticleContent from '@/components/ArticleContent'
import WorklogList from '@/components/WorklogList'
import { ARTICLE, WORKLOG } from '@/shared/constants'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/article'
    },
    {
      path: '/article',
      component: MainContainer,
      children: [
        {
          path: '',
          name: 'article-list',
          component: ArticleList,
          meta: {
            category: ARTICLE
          }
        },
        {
          path: ':number',
          name: 'article-content',
          component: ArticleContent,
          meta: {
            category: ARTICLE
          }
        }
      ]
    },
    {
      path: '/worklog',
      component: MainContainer,
      children: [
        {
          path: '',
          name: 'worklog-timeline',
          component: WorklogList,
          meta: {
            category: WORKLOG
          }
        },
        {
          path: ':number',
          name: 'worklog-content',
          component: ArticleContent,
          meta: {
            category: WORKLOG
          }
        }
      ]
    },
    {
      path: '/about',
      component: MainContainer,
      children: [
        {
          path: '',
          name: 'about-me',
          component: AboutMe
        }
      ]
    }
  ]
})
