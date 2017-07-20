<template>
  <div class="comp__article-comment">
    <dl v-if="commentList.length" class="comment-list">
      <dd v-for="comment in commentList" class="comment-item" :key="comment.id">
        <a v-if="!inMobile" class="commenter-avatar-link" target="_blank" :href="comment.user.url">
          <img class="commenter-avatar" :src="comment.user.avatar_url" alt="avatar">
        </a>
        <div class="comment-header">
          <a class="commenter-name-link" target="_blank" :href="comment.user.url">
            <strong>{{ comment.user.login }}</strong>
          </a>
          <span class="comment-created">{{ comment.createdAt }}</span>
        </div>
        <article class="comment-body" v-html="comment.body"></article>
      </dd>
    </dl>
  </div>
</template>

<script>
import marked from 'marked'
import { getCommentList } from '@/api'

let page = 1

export default {
  name: 'article-comment',
  props: ['commentUrl'],
  data () {
    return {
      inMobile: this.$store.state.inMobile,
      commentList: []
    }
  },
  created () {
    this.$store.state.comments[this.$route.meta.category] && this.$store.state.comments[this.$route.meta.category][this.$route.params.number]
      ? this.commentList = this.$store.state.comments[this.$route.meta.category][this.$route.params.number]
      : setCommentList(this)
  }
}

function filterCommentInfo (comment) {
  return {
    createdAt: comment.created_at.replace(/T|Z/g, ' '),
    body: marked(comment.body),
    user: {
      url: comment.user.html_url,
      avatar_url: comment.user.avatar_url,
      login: comment.user.login
    }
  }
}

function setCommentList (vm) {
  getCommentList(vm.commentUrl, page).then(response => {
    response.forEach(comment => {
      vm.commentList.push(filterCommentInfo(comment))
    })

    vm.$store.commit('addCommentList', {
      category: vm.$route.meta.category,
      number: vm.$route.params.number,
      list: vm.commentList
    })
  })
}
</script>

<style scoped>
.comment-list {
  padding: 1px 1em;
  background-color: rgba(255, 255, 255, .8);
}

.comment-item {
  position: relative;
  margin: 1em 0 1em 5em;
  border: 1px solid #d9d9d9;
}

.in-mobile .comment-item {
  margin-left: 0;
}

.commenter-avatar-link {
  position: absolute;
  left: -5em;
}

.commenter-avatar {
  width: 4em;
  height: 4em;
}

.comment-header {
  position: relative;
  padding: .5em 1em;
  border-bottom: 1px solid #d9d9d9;
  font-size: 12px;
  background: #f7f7f7;
}

.comment-header::before {
  content: '';
  position: absolute;
  top: .85em;
  left: -.55em;
  width: 1em;
  height: 1em;
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  background: #f7f7f7;
  transform: rotate(-45deg);
}

.commenter-name-link {
  text-decoration: none;
}

.comment-body {
  padding: 0 1em;
  font-size: 14px;
}
</style>
