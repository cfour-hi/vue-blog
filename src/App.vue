<template>
  <div id="app-wrapper" class="app-wrapper">
    <header id="app-header" class="app-header">
      <h1><a v-link="{ path: '/' }">Monine</a></h1>
      <nav>
        <a v-link="{ path: '/', exact: true }">名&nbsp;片</a>
        <a v-link="{ path: '/article' }">文&nbsp;章</a>
        <a v-link="{ path: '/worklog' }">工作日志</a>
      </nav>
    </header>
    <div id="app-container" class="app-container">
      <router-view :loading="loading" :next-page="nextPage" :has-more-article="hasMoreArticle" :issues-num="$route.params.num" @update-loading="updateLoading" @update-next-page="updateNextPage" @update-has-more-article="updateHasMoreArticle"></router-view>
      <div class="la-ball-clip-rotate" v-show="loading"><div></div></div>
    </div>
    <footer id="app-footer" class="app-footer">
      <p>© 2016 Monine</p>
    </footer>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: false,
        nextPage: 1,
        hasMoreArticle: true
      }
    },
    methods: {
      updateLoading (bool) {
        this.loading = bool
      },
      updateNextPage () {
        this.nextPage += 1
      },
      updateHasMoreArticle (bool) {
        this.hasMoreArticle = bool
      }
    }
  }
</script>

