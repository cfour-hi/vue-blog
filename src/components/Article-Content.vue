<template>
  <section class="article-content-page">
    <article class="issues-content" v-if="($route.name === 'article-content' || 'worklog-content') && issuesInfo" transition="fadeInOut">
      <h2 class="issues-content__title">{{ issuesInfo.title }}</h2>
      <p class="issues-content__time">CREATED AT {{ issuesInfo.createdAt }} _ UPDATED AT {{ issuesInfo.updatedAt }}</p>
     {{{ issuesInfo.body }}}
    </article>
    <div class="end-mark" v-if="issuesInfo">END</div>
    <div class="issues-comments" v-if="issuesInfo" transition="fadeInOut">
      <p><a href="{{issuesInfo.html_url}}" style="color: #f60;">去 Github 发表评论</a></p>
      <dl v-if="commentsInfo.list.length">
        <dd class="issues-comments__item" v-for="comment in commentsInfo.list">
          <a class="issues-comments__item-avator" href="{{comment.html_url}}" v-if="!inMobile">
            <img :src="comment.user.avatar_url" alt="头像">
          </a>
          <div class="issues-comments__item-header">
            <a href="{{comment.html_url}}"><strong>{{comment.user.login}}</strong></a>
            <span class="issues-comments__item-created">commented on {{comment.createdAt}}</span>
          </div>
          <article class="issues-comments__item-main">{{{comment.body}}}</article>
        </dd>
      </dl>
      <div class="issues-comments__more-wrap" v-if="commentsInfo.list.length">
        <p class="issues-comments__more-box" v-show="commentsInfo.list.length && commentsInfo.hasMore && showMoreBtn" transition="zoomInOut">
          <a class="issues-comments__more transition-color-btn" href="javascript:;" @click="getMoreComments">更多评论</a>
        </p>
        <p class="center-prompt-message" v-show="commentsInfo.list.length && !commentsInfo.hasMore" transition="zoomInOut">没有更多的评论</p>
      </div>
      <p class="center-prompt-message" v-if="issuesInfo && !commentsInfo.list.length">还没有小伙伴发言 ... </p>
    </div>
  </section>
</template>

<script>
  import app, {cache, setNecessaryAttribute} from '../app.js'

  const perPage = 30    // 每页评论内容数量
  let _cache = cache    // 缓存
  let reposType = null  // 仓库类型
  let issuesNum = null  // issues number 标识

  export default {
    route: {
      data (transition) {
        window.scrollTo(0, 0)

        issuesNum = +transition.to.params.num
        transition.to.name === 'article-content' ? reposType = 'blog' : reposType = 'worklog'

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

        this.$dispatch('set-loader-state', true)

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

          this.$dispatch('set-loader-state', false)
        })
      }
    },
    data () {
      return {
        issuesInfo: null,
        commentsInfo: null,
        showMoreBtn: true,
        inMobile: window.lib.inMobile
      }
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
  .end-mark {
    position: relative;
    text-align: center;
    color: #999;
  }
  .js-inmobile .end-mark {
    font-size: 14px;
  }
  .js-inmobile[data-dpr='2'] .end-mark {
    font-size: 28px
  }
  .end-mark:before,
  .end-mark:after {
    content: '';
    position: absolute;
    top: 50%;
    height: 1px; width: 44%;
    background: #bbb;
  }
  .end-mark:before {
    left: 0;
  }
  .end-mark:after {
    right: 0;
  }

  .issues-comments {
    padding-top: 0.3rem;
  }
  .js-inmobile .issues-comments {
    font-size: 16px;
  }
  .js-inmobile[data-dpr='2'] .issues-comments {
    font-size: 32px;
  }
  @media (max-device-width: 374px) {
    .js-inmobile[data-dpr='2'] .issues-comments {
      font-size: 28px;
    }
  }
  .js-inmobile[data-dpr='3'] .issues-comments {
    font-size: 48px;
  }
  .issues-comments__item {
    position: relative;
    margin: 0.15rem 0;
    border: 1px solid #ddd;
    border-radius: 3px;
  }
  .js-inmobile .issues-comments__item {
    margin: 0.3rem 0;
  }
  .issues-comments__item:before {
    content: '';
    position: absolute;
    bottom: -0.32rem; left: 0.3rem;
    width: 2px; height: 0.3rem;
    background: #ccc;
  }
  .issues-comments__item:last-child:before {
    content: none;
  }
  .issues-comments__item-avator {
    position: absolute;
    left: -0.8rem;
  }
  .issues-comments__item-avator img {
    width: 0.6rem; height: 0.6rem;
    border-radius: 3px;
  }
  .issues-comments__item-header {
    position: relative;
    padding: 0.1rem 0.15rem;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    background: #f7f7f7;
  }
  .js-inmobile[data-dpr='2'] .issues-comments__item-header {
    font-size: 28px;
  }
  .js-inmobile[data-dpr='3'] .issues-comments__item-header {
    font-size: 42px;
  }
  .issues-comments__item-header:before {
    content: '';
    position: absolute;
    top: 0.2rem; left: -0.11rem;
    width: 0.2rem; height: 0.2rem;
    border-top: 1px solid #ddd;
    border-left: 1px solid #ddd;
    background: #f7f7f7;
    transform: rotate(-45deg);
  }
  .js-inmobile .issues-comments__item-header:before {
    top: 0.3rem; left: -0.18rem;
    width: 0.3rem; height: 0.3rem;
  }
  .issues-comments__item-created {
    color: #666;
  }
  .issues-comments__item-main {
    padding: 0.15rem;
  }

  .issues-comments__more-wrap {
    height: 0.75rem;
    font-size: 18px;
    text-align: center;
  }
  .js-inmobile .issues-comments__more-wrap  {
    height: 1.25rem;
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
  .issues-comments__more:active {
    background-color: #f26100;
  }
</style>
