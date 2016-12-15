<template>
  <section class="article-list-page">
    <ul style="padding: 0; margin: 0;" v-if="articleListInfo.list.length" transition="fadeInOut">
      <li class="article-list__item dashed dashed-thin dashed-bottom" v-for="article in articleListInfo.list" track-by="id">
        <article>
          <div class="article-labels">
            <a v-link="{name: 'label-article-list', params: {labelName: label.name}}" class="article-label label-{{ label.color }}" v-for="label in article.labels">{{ label.name }}</a>
          </div>
          <h2 class="issues-content__title">
            <a v-link="{name: 'article-content', params: { num: article.number}}">{{ article.title}}</a>
          </h2>
          <p class="issues-content__time">CREATED AT {{ article.createdAt }} _ UPDATED AT {{ article.updatedAt }}</p>
          {{{ article.quote }}}
          <a class="article-list__read transition-color-btn" v-link="{name: 'article-content', params: { num: article.number}}">READ</a>
        </article>
      </li>
    </ul>
    <div class="article-list__more-wrap">
      <p class="article-list__more-box" v-show="articleListInfo.list.length && articleListInfo.hasMore && showMoreBtn" transition="zoomInOut">
        <button class="article-list__more transition-color-btn" type="button" @click="getMoreArticle">MORE</button>
      </p>
      <p class="article-list__no-more center-prompt-message" v-show="articleListInfo.list.length && !articleListInfo.hasMore" transition="zoomInOut">没有更多的文章</p>
    </div>
  </section>
</template>

<script>
  import app, {cache, setNecessaryAttribute} from '../app.js'

  const perPage = 5       // 每页文章数量
  let _cache = cache      // 缓存
  let issuesLabel = null  // issues 标签

  // 获取初始化文章列表信息
  let getInitArticleListInfo = () => {
    return {
      list: [],
      page: 1,
      hasMore: true
    }
  }

  export default {
    route: {
      data (transition) {
        // issues 标签
        transition.to.name === 'article-list' ? issuesLabel = 'all' : issuesLabel = transition.to.params.labelName

        // 有缓存则从缓存内取出文章信息
        // 没有则初始化并从接口获取文章信息
        if (_cache.issues.blog[issuesLabel]) {
          this.articleListInfo = _cache.issues.blog[issuesLabel]
        } else {
          _cache.issues.blog[issuesLabel] = this.articleListInfo = getInitArticleListInfo()
          this.$dispatch('set-loader-state', true)
          this.getBlogIssues()
        }
      }
    },
    data () {
      return {
        articleListInfo: getInitArticleListInfo(),
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
  .article-list__item {
    position: relative;
    list-style: none;
  }
  .js-inmobile .article-list__item {
    padding-top: 0.75rem;
  }
  .article-list__item .article-list__read {
    display: inline-block;
    position: relative;
    left: 50%;
    margin-top: 2em;
    border: 1px solid #0097da;
    color: #0097da;
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
    height: 9em;
    padding: 3em;
    border-radius: 2em;
    font-size: 14px;
    text-align: center;
    background-color: #fcfcfc;
  }
  .js-inmobile[data-dpr='2'] .article-list__more-wrap {
    font-size: 24px;
  }
  .js-inmobile[data-dpr='3'] .article-list__more-wrap {
    font-size: 36px;
  }
  .article-list__more-wrap p {
    margin: 0;
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
</style>
