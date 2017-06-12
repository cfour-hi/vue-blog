<template>
  <aside class="main-sidebar">
    <div class="slide-bar" :style="{ transform: 'translateY(' + sliderBarTranslate + ')' }"></div>
    <nav class="main-nav">
      <router-link v-for="(nav, index) in navs" class="nav-item" :key="nav.label" :to="nav.route" :exact="nav.exact" @click.native="sliderBarIndex = index">
        <i class="fa fa-fw" :class="nav.iconClass"></i>
        {{ nav.label }}
      </router-link>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'main-sidebar',
  data () {
    return {
      sliderBarIndex: 0,
      navs: [
        {
          label: 'ARTICLE',
          route: '/article',
          iconClass: 'fa-chrome'
        },
        {
          label: 'WORKLOG',
          route: '/worklog',
          iconClass: 'fa-internet-explorer'
        },
        {
          label: 'ABOUT',
          route: '/about',
          iconClass: 'fa-firefox',
          exact: true
        }
      ]
    }
  },
  computed: {
    sliderBarTranslate () {
      return this.sliderBarIndex * 2.5 + 'em'
    }
  },
  created () {
    const rootPath = this.$route.path.match(/\/\w*/g)[0]
    this.sliderBarIndex = this.navs.findIndex(nav => nav.route === rootPath)
  }
}
</script>

<style scoped>
.main-sidebar {
  position: fixed;
  width: 10em;
}

.slide-bar {
  position: absolute;
  width: 100%;
  height: 2.5em;
  background-color: rgba(255, 255, 255, .8);
  transition: transform .3s;
}

.main-nav {
 position: relative;
}

.nav-item {
  display: block;
  line-height: 2.5em;
  text-decoration: none;
  color: #5a5a5a;
}

.nav-item:hover,
.nav-item.router-link-active {
  color: #108ee9;
}

.nav-item .fa {
  margin-left: 1em;
  margin-right: .5em;
}
</style>
