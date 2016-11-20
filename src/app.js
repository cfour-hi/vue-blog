import marked from 'Marked'
import hljs from 'highlight.js'

// 代码高亮
marked.setOptions({
  highlight: (code) => {
    return hljs.highlightAuto(code).value
  }
})

// 配置
const config = {
  owner: 'monine',
  blogRepos: 'monine.github.io',
  worklogRepos: 'worklog',
  host: 'https://api.github.com/',
  access_token: '45b2a12600ba7b61987f' + '9c2600ad46a0822b88cc'
}

// 缓存
let cache = {
  issues: {
    blog: {},
    worklog: {}
  },
  comments: {},
  labels: []
}

// 获取 issues 信息
let getIssuesInfo = (issue) => {
  let _body = marked(issue.body)
  return {
    id: issue.id,
    number: issue.number,
    html_url: issue.html_url,
    comments_url: issue.comments_url,
    title: issue.title,
    createdAt: issue.created_at.split('T')[0],
    updatedAt: issue.updated_at.split('T')[0],
    quote: _body.split('<!-- more -->')[0].trim(),
    body: _body,
    labels: issue.labels
  }
}

// 获取评论信息
let getCommentsInfo = (comment) => {
  return {
    html_url: comment.html_url,
    createdAt: comment.created_at.slice(0, -1).split('T').join(' '),
    body: marked(comment.body),
    user: {
      avatar_url: comment.user.avatar_url,
      login: comment.user.login
    }
  }
}

// 设置所需要用到的属性内容
// 列表页面参数为 Array
// 内容页面参数为 Object
let setNecessaryAttribute = (info, mark) => {
  let necessaryInfo = []
  let _isArray = true

  if (!Array.isArray(info)) {
    _isArray = false
    info = [info]
  }

  // 把 github issues 返回的数据内容解析转换为 blog 所需内容
  necessaryInfo = info.map(function (elem, index, arr) {
    let _info = null
    if (mark === 'issues') {
      _info = getIssuesInfo(elem)
    } else if (mark === 'comments') {
      _info = getCommentsInfo(elem)
    }
    return _info
  })
  return _isArray ? necessaryInfo : necessaryInfo[0]
}

// 设置标签名称
let setLabels = (labels) => {
  labels.forEach((elem) => {
    cache.labels.push(elem.name)
  })
}

// 默认输出配置信息
export default config

export {cache, setNecessaryAttribute, setLabels}
