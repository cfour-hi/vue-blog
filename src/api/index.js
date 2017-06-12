import axios from 'axios'

const ORIGIN = 'https://api.github.com'
const OWNER = 'monine'
const BLOG_REPO = 'monine.github.io'
const WORKLOG_REPO = 'worklog'
const ACCESS_TOKEN = 'b2f811c8b61b55743e97' + '4643f20d98956812c71b'

export function getArticleList ({ page = 1, size = 5 }) {
  const params = {
    filter: 'created',
    page: page,
    per_page: size,
    access_token: ACCESS_TOKEN
  }
  return axios.get(ORIGIN + '/repos/' + OWNER + '/' + BLOG_REPO + '/issues', { params })
}

export function getWorklogList ({ page = 1, size = 24 }) {
  const params = {
    filter: 'created',
    page: page,
    per_page: size,
    access_token: ACCESS_TOKEN
  }
  return axios.get(ORIGIN + '/repos/' + OWNER + '/' + WORKLOG_REPO + '/issues', { params })
}

export function getArticleInfo (category, num = 1) {
  let repo = null
  if (category === 'article') {
    repo = BLOG_REPO
  } else if (category === 'worklog') {
    repo = WORKLOG_REPO
  }

  const params = {
    access_token: ACCESS_TOKEN
  }
  return axios.get(ORIGIN + '/repos/' + OWNER + '/' + repo + '/issues/' + num, { params })
}

export function getCommentList (url, page = 1) {
  const params = {
    page,
    per_page: 30,
    access_token: ACCESS_TOKEN
  }
  return axios.get(url, { params })
}
