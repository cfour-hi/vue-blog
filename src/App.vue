<template>
  <div class="app-wrapper">
    <header class="app-header">
      <h1><a v-link="{ path: '/' }">Monine</a></h1>
      <nav>
        <a v-link="{ path: '/', exact: true }">名&nbsp;片</a>
        <a v-link="{ path: '/article' }">文&nbsp;章</a>
        <a v-link="{ path: '/worklog' }">工作日志</a>
      </nav>
    </header>
    <div class="app-container">
      <router-view :loading="loading" :next-page="nextPage" :has-more-article="hasMoreArticle" :issues-num="$route.params.num" @update-loading="updateLoading" @update-next-page="updateNextPage" @update-has-more-article="updateHasMoreArticle"></router-view>
      <div class="la-ball-clip-rotate" v-show="loading"><div></div></div>
    </div>
    <footer class="app-footer">
      <p>© 2016 Monine</p>
    </footer>
    <div class="app-tool">
      <div class="app-tool__top" @click="scroll2TopEase">
        <svg width="32" height="32" viewBox="0 0 64 64">
          <path d="M30.968 1.52h1.907c-.081.913.044 1.028.477 1.371 4.91 3.898 8.474 9.285 10.19 15.97-7.667-.04-15.494.08-23.061-.06 1.644-5.944 4.591-10.962 8.7-14.659.502-.452 1.659-1.163 1.787-1.609.09-.31-.075-.924 0-1.013zM20.063 20.65H44.02c.55 2.751 1.08 5.755.953 8.76-.125 2.974-.705 5.87-1.251 8.402-1.156 5.359-2.56 10.473-3.993 15.315H24.473c-1.625-4.657-2.933-9.858-4.112-15.196-1.111-5.036-1.91-11.697-.357-17.102-.005-.085-.01-.169.06-.18zm7.33 7.27c-1.051 3.335 1.264 6.46 4.648 6.436 1.39-.01 2.86-.749 3.635-1.61 2.833-3.144.43-8.649-4.112-8.163-2.285.244-3.642 1.66-4.171 3.337zM9.039 39.479v-1.847c.517-5.005 3.734-7.628 7.866-8.82.665 7.6 2.22 14.307 4.35 20.44-1.62 2.279-3.425 4.673-3.277 8.522-5.04-4.037-8.371-9.784-8.939-18.295zm38.198-10.666c3.005.922 5.283 2.411 6.614 4.827 1.401 2.542 1.361 6.217.715 9.772-.572 3.15-1.705 5.862-3.158 8.284-1.448 2.413-3.179 4.617-5.304 6.018.105-2.836-.92-5.046-2.204-6.972-.34-.51-1.037-1.145-1.073-1.49-.051-.495.558-1.623.775-2.324 1.698-5.49 3.005-11.457 3.575-17.996-.025-.115.04-.215.06-.12zm-20.678 26.16h10.905c-.664 1.323-1.493 2.48-2.145 3.814-.65-.423-1.068-1.078-1.669-1.55-.549 1.756-1.12 3.49-1.668 5.244-.722-1.702-1.347-3.5-2.027-5.244-.496.854-.907 1.795-1.37 2.682-.742-1.583-1.372-3.276-2.026-4.946z"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
  let scrollDistance  // 每帧滚动的距离
  let tool4Top        // top 元素

  // 滑动到顶部
  let scroll2TopEase = () => {
    if (document.scrollingElement.scrollTop <= 0) return

    document.scrollingElement.scrollTop -= scrollDistance
    window.requestAnimationFrame(scroll2TopEase)
  }

  // 切换元素 className 和 显示/隐藏
  let toggleElementDisplay = (elem, addClass, removeClass, display, delay) => {
    elem.classList.remove(removeClass)
    elem.classList.add(addClass)

    setTimeout(() => {
      elem.style.display = display
    }, delay)
  }

  window.onscroll = () => {
    let leave = 'fadeupdown-leave'
    let enter = 'fadeupdown-enter'

    if (document.scrollingElement.scrollTop <= 300) {
      toggleElementDisplay(tool4Top, leave, enter, 'none', 200)
    } else {
      if (tool4Top.className.indexOf(enter) !== -1) return

      toggleElementDisplay(tool4Top, enter, leave, 'block', 200)
    }
  }

  export default {
    ready () {
      tool4Top = document.querySelector('.app-tool__top')
      tool4Top.style.right = ((document.documentElement.offsetWidth - 900) / 2) + 'px'
    },
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
      },
      scroll2TopEase () {
        // 为什么是 18？
        // 因为我希望滑动到顶部的时长为 300ms
        // 显示屏的刷新速率为 60FPS (每秒刷新 60 次)
        // (1000 / 60 = 16.666666666666668) => 即每 16.7ms 刷新一次 => 16.7ms/帧
        // 所以：300 / 16.7 = 17.964071856287426 => 即滚动到顶部需要 18 帧
        // scrollDistance => 每帧滚动的距离
        scrollDistance = document.scrollingElement.scrollTop / 18
        window.requestAnimationFrame(scroll2TopEase)
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
    font: 16px/1.7 "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial,sans-serif;
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
  article {
    font-size: 14px;
  }
  article h3 {
    padding: 0.5em 1em;
    border: 1px solid #ccc;
    border-radius: 0.7em;
    font-size: 1.3em;
    color: #666;
    background-color: #eee;
  }
  article a {
    color: #0097da;
  }
  article a:hover {
    color: #33ace1;
  }
  article a:active {
    color: #008fcf;
  }
  article blockquote {
    padding: 0 1em;
    margin-left: 1em;
    border-left: 5px solid #ccc;
    font-size: 12px;
    color: #333;
    line-height: 2;
  }
  article hr {
    border: 1px solid #eee;
  }
  article pre {
    padding: 16px;
    margin: 1em;
    border: 2px solid #ddd;
    overflow: auto;
    font-size: 12px;
    background-color: #f7f7f7;
    border-radius: 1em;
    word-wrap: break-word;
  }
  article  code {
    padding: 0.2em 0.5em;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 3px;
    font: 12px Consolas, "Liberation Mono", Menlo, Courier, monospace;
  }
  article pre code {
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
  .issues-content {
    padding: 0.3rem 0;
  }
  .issues-content p {
    margin-left: 1em;
    margin-right: 1em;
  }
  .issues-content li p,
  .issues-content blockquote p {
    margin-left: 0;
    margin-right: 0;
  }
  .issues-content__title {
    margin: 0;
    text-align: center;
    font-size: 24px;
  }
  .issues-content__title a {
    color: #333;
  }
  .issues-content__time {
    margin-bottom: 2em;
    font-size: 12px;
    text-align: center;
    color: #999;
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
    position: relative;
    width: 7rem;
    min-height: 100%;
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
    font-size: 14px;
  }
  .app-header nav a {
    position: relative;
    display: table-cell;
    width: 0.7rem;
    text-align: center;
    line-height: 2;
  }
  .app-header nav a:hover,
  .app-header nav .v-link-active {
    color: #0097da;
  }
  .app-header nav a:before {
    position: absolute;
    width: 100%;
    height: 0;
    left: 0;
    bottom: -1px;
    content: '';
    border-bottom: 3px solid #33ace1;
    -webkit-transform: scaleX(0);
            transform: scaleX(0);
    -webkit-transition: -webkit-transform .3s ease;
            transition: transform .3s ease;
  }
  .app-header nav a:hover:before,
  .app-header nav .v-link-active:before {
    -webkit-transform: scaleX(1);
            transform: scaleX(1);
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
  .app-tool__top {
    display: none;
    position: fixed;
    bottom: 0.5rem;
    color: #999;
    cursor: pointer;
  }
  .app-tool__top:hover {
    color: #f60;
  }
  .app-tool__top:active {
    color: #f26100;
  }
  .app-tool__top svg {
    fill: currentColor;
  }
  /* app end */

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
      -webkit-transform: translate(0, 150%);
      transform: translate(0, 150%);
    }
  }
  @keyframes fadeOutDown {
    from {opacity: 1;}
    to {
      opacity: 0;
      -webkit-transform: translate(0, 150%);
      transform: translate(0, 150%);
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
