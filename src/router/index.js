import Vue from 'vue'
import Router from 'vue-router'

import { ARTICLE, WORKLOG } from '@/shared/constants'
import { navRoutes } from '@/app/js/config'

const MainContainer = () => import('@/components/MainContainer')
// const AboutMe = () => import('@/components/AboutMe')
const ArticleList = () => import('@/components/ArticleList')
const ArticleContent = () => import('@/components/ArticleContent')
const WorklogList = () => import('@/components/WorklogList')

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
        meta: { category: ARTICLE }
      },
      {
        path: ':number',
        name: 'article-content',
        component: ArticleContent,
        meta: { category: ARTICLE }
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
        meta: { category: WORKLOG }
      },
      {
        path: ':number',
        name: 'worklog-content',
        component: ArticleContent,
        meta: { category: WORKLOG }
      }
    ]
  }
  // {
  //   path: navRoutes[ABOUT].route,
  //   component: MainContainer,
  //   children: [
  //     {
  //       path: '',
  //       name: 'about-me',
  //       component: AboutMe
  //     }
  //   ]
  // },
]

export default new Router({ routes })
