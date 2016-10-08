<template>
  <section class="article-list-page">
    <ul style="padding: 0; margin: 0;" v-if="articleListInfo.length" transition="fadeInOut">
      <li class="article-list__item" v-for="article in articleListInfo" track-by="id">
        <article>
          <h2 class="issues-content__title">
            <a v-link="{name: 'article-content', params: { num: article.number}}">{{ article.title}}</a>
          </h2>
          <p class="issues-content__time">Create at {{ article._createdAt }} && Updated at {{ article._updatedAt }}</p>
          {{{ article._quote }}}
          <a class="article-list__read article-list__read-btn" v-link="{name: 'article-content', params: { num: article.number}}">READ</a>
          <p class="article-list__labels">
            <span>标签：</span>
            <a v-link="{name: 'label-article-list', params: {labelName: label.name}}" class="article-info__label" v-for="label in article.labels">{{ label.name }}</a>
          </p>
        </article>
      </li>
    </ul>
    <div class="article-list__more-wrap">
      <p class="article-list__more-box" v-show="articleListInfo.length && hasMoreArticle && showMoreBtn" transition="zoomInOut">
        <button class="article-list__more article-list__read-btn" type="button" @click="moreArticle">MORE</button>
      </p>
      <p class="article-list__no-more" v-show="articleListInfo.length && !hasMoreArticle" transition="zoomInOut">没有更多的文章</p>
    </div>
  </section>
</template>

<script>
  import app, {cacheArticleList, cacheLableArticeList, cachePagination, pushCacheList, addPrivateArticleAttr, addPaginationProject, updatePaginationInfo} from '../app.js'
  // cacheArticleList is read-only

  const perPage = 5

  let labelName = null
  let pageType = 'article'

  export default {
    route: {
      data (transition) {
        this.articleListInfo = []

        if (transition.to.name === 'article-list') {
          labelName = null
          pageType = 'article'
          if (cacheArticleList.length) this.articleListInfo = cacheArticleList
        } else if (transition.to.name === 'label-article-list') {
          labelName = pageType = transition.to.params.labelName
          if (cacheLableArticeList[labelName]) {
            this.articleListInfo = cacheLableArticeList[labelName]
          } else {
            addPaginationProject(labelName)
          }
        }

        cachePagination[pageType].hasMoreArticle ? this.hasMoreArticle = true : this.hasMoreArticle = false

        if (this.articleListInfo.length) return false

        this.$dispatch('update-loading-statu', true)

        this.getArticleList()
      }
    },
    props: ['labelName'],
    data () {
      return {
        articleListInfo: [],
        hasMoreArticle: true,
        showMoreBtn: true  // 用来触发 more 按钮隐藏动画
      }
    },
    methods: {
      moreArticle () {
        this.showMoreBtn = false
        this.getArticleList()
      },
      requestArticleList (request) {
        return this.$http.get(request.url, (request.options ? request.options : {}))
      },
      hasNoMoreArticle () {
        this.hasMoreArticle = false
        if (!this.showMoreBtn) this.showMoreBtn = true
        updatePaginationInfo(pageType, false)
        // this.$dispatch('update-has-more-article-statu', pageType, false)
      },
      getArticleList () {
        let request = {
          url: app.host + 'repos/' + app.owner + '/' + app.blogRepo + '/issues',
          options: {
            params: {
              filter: 'created',
              labels: labelName,
              page: cachePagination[pageType].page,
              per_page: perPage,
              access_token: app.access_token
            }
          }
        }

        // 获取文章列表
        this.requestArticleList(request).then((response) => {
          this.$dispatch('update-loading-statu', false)

          if (!response.data.length) return this.hasNoMoreArticle()

          if (labelName) {
            this.articleListInfo = pushCacheList('labelArticleList', {name: labelName, list: addPrivateArticleAttr(response.data)})[labelName]
          } else {
            this.articleListInfo = pushCacheList(app.blogRepo, addPrivateArticleAttr(response.data))
          }

          if (response.data.length < perPage) return this.hasNoMoreArticle()

          if (!this.showMoreBtn) this.showMoreBtn = true
          updatePaginationInfo(pageType, (cachePagination[pageType].page += 1))
        })
      }
    }
  }
</script>

<style scoped>
  .article-list-page {
    position: relative;
    background: #fff;
    z-index: 2;
  }
  .article-list__item {
    padding-top: 0.2rem;
    border-bottom: 1px dashed #ccc;
    font-size: 14px;
    list-style: none;
  }
  .article-list__item .article-list__labels {
    font-size: 12px;
    color: #f60;
  }
  .article-list__item .article-info__label {
    margin-right: 0.1rem;
    border-bottom: 1px solid #f60;
    color: inherit;
  }
  .article-list__item .article-info__label:hover {
    color: #ff8533;
  }
  .article-list__item .article-info__label:active {
    color: #f26100;
  }
  .article-list__item .article-list__read {
    display: inline-block;
    position: relative;
    left: 50%;
    margin-top: 0.1rem;
    border: 1px solid #0097da;
    color: #0097da;
    -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
  }
  .article-list__item .article-list__read:hover {
    color: #fff;
    background-color: #33ace1;
  }
  .article-list__item .article-list__read:active {
    background-color: #008fcf;
  }
  .article-list__more-wrap {
    position: relative;
    height: 0.75rem;
    text-align: center;
  }
  .article-list__more-box {
    position: absolute;
    width: 100%;
  }
  .article-list__more {
    border: 1px solid #f60;
    color: #f60;
    background-color: transparent;
    cursor: pointer;
  }
  .article-list__more:hover {
    color: #fff;
    background-color: #ff8533;
  }
  .article-list__more:active {
    background-color: #f26100;
  }
  .article-list__no-more {
    position: absolute;
    width: 100%;
    font-size: 12px;
    line-height: 3;
    color: #999;
  }
  .article-list__read-btn {
    padding: 0.05rem 0.1rem;
    border-radius: 3px;
    font-size: 12px;
    -webkit-transition-property: color, background-color;
            transition-property: color, background-color;
    -webkit-transition-duration: 0.3s;
            transition-duration: 0.3s;
  }
</style>
