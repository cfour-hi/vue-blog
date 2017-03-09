<template>
  <section class="article-content-page">
    <transition name="fadeInOut">
      <article class="issues-content" v-if="($route.name === 'article-content' || 'worklog-content') && issuesInfo">
        <div class="article-labels">
          <router-link class="article-label" :class="'label-' + label.color" :to="{name: 'label-article-list', params: {labelName: label.name}}" v-for="label in issuesInfo.labels">{{ label.name }}</router-link>
        </div>
        <h2 class="issues-content__title"><a href="javascript:;">{{ issuesInfo.title }}</a></h2>
        <p class="issues-content__time">CREATED AT {{ issuesInfo.createdAt }}</p>
        <div v-html="issuesInfo.body"></div>
      </article>
    </transition>
    <div class="horizontal-rule" v-if="issuesInfo" data-text="END"></div>
    <transition name="fadeInOut">
      <div class="issues-comments" v-if="issuesInfo">
        <p><a :href="issuesInfo.html_url" style="color: #f60;">去 Github 发表评论</a></p>
        <dl v-if="commentsInfo.list.length">
          <dd class="issues-comments__item" v-for="comment in commentsInfo.list">
            <a class="issues-comments__item-avator" v-if="!inMobile" :href="comment.html_url">
              <img :src="comment.user.avatar_url" alt="头像">
            </a>
            <div class="issues-comments__item-header">
              <a :href="comment.html_url"><strong>{{ comment.user.login }}</strong></a>
              <span class="issues-comments__item-created">commented on {{ comment.createdAt }}</span>
            </div>
            <article class="issues-comments__item-main" v-html="comment.body"></article>
          </dd>
        </dl>
        <div class="issues-comments__more-wrap" v-if="commentsInfo.list.length">
          <transition name="zoomInOut">
            <p class="issues-comments__more-box" v-show="commentsInfo.list.length && commentsInfo.hasMore && showMoreBtn">
              <a class="issues-comments__more transition-color-btn" href="javascript:;" @click="getMoreComments">更多评论</a>
            </p>
          </transition>
          <transition name="zoomInOut">
            <p class="center-prompt-message" v-show="commentsInfo.list.length && !commentsInfo.hasMore">没有更多的评论</p>
          </transition>
        </div>
        <p class="center-prompt-message" v-if="issuesInfo && !commentsInfo.list.length">还没有小伙伴发言 ... </p>
      </div>
    </transition>
  </section>
</template>

<script>
  import app, {cache, setNecessaryAttribute} from '../app.js'

  const perPage = 30    // 每页评论内容数量
  let _cache = cache    // 缓存
  let reposType = null  // 仓库类型
  let issuesNum = null  // issues number 标识

  export default {
    data () {
      return {
        issuesInfo: null,
        commentsInfo: null,
        showMoreBtn: true,
        inMobile: window.lib.inMobile
      }
    },
    created () {
      window.scrollTo(0, 0)

      issuesNum = +this.$route.params.num
      this.$route.name === 'article-content' ? reposType = 'blog' : reposType = 'worklog'

      // 从缓存内获取文章信息
      let cacheIssuesRepos = _cache.issues[reposType]
      if (Object.keys(cacheIssuesRepos)) {
        for (let key in cacheIssuesRepos) {
          for (let i = cacheIssuesRepos[key].list.length - 1; i >= 0; i--) {
            if (cacheIssuesRepos[key].list[i].number === issuesNum) {
              this.issuesInfo = cacheIssuesRepos[key].list[i]
              _cache.comments[this.issuesInfo.id] ? this.commentsInfo = _cache.comments[this.issuesInfo.id] : this.initCommentsInfo()
              return
            }
          }
        }
      }

      this.$emit('set-loader-state', true)

      // 获取当前文章信息
      this.$http.get(app.host + 'repos/' + app.owner + '/' + (app[reposType + 'Repos']) + '/issues/' + issuesNum, {
        params: {
          access_token: app.access_token
        }
      }).then((response) => {
        // 设置文章所需内容
        this.issuesInfo = setNecessaryAttribute(response.data, 'issues')

        // 获取评论信息
        _cache.comments[this.issuesInfo.id] ? this.commentsInfo = _cache.comments[this.issuesInfo.id] : this.initCommentsInfo()

        this.$emit('set-loader-state', false)
      })
    },
    methods: {
      initCommentsInfo () {
        // 初始化评论信息
        this.commentsInfo = {
          list: [],
          page: 1,
          hasMore: true
        }
        this.getCommentsInfo()
      },
      getCommentsInfo () {
        // 获取评论信息
        // this.$http.get('https://api.github.com/repos/lifesinger/blog/issues/184/comments?page=1&per_page=30', {
        this.$http.get(this.issuesInfo.comments_url, {
          params: {
            page: this.commentsInfo.page,
            per_page: perPage,
            access_token: app.access_token
          }
        }).then((response) => {
          if (!this.showMoreBtn) this.showMoreBtn = true
          if (!_cache.comments[this.issuesInfo.id]) _cache.comments[this.issuesInfo.id] = this.commentsInfo  // 添加评论缓存
          if (!response.data.length) return (this.commentsInfo.hasMore = false)

          this.commentsInfo.list = this.commentsInfo.list.concat(setNecessaryAttribute(response.data, 'comments'))
          this.commentsInfo.page += 1

          if (response.data.length < perPage) this.commentsInfo.hasMore = false
        })
      },
      getMoreComments () {
        this.showMoreBtn = false
        this.getCommentsInfo()
      }
    }
  }