<style>
  /* base start */
  html {
    height: 100%;
    box-sizing: border-box;
    font-size: 100px;
    overflow-x: hidden;

  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    position: relative;
    height: 100%;
    margin-left: calc(100vw - 100%);
    font: 16px/1.5 "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial,sans-serif;
  }
  a {
    color: #333;
    text-decoration: none;
  }
  .link {
    color: #0097da;
  }
  .link:hover {
    color: #33ace1;
  }
  .link:active {
    color: #008fcf;
  }
  button {
    outline: none;
  }
  blockquote {
    padding: 0 10px;
    margin: 0;
    border-left: 5px solid #ccc;
    font-size: 14px;
    color: #333;
    line-height: 2;
  }
  pre {
    padding: 16px;
    overflow: auto;
    font-size: 12px;
    background-color: #f7f7f7;
    border-radius: 3px;
    word-wrap: break-word;
  }
  code {
    padding: 0.2em 0.5em;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 3px;
    font: 12px Consolas, "Liberation Mono", Menlo, Courier, monospace;
  }
  pre code {
    background-color: transparent;
    padding: 0;
  }
  .hljs-built_in, .hljs-params, .hljs-number, .hljs-literal {
    color: #0086b3
  }
  .hljs-string {
    color: #183691;
  }
  .hljs-keyword, .hljs-meta, .hljs-name {
    color: #a71d5d;
  }
  .hljs-title {
    color: #795da3;
  }
  .hljs-comment {
    color: #969896;
  }
  .hljs-regexp {
    color: #183691;
  }
  /* base end */

  /* tool start */
  .position-vertical-center {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
  }
  /* tool end */

  /* app start */
  .app-wrapper {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    width: 7rem;
    height: 100%;
    margin: 0 auto;
  }
  .app-header {
    -webkit-flex: 0 0 auto;
    flex: 0 0 auto;
    position: relative;
    border-bottom: 1px solid #999;
  }
  .app-header nav {
    position: relative;
    top: 2px;
    font-size: 14px;
  }
  .app-header nav a {
    display: table-cell;
    width: 0.7rem;
    text-align: center;
  }
  .app-header nav a:hover {
    border-bottom: 2px solid #0097da;
  }
  .app-header nav .v-link-active {
    border-bottom: 2px solid #0097da;
  }
  .app-container {
    -webkit-flex: 1 0 auto;
    flex: 1 0 auto;
    position: relative;
  }
  .app-footer {
    -webkit-flex: 0 0 auto;
    flex: 0 0 auto;
    border-top: 1px solid #999;
    text-align: center;
    font-size: 12px;
    color: #999;
  }
  /* app start */

  /*!
   * Load Awesome v1.1.0 (http://github.danielcardoso.net/load-awesome/)
   * Copyright 2015 Daniel Cardoso <@DanielCardoso>
   * Licensed under MIT
   */
  .la-ball-clip-rotate,
  .la-ball-clip-rotate > div {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .la-ball-clip-rotate {
    position: absolute;
    top: 0.2rem;
    left: 3.34rem;
    text-align: center;
    color: #0097da;
  }
  .la-ball-clip-rotate.la-dark {
    color: #333;
  }
  .la-ball-clip-rotate > div {
    position: relative;
    display: inline-block;
    float: none;
    background-color: currentColor;
    border: 0 solid currentColor;
    width: 32px;
    height: 32px;
    background: transparent;
    border-width: 2px;
    border-bottom-color: transparent;
    border-radius: 100%;
    -webkit-animation: ball-clip-rotate .75s linear infinite;
    -moz-animation: ball-clip-rotate .75s linear infinite;
    -o-animation: ball-clip-rotate .75s linear infinite;
    animation: ball-clip-rotate .75s linear infinite;
  }
  .la-ball-clip-rotate.la-sm {
    width: 16px;
    height: 16px;
  }
  .la-ball-clip-rotate.la-sm > div {
    width: 16px;
    height: 16px;
    border-width: 1px;
  }
  .la-ball-clip-rotate.la-2x {
    width: 64px;
    height: 64px;
  }
  .la-ball-clip-rotate.la-2x > div {
    width: 64px;
    height: 64px;
    border-width: 4px;
  }
  .la-ball-clip-rotate.la-3x {
    width: 96px;
    height: 96px;
  }
  .la-ball-clip-rotate.la-3x > div {
    width: 96px;
    height: 96px;
    border-width: 6px;
  }
  /*
  * Animation
  */
  @-webkit-keyframes ball-clip-rotate {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    50% {
      -webkit-transform: rotate(180deg);
      transform: rotate(180deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @-moz-keyframes ball-clip-rotate {
    0% {
      -moz-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    50% {
      -moz-transform: rotate(180deg);
      transform: rotate(180deg);
    }
    100% {
      -moz-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @-o-keyframes ball-clip-rotate {
    0% {
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    50% {
      -o-transform: rotate(180deg);
      transform: rotate(180deg);
    }
    100% {
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes ball-clip-rotate {
    0% {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    50% {
      -webkit-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      -o-transform: rotate(180deg);
      transform: rotate(180deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  /* Load Awesome end */

  /* trannsition animation start */
  @-webkit-keyframes fadeIn {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  @keyframes fadeIn {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  @-webkit-keyframes fadeOut {
    from {opacity: 1;}
    to {opacity: 0;}
  }
  @keyframes fadeOut {
    from {opacity: 1;}
    to {opacity: 0;}
  }
  .fade-enter {
    -webkit-animation: fadeIn .5s;
    animation: fadeIn .5s;
  }
  .fade-leave {
    -webkit-animation: fadeOut .5s;
    animation: fadeOut .5s;
  }
  @-webkit-keyframes fadeInUp {
    from {
      opacity: 0;
      -webkit-transform: translate(0, 100%);
      transform: translate(0, 100%);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes fadeInUp {
    from {
      opacity: 0;
      -webkit-transform: translate(0, 100%);
      transform: translate(0, 100%);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  @-webkit-keyframes fadeOutDown {
    from {opacity: 1;}
    to {
      opacity: 0;
      -webkit-transform: translate(0, 100%);
      transform: translate(0, 100%);
    }
  }
  @keyframes fadeOutDown {
    from {opacity: 1;}
    to {
      opacity: 0;
      -webkit-transform: translate(0, 100%);
      transform: translate(0, 100%);
    }
  }
  .fadeupdown-enter {
    -webkit-animation: fadeInUp .3s;
    animation: fadeInUp .3s;
  }
  .fadeupdown-leave {
    -webkit-animation: fadeOutDown .3s;
    animation: fadeOutDown .3s;
  }
  /* trannsition animation end */
</style>