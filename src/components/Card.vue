<template>
  <transition name="fadeUpDown">
    <section class="user-info__card" v-show="$route.path === '/'">
      <img src="https://avatars3.githubusercontent.com/u/8335856?v=3&s=240" alt="头像">
      <div class="user-info__site">
        <a href="https://github.com/Monine/">
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
        </a>
      </div>
      <p class="user-info__desc">Front-End Developer</p>
      <ul class="user-info__list">
        <li class="user-info__item user-info__company">
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M16 12.999c0 .439-.45 1-1 1H7.995c-.539 0-.994-.447-.995-.999H1c-.54 0-1-.561-1-1 0-2.634 3-4 3-4s.229-.409 0-1c-.841-.621-1.058-.59-1-3 .058-2.419 1.367-3 2.5-3s2.442.58 2.5 3c.058 2.41-.159 2.379-1 3-.229.59 0 1 0 1s1.549.711 2.42 2.088C9.196 9.369 10 8.999 10 8.999s.229-.409 0-1c-.841-.62-1.058-.59-1-3 .058-2.419 1.367-3 2.5-3s2.437.581 2.495 3c.059 2.41-.158 2.38-1 3-.229.59 0 1 0 1s3.005 1.366 3.005 4"></path>
          </svg>
          <p>北京智云时代科技有限公司</p>
        </li>
        <li class="user-info__item uer-info__address">
          <svg width="12" height="16" viewBox="0 0 12 16">
            <path d="M6 0C2.69 0 0 2.5 0 5.5 0 10.02 6 16 6 16s6-5.98 6-10.5C12 2.5 9.31 0 6 0zm0 14.55C4.14 12.52 1 8.44 1 5.5 1 3.02 3.25 1 6 1c1.34 0 2.61.48 3.56 1.36.92.86 1.44 1.97 1.44 3.14 0 2.94-3.14 7.02-5 9.05zM8 5.5c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path>
          </svg>
          <p>湖南长沙</p>
        </li>
        <li class="user-info__item uer-info__email">
          <svg width="14" height="16" viewBox="0 0 14 16">
            <path d="M0 4v8c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H1c-.55 0-1 .45-1 1zm13 0L7 9 1 4h12zM1 5.5l4 3-4 3v-6zM2 12l3.5-3L7 10.5 8.5 9l3.5 3H2zm11-.5l-4-3 4-3v6z"></path>
          </svg>
          <a class="link" href="mailto:bob.zhouxiang@gmail.com">bob.zhouxiang@gmail.com</a>
        </li>
      </ul>
    </section>
  </transition>
</template>

<script>
  export default {
    mounted () {
      this.$nextTick(() => {
        this.$emit('set-loader-state', false)

        let card = document.querySelector('.user-info__card')
        card.style.top = ((document.querySelector('.app-container').offsetHeight - card.offsetHeight) / 2.1) + 'px'
      })
    }
  }
</script>

<style scoped>
  .user-info__card {
    position: absolute;
    left: 200px;
    width: 500px; height: 300px;
    padding: 20px;
    border-top: 1px solid #ddd;
    border-radius: 1em;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
  }
  .js-inmobile .user-info__card {
    left: 5%;
    width: 90%; height: 5.2rem;
    padding: 0.3rem;
  }
  .user-info__card img {
    float: left;
    width: 120px; height: 120px;
    border-radius: 50%;
    clip-path: inset(0.12rem);
  }
  .js-inmobile .user-info__card img {
    width: 2rem; height: 2rem;
  }
  .user-info__site {
    position: relative;
    height: 60px;
    text-align: center;
  }
  .js-inmobile .user-info__site {
    height: 1.01rem;
  }
  .user-info__site a:hover {
    color: #5c5c5c;
  }
  .user-info__site a:active {
    color: #303030;
  }
  .user-info__site svg {
    position: absolute;
    top: 50%;
    width: 32px; height: 32px;
    margin-top: -10px;
    fill: currentColor;
  }
  .js-inmobile .user-info__site svg {
    width: 0.75rem; height: 0.75rem;
    margin-top: -0.3rem;
  }
  .user-info__desc {
    height: 60px;
    margin: 0;
    font-size: 20px;
    text-align: center;
    color: #999;
  }
  .js-inmobile .user-info__desc {
    height: 1rem;
    font-size: 16px;
  }
  .js-inmobile[data-dpr='2'] .user-info__desc {
    font-size: 32px;
  }
  .js-inmobile[data-dpr='3'] .user-info__desc {
    font-size: 48px;
  }
  .user-info__list {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0 10px;
    height: 150px;
    padding: 0.5em 0;
  }
  .js-inmobile .user-info__list {
    height: 2.6rem;
    font-size: 14px;
  }
  .js-inmobile[data-dpr='2'] .user-info__list {
    font-size: 28px;
  }
  @media (max-device-width: 374px) {
    .js-inmobile[data-dpr='2'] .user-info__list {
      font-size: 24px;
    }
  }
  .js-inmobile[data-dpr='3'] .user-info__list {
    font-size: 42px;
  }
  .user-info__item {
    list-style: none;
  }
  .user-info__item svg {
    width: 1.2em; height: 1.2em;
    margin-right: 0.3em;
    margin-bottom: -0.25em;
    fill: #999;
  }
  .js-inmobile .user-info__item svg {
    width: 0.4rem; height: 0.4rem;
  }
  .user-info__item p {
    display: inline-block;
    margin: 0;
  }
</style>
