<template>
  <div class="comp__article-pieces">
    <i class="fa fa-calendar" aria-hidden="true"></i>
    <span>{{ articleInfo.createdAt }}</span>
    <i class="fa fa-commenting" aria-hidden="true"></i>
    <span>{{ articleInfo.commentNum }}</span>
    <i class="fa fa-tag" aria-hidden="true"></i>
    <span v-for="label in articleInfo.labels" :key="label.id" :style="{ color: '#' + label.color}">{{ label.name }}</span>
  </div>
</template>

<script>
export default {
  name: 'comp__article-pieces',
  props: ['articleInfo']
}
</script>

<style scoped>
.comp__article-pieces {
  font-size: 12px;
  color: #919191;
}

.comp__article-pieces .fa {
  margin-right: .2em;
}

.comp__article-pieces .fa:not(:first-child) {
  margin-left: 1em;
}
</style>