</script>

<style scoped>
  .article-content-page .issues-content__title a {
    background: url(../assets/img/icon-go.png) no-repeat center 1.3em;
    background-size: 32px;
    cursor: default;
  }
  .js-inmobile .article-content-page .issues-content__title a {
    background: none;
  }
  .horizontal-rule {
    position: relative;
    height: 3em;
  }
  .horizontal-rule::before {
    content: '';
    position: absolute;
    top: 50%; right: 2em; left: 2em;
    border-bottom: 1px solid #999;
  }
  .js-inmobile .horizontal-rule::before {
    left: 1em; right: 1em;
  }
  .horizontal-rule::after {
    content: attr(data-text);
    position: absolute;
    top: 0; left: 50%;
    padding: 0.5em 2em;
    line-height: 2;
    color: #999;
    background-color: #fff;
    transform: translateX(-50%);
  }

  .issues-comments {
    padding: 1em 2em;
  }
  .js-inmobile .issues-comments {
    padding: 1em;
  }
  .issues-comments__item {
    position: relative;
    margin: 1em 0 1em 5.5em;
    border: 1px solid #ddd;
    border-radius: 3px;
  }
  .js-inmobile .issues-comments__item {
    margin: 0.3rem 0;
  }
  .issues-comments__item::before {
    content: '';
    position: absolute;
    bottom: -1.1em; left: 0.3rem;
    width: 2px; height: 1.1em;
    background: #ccc;
  }
  .issues-comments__item:last-child::before {
    content: none;
  }
  .issues-comments__item-avator {
    position: absolute;
    left: -5.5em;
  }
  .issues-comments__item-avator img {
    width: 4em; height: 4em;
    border-radius: 3px;
  }
  .issues-comments__item-header {
    position: relative;
    padding: 0.1rem 0.15rem;
    border-bottom: 1px solid #ddd;
    font-size: 12px;
    background: #f7f7f7;
  }
  .js-inmobile[data-dpr='2'] .issues-comments__item-header {
    font-size: 24px;
  }
  .js-inmobile[data-dpr='3'] .issues-comments__item-header {
    font-size: 36px;
  }
  .issues-comments__item-header::before {
    content: '';
    position: absolute;
    top: 1.15em; left: -0.55em;
    width: 1em; height: 1em;
    border-top: 1px solid #ddd;
    border-left: 1px solid #ddd;
    background: #f7f7f7;
    transform: rotate(-45deg);
  }
  .js-inmobile .issues-comments__item-header::before {
    top: 0.3rem; left: -0.18rem;
    width: 0.3rem; height: 0.3rem;
  }
  .issues-comments__item-created {
    color: #666;
  }
  .issues-comments__item-main {
    padding: 0.15rem;
    font-size: 14px;
  }
  .js-inmobile[data-dpr='2'] .issues-comments__item-main {
    font-size: 28px;
  }
  .js-inmobile[data-dpr='3'] .issues-comments__item-main {
    font-size: 42px;
  }

  .issues-comments__more-wrap {
    height: 3em;
    margin-top: 2em;
    font-size: 14px;
    text-align: center;
  }
  .js-inmobile .issues-comments__more-wrap  {
    height: 1.25rem;
  }
  .js-inmobile[data-dpr='2'] .issues-comments__more-wrap {
    font-size: 28px;
  }
  .js-inmobile[data-dpr='3'] .issues-comments__more-wrap {
    font-size: 42px;
  }
  .issues-comments__more {
    display: inline-block;
    border: 1px solid #f60;
    color: #f60;
  }
  .issues-comments__more:hover {
    color: #fff;
    background-color: #ff8533;
  }
  .js-inmobile .issues-comments__more:hover {
    color: #f60;
    background-color: transparent;
  }
  .issues-comments__more:active {
    background-color: #f26100;
  }
</style>
