<template>
  <div class="article-list-page">
    <dl class="article-list">
      <dd v-for="article in articleList" class="article-item" :key="article.id" @click="jump2ArticleContent(article)">
        <article class="article-container">
          <router-link v-if="!inMobile" v-html="article.thumb" class="article-thumb" :to="'/article/' + article.number" tag="div"></router-link>
          <router-link class="article-title" :to="'/article/' + article.number" tag="h2">{{ article.title }}</router-link>
          <blockquote class="article-quote" v-html="article.quote"></blockquote>
          <article-pieces :articleInfo="article"></article-pieces>
        </article>
      </dd>
    </dl>
    <div v-show="hasMoreArticle" class="article-loading-more" @click="getArticleList">
      <i v-show="loadingMore" class="fa fa-spinner fa-spin fa-fw"></i>
      <span v-show="!loadingMore">加载更多</span>
    </div>
    <div v-show="articleList.length && !hasMoreArticle" class="baseline" data-text="没有更多文章"></div>
  </div>
</template>

<script>
import ArticlePieces from './ArticlePieces'

import { getArticleList } from '@/api'
import { converArticleInfo } from '@/app/js/app'

const pagination = {
  page: 1,
  size: 5
}

let hasMoreArticle = false

export default {
  components: {
    ArticlePieces
  },
  data () {
    return {
      inMobile: this.$store.state.inMobile,
      articleList: [],
      hasMoreArticle: hasMoreArticle,
      loadingMore: false
    }
  },
  created () {
    this.$store.state.articles[this.$route.meta.category]
      ? this.articleList = this.$store.state.articles[this.$route.meta.category]
      : this.getArticleList()
  },
  methods: {
    getArticleList () {
      if (this.loadingMore) return
      this.loadingMore = true

      this.$store.commit('setProgress', { step: 'loading' })

      getArticleList(pagination).then(response => {
        const articleList = []
        response.forEach(article => {
          articleList.push(converArticleInfo(article))
        })

        pagination.page += 1
        this.loadingMore = false
        this.articleList = this.articleList.concat(articleList)
        this.hasMoreArticle = hasMoreArticle = response.length === pagination.size
        this.$store.commit('concatArticleList', { category: this.$route.meta.category, list: articleList })
      })
    },
    jump2ArticleContent (article) {
      if (this.inMobile) this.$router.push('/article/' + article.number)
    }
  }
}
</script>

<style scoped>
.article-list {
  font-size: 14px;
}

.in-mobile .article-list {
  margin-top: 0;
}

.article-item {
  padding: .5em;
  margin: 1em 0;
  background-color: rgba(255, 255, 255, .8);
}

.in-mobile .article-item {
  padding: .5em 1em;
}

.in-mobile .article-item:first-child {
  margin-top: 0;
}

.article-item:hover {
  background-color: rgba(0, 0, 0, .05);
}

.in-mobile .article-item:hover {
  background-color: rgba(255, 255, 255, .8);
}

.article-title {
  margin: 0;
  font-size: 16px;
  color: #5a5a5a;
  cursor: pointer;
  transition: transform .3s;
}

.article-title:hover {
  transform: translateX(.5em);
}

.in-mobile .article-title:hover {
  transform: none;
}

.article-thumb {
  overflow: hidden;
  float: left;
  height: 10em;
  border-radius: 5px;
  margin-right: 1em;
  background-color: #e9e9e9;
}

.article-quote {
  overflow: hidden;
  display: -webkit-box;
  height: 6em;
  margin: 0;
  text-overflow: ellipsis;
  color: #5a5a5a;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.article-loading-more {
  margin-bottom: 1em;
  font-size: 14px;
  line-height: 2.5;
  text-align: center;
  color: #919191;
  background-color: rgba(255, 255, 255, .8);
  cursor: pointer;
}

.article-loading-more:hover {
  color: #5a5a5a;
  background-color: #e9e9e9;
}

.in-mobile .article-loading-more:hover {
  color: #919191;
  background-color: rgba(255, 255, 255, .8);
}
</style>


<style>
.article-list-page .article-thumb p {
  margin: 0;
}

.article-list-page .article-thumb img {
  width: 12.5em;
  height: 10em;
  cursor: pointer;
  object-fit: cover;
  transition: transform .5s;
}

.article-list-page .article-item:hover .article-thumb img {
  background-color: rgba(255, 255, 255, .8);
  transform: scale(1.05);
}

.article-list-page .article-item .article-thumb img:hover {
  transform: scale(1.05);
}

.article-list-page .article-quote p,
.article-list-page .article-quote ol {
  margin: .5em 0;
}

.article-list-page .article-pieces {
  margin-top: .5em;
}
</style>
