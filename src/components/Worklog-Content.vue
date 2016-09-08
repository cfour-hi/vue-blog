<template>
  <section class="worklog-content-page">
    <article class="issues-content" v-if="$route.name === 'worklog-content' && worklogInfo.id" transition="fade">
      <header>
        <h2 class="issues-content__title">{{ worklogInfo.title }}</h2>
      </header>
      <p class="issues-content__time" v-show="worklogInfo._createdAt">
        <em>Create at {{ worklogInfo._createdAt }} && Update at {{ worklogInfo._updatedAt }}</em>
      </p>
      <section class="issues-content__body">{{{ worklogInfo._body }}}</section>
    </article>
  </section>
</template>

<script>
  import app, {cacheWorklogList, addPrivateArticleAttr} from '../app.js'
  // cacheWorklogList is read-only

  export default {
    ready () {
      let articleNum = +(this.issuesNum)

      if (cacheWorklogList.length) {
        for (let i = cacheWorklogList.length - 1; i >= 0; i--) {
          if (cacheWorklogList[i].number === articleNum) {
            return (this.worklogInfo = cacheWorklogList[i])
          }
        }
      }

      this.$dispatch('update-loading', true)

      this.$http.get(app.host + 'repos/' + app.owner + '/' + app.worklogRepo + '/issues/' + articleNum, {
        params: {
          access_token: app.access_token
        }
      }).then((response) => {
        this.worklogInfo = addPrivateArticleAttr(response.data)

        this.$dispatch('update-loading', false)
      })
    },
    props: ['issuesNum'],
    data () {
      return {
        worklogInfo: {}
      }
    }
  }
</script>
