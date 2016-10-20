<template>
  <section class="article-list-page">
    <ul style="padding: 0; margin: 0;" v-if="articleListInfo && articleListInfo.list.length" transition="fadeInOut">
      <li class="article-list__item" v-for="article in articleListInfo.list" track-by="id">
        <article>
          <h2 class="issues-content__title">
            <a v-link="{name: 'article-content', params: { num: article.number}}">{{ article.title}}</a>
          </h2>
          <p class="issues-content__time">CREATED AT {{ article.createdAt }} _ UPDATED AT {{ article.updatedAt }}</p>
          {{{ article.quote }}}
          <a class="article-list__read transition-color-btn" v-link="{name: 'article-content', params: { num: article.number}}">READ</a>
          <p class="article-list__labels">
            <span>标签：</span>
            <a v-link="{name: 'label-article-list', params: {labelName: label.name}}" class="article-info__label" v-for="label in article.labels">{{ label.name }}</a>
          </p>
        </article>
      </li>
    </ul>
    <div class="article-list__more-wrap">
      <p class="article-list__more-box" v-show="articleListInfo && articleListInfo.list.length && articleListInfo.hasMore && showMoreBtn" transition="zoomInOut">
        <button class="article-list__more transition-color-btn" type="button" @click="getMoreArticle">MORE</button>
      </p>
      <p class="article-list__no-more center-prompt-message" v-show="articleListInfo && articleListInfo.list.length && !articleListInfo.hasMore" transition="zoomInOut">没有更多的文章</p>
    </div>
  </section>
</template>

<script>
  import app, {cache, setNecessaryAttribute} from '../app.js'
  // cache is read-only

  const perPage = 5       // 每页文章数量
  let _cache = cache      // 缓存
  let issuesLabel = null  // issues 标签

  export default {
    route: {
      data (transition) {
        // issues 标签
        transition.to.name === 'article-list' ? issuesLabel = 'all' : issuesLabel = transition.to.params.labelName

        // 从缓存内获取文章信息
        if (_cache.issues.blog[issuesLabel]) {
          this.articleListInfo = _cache.issues.blog[issuesLabel]
          return
        }

        // 初始化文章信息
        this.articleListInfo = _cache.issues.blog[issuesLabel] = {
          list: [],
          page: 1,
          hasMore: true
        }

        // 显示加载器、获取 blog 文章
        this.$dispatch('set-loader-state', true)
        this.getBlogIssues()
      }
    },
    data () {
      return {
        articleListInfo: null,
        showMoreBtn: true
      }
    },
    methods: {
      getMoreArticle () {
        this.showMoreBtn = false
        this.getBlogIssues()
      },
      getBlogIssues () {
        // 获取文章列表
        this.$http.get(app.host + 'repos/' + app.owner + '/' + app.blogRepos + '/issues', {
          params: {
            filter: 'created',
            labels: issuesLabel === 'all' ? null : issuesLabel,
            page: this.articleListInfo.page,
            per_page: perPage,
            access_token: app.access_token
          }
        }).then((response) => {
          // 更新视图状态
          this.$dispatch('set-loader-state', false)
          if (!this.showMoreBtn) this.showMoreBtn = true

          // 更新数据、设置文章所需内容
          if (!response.data.length) return (this.articleListInfo.hasMore = false)

          this.articleListInfo.list = this.articleListInfo.list.concat(setNecessaryAttribute(response.data, 'issues'))
          this.articleListInfo.page += 1

          if (response.data.length < perPage) this.articleListInfo.hasMore = false
        })
      }
    }
  }
</script>

<style scoped>
  .issues-content__title a {
    display: inline-block;
    padding-bottom: 0.15rem;
    color: #333;
  }
  .issues-content__title a:hover {
    border-bottom: none;
    background: url(../assets/go.png) no-repeat center 0.35rem;
    background-size: 32px;
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
    padding: 0.2em 0.7em;
    margin-right: 0.1rem;
    border: 1px dotted currentColor;
    border-radius: 3px;
    color: inherit;
  }
  .article-list__item .article-info__label:hover {
    border: 1px solid currentColor;
    color: #ff8533;
  }
  .article-list__item .article-info__label:active {
    color: #f26100;
  }
  .article-list__item .article-list__read {
    display: inline-block;
    position: relative;
    left: 50%;
    margin-top: 0.3rem;
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
    line-height: 3;
  }
</style>
