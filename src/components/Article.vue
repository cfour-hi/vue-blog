<template>
  <section class="article-page">
    <nav class="article-list__labels-nav" :class="{'labels-nav--show': !loader}" v-if="!inMobile">
      <a class="labels-nav__title" href="javascript:void(0);">标签</a>
      <a class="labels-nav__item" v-for="label in labels" v-link="{name: 'label-article-list', params: {labelName: label}}">{{ label }}</a>
    </nav>
    <router-view></router-view>
  </section>
</template>

<script>
  import app, {cache, setLabels} from '../app.js'

  let _cache = cache

  export default {
    ready () {
      this.labels = _cache.labels
      if (!this.labels.length) { this.getLabels() }
    },
    props: ['loader'],
    data () {
      return {
        labels: null,
        inMobile: window.lib.inMobile
      }
    },
    methods: {
      getLabels () {
        this.$http.get(app.host + 'repos/' + app.owner + '/' + app.blogRepos + '/labels').then((response) => {
          setLabels(response.data)
        })
      }
    }
  }
</script>

<style scoped>
  .article-list__labels-nav {
    opacity: 0;
    position: absolute;
    top: -1px; left: 0;
    font-size: 12px;
    letter-spacing: 0.5em;
    text-indent: 1em;
    z-index: 1;
    transition-property: opacity, left;
    transition-duration: 0.5s;
  }
  .labels-nav--show {
    opacity: 1;
    left: -50px;
  }
  .article-list__labels-nav a {
    display: block;
    width: 50px;
    margin-bottom: 3px;
    border-radius: 50% 0 0 50%;
    text-align: center;
  }
  .article-list__labels-nav .labels-nav__item {
    border: 1px solid #bbb;
    border-right: none;
    color: #bbb;
    transition-property: width, margin-left;
    transition-duration: 0.3s;
  }
  .article-list__labels-nav .labels-nav__item:hover {
    width: 60px;
    margin-left: -10px;
    border-color: #999;
    color: #666;
  }
  .article-list__labels-nav .labels-nav__item.v-link-active,
  .article-list__labels-nav .labels-nav__title {
    width: 65px;
    margin-left: -15px;
    font-size: 14px;
  }
  .article-list__labels-nav .labels-nav__item.v-link-active {
    position: relative;
    text-indent: 1.3em;
    border-color: #999;
    color: #666;
  }
  .article-list__labels-nav .labels-nav__item.v-link-active:before {
    content: '';
    position: absolute;
    top: 50%; left: 7px;
    width: 8px; height: 8px;
    margin-top: -4px;
    border: 1px solid #999;
    border-radius: 50%;
  }
  .article-list__labels-nav .labels-nav__title {
    color: #fff;
    background: #0097da;
    cursor: default;
  }
</style>
