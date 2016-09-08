<template>
  <section class="worklog-list-page">
    <ul class="worklog-list">
      <li class="worklog-list__item" v-for="worklog in worklogListInfo"><a v-link="{ name: 'worklog-content', params: { num: worklog.number } }">{{ worklog.title }}</a></li>
    </ul>
  </section>
</template>

<script>
  import app, {cacheWorklogList, pushCacheList, addPrivateArticleAttr} from '../app.js'

  let prePage = 60

  export default {
    ready () {
      if (cacheWorklogList.length) {
        this.$dispatch('update-loading', false)
        return (this.worklogListInfo = cacheWorklogList)
      }

      this.$dispatch('update-loading', true)

      this.getWorklogList()
    },
    props: ['loading'],
    data () {
      return {
        worklogListInfo: []
      }
    },
    methods: {
      getWorklogList () {
        this.$http.get(app.host + 'repos/' + app.owner + '/' + app.worklogRepo + '/issues', {
          params: {
            filter: 'created',
            page: this.nextPage,
            per_page: prePage,
            access_token: app.access_token
          }
        }).then((response) => {
          if (this.loading) this.$dispatch('update-loading', false)

          pushCacheList(app.worklogRepo, addPrivateArticleAttr(response.data))
          this.worklogListInfo = cacheWorklogList
        })
      }
    }
  }
</script>

<style>
  .worklog-list-page,
  .worklog-list,
  .worklog-list__item {
    -webkit-display: flex;
            display: flex;
  }
  .worklog-list-page {
    padding: 0.3rem 0.15rem;
  }
  .worklog-list {
    flex-wrap: wrap;
    width: 100%;
    padding: 0;
  }
  .worklog-list__item {
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 0.6rem;
    list-style: none;
  }
  .worklog-list__item a {
    position: relative;
    padding: 0.05rem 0.2rem;
    border-radius: 3px;
    border-top: 1px solid #eee;
    color: #666;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
  }
  .worklog-list__item a:hover {
    bottom: 2px;
    color: #999;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
  }
  .worklog-list__item a:active {
    bottom: -1px;
    color: #333;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
  }
</style>