<template>
  <div class="page__article-content">
    <article v-if="articleInfo.title" class="article-container">
      <div class="article-border-top" :style="{ 'background-color': '#' + articleInfo.labels[0].color }"></div>
      <h2 class="article-title">{{ articleInfo.title }}</h2>
      <article-pieces :articleInfo="articleInfo"></article-pieces>
      <i class="fa fa-quote-left fa-3x fa-pull-left fa-border" aria-hidden="true"></i>
      <blockquote class="article-quote" v-html="articleInfo.quote"></blockquote>
      <div v-if="articleInfo.banner" v-html="articleInfo.banner" class="article-banner" alt="banner"></div>
      <div v-html="articleInfo.body" class="article-content"></div>
    </article>
    <article-comment v-if="articleInfo.commentNum" :comment-url="articleInfo.commentUrl"></article-comment>
  </div>
</template>

<script>
import ArticlePieces from './ArticlePieces'
import ArticleComment from './ArticleComment'

import { getArticleInfo } from '@/api'
import { articleCategoryList } from '@/app/js/config'

export default {
  name: 'article-content',
  components: {
    ArticlePieces,
    ArticleComment
  },
  data () {
    return {
      articleInfo: {}
    }
  },
  created () {
    this.$store.state.articles[this.$route.meta.category]
      ? this.articleInfo = this.$store.state.articles[this.$route.meta.category].find(article => article.number === +this.$route.params.number)
      : setArticleInfo(this)
  },
  mounted () {
    document.scrollingElement.scrollTop = 0
  }
}

function setArticleInfo (vm) {
  vm.$store.commit('setProgress', { step: 'loading' })

  getArticleInfo(vm.$route.meta.category, vm.$route.params.number).then(response => {
    const category = articleCategoryList.find(category => category.label === vm.$route.meta.category)
    vm.articleInfo = category.converFunc(response)
  })
}
</script>


<style scoped>
.article-container {
  padding: 2em;
  font-size: 14px;
  color: #404040;
  background-color: rgba(255, 255, 255, .8);
}

.in-mobile .article-container {
  padding: 1em;
}

.in-mobile .article-border-top {
  margin: -1em -1em 0;
}

.article-border-top {
  height: 3px;
  opacity: .3;
  margin: -2em -2em 0;
}

.article-title {
  font-size: 20px;
  text-align: center;
}

.article-quote {
  min-height: 6em;
  margin: 0;
  margin-bottom: 1em;
  border-bottom: 3px solid #f5f5f5;
}
</style>

<style>
.page__article-content .comp__article-pieces {
  margin-bottom: 1.2em;
  text-align: center;
}

.page__article-content .article-quote ol {
  padding-left: 7em;
  margin: 0;
}

.page__article-content .article-container img {
  border-radius: 5px;
}

.page__article-content .article-content h3 {
  position: relative;
   padding-left: 1em;
  line-height: 3;
}

 .page__article-content .article-content h3::before {
  content: '';
  position: absolute;
  top: .8em;
  left: 0;
  width: 5px;
  height: 1.4em;
  border-radius: 5px;
  background-color: #f56a00;
}

.page__article-content .article-content blockquote {
  padding: 1px 1em;
  margin-left: 0;
  margin-right: 0;
  border-left: 3px solid #7ec2f3;
  border-radius: 3px;
  font-size: 12px;
  background-color: #ecf6fd;
}

.page__article-content .article-content a,
.article-container blockquote a {
  padding-bottom: 2px;
  border-bottom: 1px solid #919191;
  text-decoration: none;
}

.page__article-content .article-content a:hover,
.article-container blockquote a:hover {
  color: #7265e6;
  border-color: currentColor;
}

.page__article-content .article-content em {
  font-size: 12px;
}

.page__article-content .article-content pre {
  max-height: 50em;
  padding: 1em;
  border-radius: 5px;
  font-size: 12px;
  background-color: #404040;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.page__article-content .article-content pre::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: transparent;
}

.page__article-content .article-content pre::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #bfbfbf;
}

.page__article-content .article-content pre::-webkit-scrollbar-corner {
  background-color: #fff;
}

.page__article-content .article-content pre code {
  padding: 0;
  font-size: 12px;
  color: #fff;
  background-color: transparent;
}
</style>
