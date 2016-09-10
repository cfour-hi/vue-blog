<template>
  <section class="article-content-page">
    <article class="issues-content" v-if="$route.name === 'article-content' && articleInfo.id" transition="fade">
      <header>
        <h2 class="issues-content__title">{{ articleInfo.title }}</h2>
      </header>
      <p class="issues-content__time" v-show="articleInfo._createdAt" style="text-align: center;">Create at {{ articleInfo._createdAt }} && Update at {{ articleInfo._updatedAt }}</p>
      <section class="issues-content__body">{{{ articleInfo._body }}}</section>
    </article>
  </section>
</template>

<script>
  import app, {cacheArticleList, addPrivateArticleAttr} from '../app.js'

  export default {
    ready () {
      window.scrollTo(0, 0)

      let articleNum = +(this.issuesNum)

      // 如果已经有缓存过文章数据则从文章数据内取出内容
      if (cacheArticleList.length) {
        for (let i = cacheArticleList.length - 1; i >= 0; i--) {
          if (cacheArticleList[i].number === articleNum) {
            return (this.articleInfo = cacheArticleList[i])
          }
        }
      }

      this.$dispatch('update-loading', true)

      // 获取单个 issues 内容，标识为 api 返回内容的 number 属性。
      this.$http.get(app.host + 'repos/' + app.owner + '/' + app.studyRepo + '/issues/' + articleNum, {
        params: {
          access_token: app.access_token
        }
      }).then((response) => {
        // 添加文章内容所需属性
        this.articleInfo = addPrivateArticleAttr(response.data)

        this.$dispatch('update-loading', false)
      })
    },
    props: ['issuesNum'],
    data () {
      return {
        articleInfo: {}
      }
    }
  }
</script>
