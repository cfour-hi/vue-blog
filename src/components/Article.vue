<template>
  <section class="article-page">
    <nav class="article-list__labels-nav" :class="{'labels-nav--show': !loader}">
      <a class="labels-nav__title" href="javascript:void(0);">标签</a>
      <a class="labels-nav__item" v-link="{name: 'label-article-list', params: {labelName: '技术'}}">技术</a>
      <a class="labels-nav__item" v-link="{name: 'label-article-list', params: {labelName: '工具'}}">工具</a>
      <a class="labels-nav__item" v-link="{name: 'label-article-list', params: {labelName: '读书'}}">读书</a>
    </nav>
    <router-view></router-view>
  </section>
</template>

<script>
  export default {
    props: ['loader']
  }
</script>

<style scoped>
  .article-list__labels-nav {
    opacity: 0;
    position: absolute;
    top: -1px;
    left: 0;
    font-size: 12px;
    letter-spacing: 0.5em;
    text-indent: 1em;
    z-index: 1;
    -webkit-transition-property: opacity, left;
            transition-property: opacity, left;
    -webkit-transition-duration: 0.5s;
            transition-duration: 0.5s;
  }
  .labels-nav--show {
    opacity: 1;
    left: -0.5rem;
  }
  .article-list__labels-nav a {
    display: block;
    width: 0.5rem;
    margin-bottom: 3px;
    border-radius: 50% 0 0 50%;
    text-align: center;
  }
  .article-list__labels-nav .labels-nav__item {
    border: 1px solid #bbb;
    border-right: none;
    color: #bbb;
    -webkit-transition-property: width, margin-left;
            transition-property: width, margin-left;
    -webkit-transition-duration: 0.3s;
            transition-duration: 0.3s;
  }
  .article-list__labels-nav .labels-nav__item:hover {
    width: 0.6rem;
    margin-left: -0.1rem;
    border-color: #999;
    color: #666;
  }
  .article-list__labels-nav .labels-nav__item.v-link-active,
  .article-list__labels-nav .labels-nav__title {
    width: 0.65rem;
    margin-left: -0.15rem;
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
