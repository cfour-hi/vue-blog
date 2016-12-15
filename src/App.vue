<template>
  <div class="app-wrapper">
    <header class="app-header dashed dashed-bottom">
      <h1><a v-link="{path: '/'}">Monine</a></h1>
      <nav>
        <a v-link="{path: '/', exact: true}">名&nbsp;片</a>
        <a v-link="{path: '/article'}">文&nbsp;章</a>
        <a v-link="{path: '/worklog'}">工作日志</a>
      </nav>
    </header>
    <section class="app-container">
      <router-view 
        :loader="loader"
        @set-loader-state="setLoaderState">
      </router-view>
      <div class="la-ball-clip-rotate" v-show="loader"><div></div></div>
    </section>
    <footer class="app-footer dashed dashed-top">
      <p>© 2016 Monine</p>
    </footer>
    <div class="app-tool">
      <div class="app-tools__top" @click="scroll2TopLinear">
        <svg viewBox="0 0 64 64">
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
  let scroll2TopLinear = () => {
    if (document.scrollingElement.scrollTop <= 0) return

    document.scrollingElement.scrollTop -= scrollDistance
    window.requestAnimationFrame(scroll2TopLinear)
  }

  // 切换元素 className 和 显示/隐藏
  let toggleElementState = (elem, addClass, removeClass, display, delay) => {
    elem.classList.remove(removeClass)
    elem.classList.add(addClass)

    setTimeout(() => { elem.style.display = display }, delay)
  }

  // 滚动事件
  document.addEventListener('scroll', () => {
    let leave = 'fadeUpDown-leave'
    let enter = 'fadeUpDown-enter'

    if (document.scrollingElement.scrollTop <= 0) {
      toggleElementState(tool4Top, leave, enter, 'none', 200)
    } else {
      if (tool4Top.className.indexOf(enter) !== -1) return
      toggleElementState(tool4Top, enter, leave, 'block', 200)
    }
  })

  export default {
    ready () {
      tool4Top = document.querySelector('.app-tools__top')
      if (!window.lib.inMobile) { tool4Top.style.right = ((document.documentElement.offsetWidth - 900) / 2 - 36) + 'px' }
    },
    data () {
      return {
        loader: true
      }
    },
    methods: {
      setLoaderState (state) {
        this.loader = state
      },
      scroll2TopLinear () {
        // 为什么是 18？
        // 因为我希望滑动到顶部的时长为 300ms
        // 显示屏的刷新速率为 60FPS (每秒刷新 60 次)
        // (1000 / 60 = 16.666666666666668) => 即每 16.7ms 刷新一次 => 16.7ms/帧
        // 所以：300 / 16.7 = 17.964071856287426 => 即滚动到顶部需要 18 帧
        // scrollDistance => 每帧滚动的距离
        scrollDistance = document.scrollingElement.scrollTop / 18
        window.requestAnimationFrame(scroll2TopLinear)
      }
    }
  }
</script>

