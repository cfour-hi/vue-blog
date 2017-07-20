import Vue from 'vue'
import Router from 'vue-router'

import { ARTICLE, WORKLOG, ABOUT } from '@/shared/constants'
import { navRoutes } from '@/app/js/config'

const MainContainer = r => { require.ensure(['@/components/MainContainer'], () => { r(require('@/components/MainContainer')) }) }
const AboutMe = r => { require.ensure(['@/components/AboutMe'], () => { r(require('@/components/AboutMe')) }) }
const ArticleList = r => { require.ensure(['@/components/ArticleList'], () => { r(require('@/components/ArticleList')) }) }
const ArticleContent = r => { require.ensure(['@/components/ArticleContent'], () => { r(require('@/components/ArticleContent')) }) }
const WorklogList = r => { require.ensure(['@/components/WorklogList'], () => { r(require('@/components/WorklogList')) }) }

if (process.env.NODE_ENV === 'development') {
  Vue.use(Router)
}

export const routes = [
  {
    path: '/',
    redirect: navRoutes[ARTICLE].route
  },
  {
    path: navRoutes[ARTICLE].route,
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
    path: navRoutes[WORKLOG].route,
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
    path: navRoutes[ABOUT].route,
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

export default new Router({ routes })
