<template>
  <section class="article-list-page">
    <ul style="padding: 0;" v-if="$route.name === 'article' && articleListInfo.length" transition="fade">
      <li class="article-list__item" v-for="article in articleListInfo" track-by="id">
        <h2 class="article-list__title">
          <a v-link="{ name: 'article-content', params: { num: article.number }}">{{ article.title}}</a>
        </h2>
        <p class="issues-content__time">Create at {{ article._createdAt }} && Updated at {{ article._updatedAt }}</p>
        <article>{{{ article._quote }}}</article>
        <a class="article-list__read article-list__read-btn" v-link="{ name: 'article-content', params: { num: article.number }}">READ</a>
        <p class="article-list__labels">
          <span>Labels:</span>
          <a href="#" class="article-info__label" v-for="label in article.labels">{{ label._name }}</a>
        </p>
      </li>
    </ul>
    <div class="article-list__more-wrap">
      <p v-show="articleListInfo.length && hasMoreArticle && showMoreBtn" transition="fadeupdown">
        <button class="article-list__more article-list__read-btn" type="button" @click="moreArticle">MORE</button>
      </p>
      <p class="article-list__no-more" v-show="articleListInfo.length && !hasMoreArticle" transition="fadeupdown">没有更多的文章</p>
    </div>
  </section>
</template>

<script>
  import app, {cacheArticleList, pushCacheList, addPrivateArticleAttr} from '../app.js'
  // cacheArticleList is read-only

  const prePage = 5

  export default {
    ready () {
      if (cacheArticleList.length) {
        this.$dispatch('update-loading', false)
        return (this.articleListInfo = cacheArticleList)
      }

      this.$dispatch('update-loading', true)

      this.getArticleList()
    },
    props: ['loading', 'nextPage', 'hasMoreArticle'],
    data () {
      return {
        articleListInfo: [],
        showMoreBtn: true    // 用来触发 more 按钮隐藏动画
      }
    },
    methods: {
      moreArticle () {
        this.showMoreBtn = false
        this.getArticleList()
      },
      getArticleList () {
        this.$http.get(app.host + 'repos/' + app.owner + '/' + app.studyRepo + '/issues', {
          params: {
            filter: 'created',
            page: this.nextPage,
            per_page: prePage,
            access_token: app.access_token
          }
        }).then((response) => {
          if (this.loading) this.$dispatch('update-loading', false)

          if (!response.data.length) return this.$dispatch('update-has-more-article', false)

          // 添加文章内容所需属性
          // 添加文章列表缓存数据
          pushCacheList(app.studyRepo, addPrivateArticleAttr(response.data))
          this.articleListInfo = cacheArticleList

          if (response.data.length < prePage) this.$dispatch('update-has-more-article', false)

          if (!this.showMoreBtn) this.showMoreBtn = true

          this.$dispatch('update-next-page')
        })
      }
    }
  }
</script>

<style scoped>
  .article-list__item {
    padding-top: 0.2rem;
    border-bottom: 1px dashed #ccc;
    font-size: 14px;
    list-style: none;
  }
  .article-list__item .article-list__title {
    margin-top: 0;
    margin-bottom: 0.05rem;
  }
  .article-list__item .article-list__title a:hover {
    border-bottom: 2px solid #333;
  }
  .article-list__item .article-list__labels {
    font-size: 12px;
    color: #f60;
  }
  .article-list__item .article-info__label {
    margin-left: 0.1rem;
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
    height: 0.5rem;
    text-align: center;
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
    font-size: 12px;
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
