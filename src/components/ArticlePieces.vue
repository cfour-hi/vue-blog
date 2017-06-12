<template>
  <div class="article-pieces">
    <i class="fa fa-calendar" aria-hidden="true"></i>
    <span>{{ articleInfo.createdAt }}</span>
    <i class="fa fa-commenting" aria-hidden="true"></i>
    <span>{{ articleInfo.commentNum }}</span>
    <i class="fa fa-tags" aria-hidden="true"></i>
    <span v-for="label in articleInfo.labels" :key="label.id" :style="{ color: '#' + label.color}">{{ label.name }}</span>
  </div>
</template>

<script>
export default {
  name: 'article-pieces',
  props: ['articleInfo']
}
</script>

<style scoped>
.article-pieces {
  font-size: 12px;
  color: #919191;
}

.article-pieces .fa {
  margin-right: .2em;
}

.article-pieces .fa:not(:first-child) {
  margin-left: 1em;
}
</style>

