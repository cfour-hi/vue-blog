<template>
  <div class="app-wrapper">
    <header class="app-header dashed dashed-bottom">
      <h1><router-link to="/">Monine</router-link></h1>
      <nav>
        <router-link to="/" exact>名&nbsp;片</router-link>
        <router-link to="/article">文&nbsp;章</router-link>
        <router-link to="/worklog">工作日志</router-link>
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
  if (!window.lib.inMobile) {
    document.addEventListener('scroll', () => {
      let leave = 'fadeUpDown-leave-active'
      let enter = 'fadeUpDown-enter-active'

      if (document.scrollingElement.scrollTop <= 0) {
        toggleElementState(tool4Top, leave, enter, 'none', 200)
      } else {
        if (tool4Top.className.indexOf(enter) !== -1) return
        toggleElementState(tool4Top, enter, leave, 'block', 200)
      }
    })
  }

  export default {
    mounted () {
      this.$nextTick(() => {
        tool4Top = document.querySelector('.app-tools__top')
        if (!window.lib.inMobile) { tool4Top.style.right = ((window.innerWidth - 900) / 2 - 50) + 'px' }
      })
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
  @import './assets/css/base.css';
  @import './assets/css/app.css';
  @import './assets/css/article.css';
  @import './assets/css/highlight.css';
  @import './assets/css/load-awesome.css';
  @import './assets/css/animation.css';
</style>
