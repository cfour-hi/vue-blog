<template>
  <section class="article-page">
    <router-view
      :loading="loading"
      :label-name="$route.params.labelName"
      :pagination="pagination"
      :issues-num="$route.params.num"
      :route-name="$route.name"
      @add-pagination-type="addPaginationType"
      @update-pagination="updatePagination"
      @update-has-more-article-statu="updateHasMoreArticleStatu"></router-view>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        pagination: {
          article: {
            page: 1,
            hasMoreArticle: true
          }
        }
      }
    },
    props: ['loading'],
    methods: {
      addPaginationType (type) {
        this.pagination[type] = {
          page: 1,
          hasMoreArticle: true
        }
      },
      updatePagination (type) {
        this.pagination[type].page += 1
      },
      updateHasMoreArticleStatu (type, bool) {
        this.pagination[type].hasMoreArticle = bool
      }
    }
  }
</script>
