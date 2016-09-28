import marked from 'Marked'
import hljs from 'highlight.js'

marked.setOptions({
  highlight: (code) => {
    return hljs.highlightAuto(code).value
  }
})

const _config = {
  owner: 'monine',
  blogRepo: 'monine.github.io',
  worklogRepo: 'worklog',
  host: 'https://api.github.com/',
  access_token: '45b2a12600ba7b61987f' + '9c2600ad46a0822b88cc'
}

// 文章列表缓存
// 可以看作是一个全局变量
// 每次获取到文章列表数据之后都会使用 pushCacheArticleList 方法添加新内容
let cacheArticleList = []

// 标签文章列表缓存
let cacheLableArticeList = {}

// 工作日志缓存
let cacheWorklogList = []

// 文章列表分页信息缓存
let cachePagination = {
  article: {
    page: 1,
    hasMoreArticle: true
  }
}

let pushCacheList = (cacheName, cache) => {
  let _cache = null

  if (cacheName === _config.blogRepo) {
    // 添加文章列表缓存
    // 往 cacheArticleList 内添加当前获取到的文章列表数据
    _cache = cacheArticleList = cacheArticleList.concat(cache)
  } else if (cacheName === _config.worklogRepo) {
    debugger
    if (cacheWorklogList.length) {
      for (let i = cache.length - 1; i >= 0; i--) {
        if (cache[0].id === cacheWorklogList[i].id) return
      }
    }

    // 添加工作日志列表缓存
    // 往 cacheWorklogList 内添加当前获取到的工作日志数据
    _cache = cacheWorklogList = cacheWorklogList.concat(cache)
  } else if (cacheName === 'labelArticleList') {
    // 添加标签文章列表缓存
    // 往 cacheLableArticeList 内添加当前获取到的文章列表数据
    if (cacheLableArticeList[cache.name]) {
      cacheLableArticeList[cache.name] = cacheLableArticeList[cache.name].concat(cache.list)
    } else {
      cacheLableArticeList[cache.name] = [].concat(cache.list)
    }
    _cache = cacheLableArticeList
  }

  return _cache
}

// 添加文章内容所需属性
// 参数 articleInfo 可以是 Array 或者 Object，传入什么类型则返回什么类型。
let addPrivateArticleAttr = (articleInfo) => {
  let _articleInfo = []
  let _isArray = null

  Array.isArray(articleInfo) ? _isArray = true : _isArray = false

  _isArray ? (_articleInfo = _articleInfo.concat(articleInfo)) : _articleInfo.push(articleInfo)

  // 把 github issues 返回的数据内容解析转换为 blog 显示需显示的内容
  // 解析转换后的内容的 key 以 _ 开头作为私有标识区分 github issues 所返回的内容
  for (let i = _articleInfo.length - 1; i >= 0; i--) {
    _articleInfo[i]._createdAt = _articleInfo[i].created_at.split('T')[0]
    _articleInfo[i]._updatedAt = _articleInfo[i].updated_at.split('T')[0]
    _articleInfo[i]._body = marked(_articleInfo[i].body)
    _articleInfo[i]._quote = _articleInfo[i]._body.split('<!-- more -->')[0].trim()
  }

  return _isArray ? _articleInfo : _articleInfo[0]
}

let addPaginationProject = (name, cache) => {
  return (cachePagination[name] = {
    page: 1,
    hasMoreArticle: true
  })
}

let updatePaginationInfo = (name, val) => {
  let key = (typeof val === 'boolean' ? 'hasMoreArticle' : 'page')

  cachePagination[name][key] = val
}

// 默认输出配置信息
export default _config

export {cacheArticleList, cacheWorklogList, cacheLableArticeList, cachePagination, pushCacheList, addPrivateArticleAttr, addPaginationProject, updatePaginationInfo}
