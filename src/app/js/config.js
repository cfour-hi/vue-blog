import { ARTICLE, WORKLOG, ABOUT, BLOG_REPO, WORKLOG_REPO } from '@/shared/constants'
import { converArticleInfo, converWorklogInfo } from '@/app/js/app'

export const articleCategoryList = [
  { label: ARTICLE, repo: BLOG_REPO, converFunc: converArticleInfo },
  { label: WORKLOG, repo: WORKLOG_REPO, converFunc: converWorklogInfo }
]

export const navRoutes = {
  [ARTICLE]: { label: ARTICLE.toUpperCase(), route: '/' + ARTICLE, iconClass: 'fa-chrome' },
  [WORKLOG]: { label: WORKLOG.toUpperCase(), route: '/' + WORKLOG, iconClass: 'fa-internet-explorer' },
  [ABOUT]: { label: ABOUT.toUpperCase(), route: '/' + ABOUT, iconClass: 'fa-firefox', exact: true }
}

export const sidebar = {
  lineHeight: 2.5
}

export const keepAliveComps = [
  'about-me',
  'article-list',
  'worklog-list'
]
