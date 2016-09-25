<template>
  <section class="article-content-page">
    <article class="issues-content" v-show="($route.name === 'article-content' || 'worklog-content') && articleInfo.id" transition="fadeInOut">
      <h2 class="issues-content__title">{{ articleInfo.title }}</h2>
      <p class="issues-content__time" v-show="articleInfo._createdAt">Create at {{ articleInfo._createdAt }} && Update at {{ articleInfo._updatedAt }}</p>
     {{{ articleInfo._body }}}
    </article>
  </section>
</template>

<script>
  import app, {cacheArticleList, cacheLableArticeList, cacheWorklogList, addPrivateArticleAttr} from '../app.js'

  let articleNum = 0

  export default {
    ready () {
      window.scrollTo(0, 0)

      let _articleInfo = null
      articleNum = +(this.issuesNum)

      // 如果已经有缓存过文章数据则从文章数据内取出内容
      if (this.routeName === 'article-content') {
        if (cacheArticleList.length) {
          _articleInfo = this.matchArticleContent(cacheArticleList)
        }
        if (!_articleInfo && Object.keys(cacheLableArticeList).length) {
          _articleInfo = this.matchArticleContent(cacheLableArticeList)
        }
      } else if (this.routeName === 'worklog-content') {
        if (cacheWorklogList.length) _articleInfo = this.matchArticleContent(cacheWorklogList)
      }

      if (_articleInfo) return (this.articleInfo = _articleInfo)

      this.$dispatch('update-loading-statu', true)

      // 获取单个 issues 内容，标识为 api 返回内容的 number 属性。
      let repository = app.blogRepo
      if (this.routeName === 'worklog-content') repository = app.worklogRepo

      this.$http.get(app.host + 'repos/' + app.owner + '/' + repository + '/issues/' + articleNum, {
        params: {
          access_token: app.access_token
        }
      }).then((response) => {
        // 添加文章内容所需属性
        this.articleInfo = addPrivateArticleAttr(response.data)

        this.$dispatch('update-loading-statu', false)
      })
    },
    props: ['issuesNum', 'routeName'],
    data () {
      return {
        articleInfo: {}
      }
    },
    methods: {
      matchArticleContent (list) {
        let _isArray = Array.isArray(list)
        let _articleInfo = null

        if (_isArray) {
          for (let i = list.length - 1; i >= 0; i--) {
            if (list[i].number === articleNum) {
              _articleInfo = list[i]
              break
            }
          }
        } else {
          for (let key in list) {
            for (let i = list[key].length - 1; i >= 0; i--) {
              if (list[key][i].number === articleNum) {
                _articleInfo = list[key][i]
                break
              }
            }
            if (_articleInfo) break
          }
        }

        return _articleInfo
      }
    }
  }
</script>
