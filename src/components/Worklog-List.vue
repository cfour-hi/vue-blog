<template>
  <section class="worklog-list-page">
    <ul class="worklog-list" v-if="worklogListInfo && worklogListInfo.list.length" transition="fadeInOut">
      <li class="worklog-list__item" v-for="worklog in worklogListInfo.list"><a v-link="{ name: 'worklog-content', params: { num: worklog.number } }">{{ worklog.title }}</a></li>
    </ul>
  </section>
</template>

<script>
  import app, {cache, setNecessaryAttribute} from '../app.js'
  // cache is read-only

  const perPage = 30  // 每页工作日志数量
  let _cache = cache  // 缓存

  export default {
    ready () {
      // 从缓存内获取文章信息
      if (_cache.issues[app.worklogRepos].all) {
        this.worklogListInfo = _cache.issues[app.worklogRepos].all
        return
      }

      // 初始化
      this.worklogListInfo = _cache.issues[app.worklogRepos].all = {
        list: [],
        page: 1,
        hasMore: true
      }

      this.$dispatch('set-loader-state', true)
      this.getWorklogList()
    },
    data () {
      return {
        worklogListInfo: null
      }
    },
    methods: {
      getWorklogList () {
        this.$http.get(app.host + 'repos/' + app.owner + '/' + app.worklogRepos + '/issues', {
          params: {
            filter: 'created',
            page: this.worklogListInfo.page,
            per_page: perPage,
            access_token: app.access_token
          }
        }).then((response) => {
          this.$dispatch('set-loader-state', false)

          this.worklogListInfo.list = this.worklogListInfo.list.concat(setNecessaryAttribute(response.data, 'issues'))
          this.worklogListInfo.page += 1
        })
      }
    }
  }
</script>

<style scoped>
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
    -webkit-flex-wrap: wrap;
            flex-wrap: wrap;
    width: 100%;
    padding: 0;
  }
  .worklog-list__item {
    -webkit-justify-content: center;
            justify-content: center;
    -webkit-align-items: center;
            align-items: center;
    width: 25%;
    height: 0.6rem;
    list-style: none;
  }
  .worklog-list__item a {
    position: relative;
    padding: 0.05rem 0.2rem;
    border-radius: 3px;
    border-top: 1px solid #ddd;
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