<style>
  /* base start */
  html {
    height: 100%;
    box-sizing: border-box;
    overflow-x: hidden;

  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    position: relative;
    height: 100%;
    margin-left: calc(100vw - 100%);
    font: 16px/2 "PingFang SC", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial,sans-serif;
    word-wrap: break-word;
    /*word-break: break-all;*/
    color: #333;
    background-color: #cce4f6;
  }
  h1 {
    display: inline-block;
    padding: 0 1em;
    font-size: 36px;
  }
  .js-inmobile[data-dpr="2"] h1 {
    font-size: 72px;
  }
  .js-inmobile[data-dpr="3"] h1 {
    font-size: 108px;
  }
  a {
    color: #333;
    text-decoration: none;
  }
  /*.link {
    color: #0097da;
  }
  .link:hover {
    color: #33ace1;
  }
  .link:active {
    color: #008fcf;
  }*/
  button {
    outline: none;
  }
  em {
    padding: 0.3em;
    border-bottom: 1px dotted #ccc;
    font-size: 14px;
    color: #999;
  }
  article {
    position: relative;
    padding: 2em;
  }
  .js-inmobile article {
    font-size: 16px;
  }
  .js-inmobile[data-dpr='2'] article {
    font-size: 32px;
  }
  @media (max-device-width: 374px) {
    .js-inmobile[data-dpr='2'] article {
      font-size: 28px;
    }
    .js-inmobile[data-dpr='3'] article {
      font-size: 48px;
    }
  }
  article h3 {
    position: relative;
    padding-top: 1em;
    font-size: 24px;
    text-indent: 0.5em;
    color: #0097da;
  }
  article h3::before {
    content: '';
    position: absolute;
    bottom: -0.2em; left: 0;
    width: 100%; height: 5px;
    border-radius: 5px;
    background-color: #cce4f6;
  }
  .js-inmobile[data-dpr='2'] article h3 {
    font-size: 40px;
  }
  @media (max-device-width: 374px) {
    .js-inmobile[data-dpr='2'] article h3 {
      font-size: 36px;
    }
  }
  .js-inmobile[data-dpr='3'] article h3 {
    font-size: 60px;
  }
  article h4 {
    margin-bottom: 0;
    font-size: 22px;
  }
  .js-inmobile[data-dpr='2'] article h4 {
    font-size: 36px;
  }
  .js-inmobile[data-dpr='3'] article h4 {
    font-size: 54px;
  }
  article a {
    border-bottom: 1px solid #333;
  }
  article a:hover {
    color: #1d80d3;
    border-bottom-color: #1d80d3;
  }
  article img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
  }
  article blockquote {
    position: relative;
    padding: 0 1.5em;
    margin: 2em 0;
    font-size: 14px;
    color: #666;
  }
  article blockquote::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 0.4em; height: 100%;
    border-radius: 0.4em;
    background-color: #ff8a0c;
  }
  .js-inmobile article blockquote {
    font-size: 14px;
  }
  .js-inmobile[data-dpr='2'] article blockquote {
    font-size: 28px;
  }
  @media (max-device-width: 374px) {
    .js-inmobile[data-dpr='2'] article blockquote {
      font-size: 24px;
    }
  }
  .js-inmobile[data-dpr='3'] article blockquote {
    font-size: 42px;
  }
  article strong {
    padding: 0.2em;
    border-top: 1px solid #999;
    border-bottom: 1px solid #999;
  }
  article hr {
    border: 1px solid #eee;
  }
  article pre {
    padding: 16px;
    border: 1px dotted #999;
    overflow: auto;
    font-size: 12px;
    border-radius: 0.5em;
    word-wrap: break-word;
  }
  .js-inmobile article pre {
    font-size: 12px;
  }
  .js-inmobile[data-dpr='2'] article pre {
    font-size: 24px;
  }
  .js-inmobile[data-dpr='3'] article pre {
    font-size: 36px;
  }
  article code {
    padding: 0.3em 0.5em;
    border-radius: 0.3em;
    font: 12px Consolas, "Liberation Mono", Menlo, Courier, monospace;
    color: #666;
    background-color: #f0f0f0;
  }
  .js-inmobile[data-dpr='2'] article code {
    font-size: 24px;
  }
  .js-inmobile[data-dpr='3'] article code {
    font-size: 36px;
  }
  article pre code {
    padding: 0;
    border: none;
    background: transparent;
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
  /*.issues-content {
    padding: 0.25rem 0;
  }*/
  .js-inmobile .issues-content {
    padding: 0.75rem 0;
  }
  .issues-content li p,
  .issues-content blockquote p {
    margin-left: 0; margin-right: 0;
  }
  .issues-content__title {
    position: relative;
    margin: 0;
    text-align: center;
    font-size: 26px;
  }
  .js-inmobile[data-dpr='2'] .issues-content__title {
    font-size: 44px;
  }
  .js-inmobile[data-dpr='3'] .issues-content__title {
    font-size: 66px;
  }
  .issues-content__title a {
    display: inline-block;
    padding-bottom: 0.5em;
    border-bottom: none;
    color: #333;
  }
  .issues-content__title a:hover {
    border-bottom: none;
    color: #333;
    background: url(assets/icon-go.png) no-repeat center 1.5em;
    background-size: 32px;
  }
  .js-inmobile .issues-content__title a:hover {
    background: none;
  }
  .issues-content__time {
    margin-top: 0; margin-bottom: 3em;
    font-size: 12px;
    text-align: center;
    color: #999;
  }
  .js-inmobile[data-dpr='2'] .issues-content__time {
    font-size: 24px;
  }
  .js-inmobile[data-dpr='3'] .issues-content__time {
    font-size: 36px;
  }
  /* base end */

  /* tool start */
  .position-vertical-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .transition-color-btn {
    padding: 0.3em 1em;
    border-radius: 3px;
    font-size: 14px;
    transition-property: color, background-color;
    transition-duration: 0.3s;
  }
  .js-inmobile[data-dpr='2'] .transition-color-btn {
    font-size: 24px;
  }
  .js-inmobile[data-dpr='3'] .transition-color-btn {
    font-size: 36px;
  }
  .center-prompt-message {
    text-align: center;
    color: #999;
  }
  /* tool end */

  /* app start */
  .app-wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 900px;
    min-height: 100%;
    margin: 0 auto;
  }
  .js-inmobile .app-wrapper {
    width: 100%;
  }
  .app-header {
    flex: 0 0 auto;
    position: relative;
    border-radius: 0 0 2em 2em;
    background-color: #fcfcfc;
  }
  .js-inmobile .app-wrapper h1 {
    margin: 0.3rem 0;
    text-align: center;
  }
  .app-header nav {
    display: inline-block;
    font-size: 14px;
    vertical-align: text-bottom;
  }
  .js-inmobile .app-header nav {
    display: flex;
  }
  .js-inmobile[data-dpr="2"] .app-header nav {
    font-size: 28px;
  }
  .js-inmobile[data-dpr="3"] .app-header nav {
    font-size: 42px;
  }
  .app-header nav a {
    position: relative;
    display: table-cell;
    width: 6em;
    text-align: center;
  }
  .js-inmobile .app-header nav a {
    width: 33.33%;
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
    transform: scaleX(0);
    transition: transform .3s ease;
  }
  .app-header nav a:hover:before,
  .app-header nav .v-link-active:before {
    transform: scaleX(1);
  }
  .app-container {
    flex: 1 0 auto;
    position: relative;
    border-radius: 2em;
    background-color: #fcfcfc;
  }
  .js-inmobile .app-container {
    padding: 0 0.25rem;
  }
  .app-footer {
    flex: 0 0 auto;
    position: relative;
    border-radius: 2em 2em 0 0;
    text-align: center;
    font-size: 14px;
    color: #999;
    background-color: #fcfcfc;
  }
  .js-inmobile .app-footer {
    font-size: 1em;
  }
  .app-tools__top {
    display: none;
    position: fixed;
    bottom: 36px;
    color: #fcfcfc;
    cursor: pointer;
  }
  .js-inmobile .app-tools__top {
    right: 0.5rem;
  }
  .app-tools__top:hover {
    color: #f7f7f7;
  }
  .app-tools__top:active {
    color: #f0f0f0;
  }
  .app-tools__top svg {
    fill: currentColor;
    width: 36px; height: 36px;
  }
  .js-inmobile .app-tools__top svg {
    width: 0.7rem; height: 0.7rem;
  }
  .dashed::before {
    content: '';
    position: absolute;
    left: 24px; right: 24px;
    border-bottom: 2px dashed #cce4f6;
    z-index: 1;
  }
  .dashed-top::before {
    top: -1px;
  }
  .dashed-bottom::before {
    bottom: -1px;
  }
  .dashed-thin::before {
    border-bottom-width: 1px;
  }
  article .article-labels {
    position: absolute;
    top: 0; left: 2em; right: 2em;
    z-index: 2;
    font-size: 14px;
    text-indent: 3px;
    letter-spacing: 3px;
  }
  article .article-label {
    display: inline-block;
    padding: 0 10px;
    margin-right: 0.5em;
    border-radius: 0 0 0.5em 0.5em;
    color: #fff;
    background-color: #ccc;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.3);
  }
  article .article-label:hover {
    color: #fff;
  }
  article .label-00a0e9 {
    background-color: #00a0e9;
  }
  article .label-00a0e9:hover {
    background-color: #33b3ed;
  }
  article .label-00a0e9:active {
    background-color: #0098dd;
  }
  article .label-60be29 {
    background-color: #60be29;
  }
  article .label-60be29:hover {
    background-color: #80cb54;
  }
  article .label-60be29:active {
    background-color: #5bb527;
  }
  /* app end */

  /*!
   * Load Awesome v1.1.0 (http://github.danielcardoso.net/load-awesome/)
   * Copyright 2015 Daniel Cardoso <@DanielCardoso>
   * Licensed under MIT
   */
  .la-ball-clip-rotate {
    position: absolute;
    top: 1rem; left: 50%;
    color: #0097da;
    z-index: 99;
  }
  .la-ball-clip-rotate.la-dark {
    color: #333;
  }
  .la-ball-clip-rotate > div {
    position: relative;
    display: inline-block;
    width: 24px; height: 24px;
    border: 2px solid currentColor;
    margin-left: -12px;
    border-bottom-color: transparent;
    border-radius: 100%;
    background: transparent;
    animation: ball-clip-rotate .75s linear infinite;
  }
  .js-inmobile[data-dpr='2'] .la-ball-clip-rotate > div {
    width: 48px; height: 48px;
    margin-left: -24px;
    border-width: 4px;
  }
  .js-inmobile[data-dpr='3'] .la-ball-clip-rotate > div {
    width: 72px; height: 72px;
    margin-left: -36px;
    border-width: 6px;
  }
  @keyframes ball-clip-rotate {
    0% {transform: rotate(0deg);}
    50% {transform: rotate(180deg);}
    100% {transform: rotate(360deg);}
  }
  /* Load Awesome end */

  /* transition animation start */
  @keyframes fadeIn {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  @keyframes fadeOut {
    from {opacity: 1;}
    to {opacity: 0;}
  }
  .fadeInOut-enter {
    animation: fadeIn .5s;
  }
  .fadeInOut-leave {
    animation: fadeOut .5s;
  }
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate(0, 100%);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
  @keyframes fadeOutDown {
    from {opacity: 1;}
    to {
      opacity: 0;
      transform: translate(0, 150%);
    }
  }
  .fadeUpDown-enter {
    animation: fadeInUp .3s;
  }
  .fadeUpDown-leave {
    animation: fadeOutDown .3s;
  }
  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: scale3d(.3, .3, .3);
    }
    50% {opacity: 1;}
  }
  @keyframes zoomOut {
    from {opacity: 1;}
    50% {
      opacity: 0;
      transform: scale3d(.3, .3, .3);
    }
    to {opacity: 0;}
  }
  .zoomInOut-enter {
    animation: zoomIn 0.3s;
  }
  .zoomInOut-leave {
    animation: zoomOut 0.3s;
  }
  /* transition animation end */
</style>
