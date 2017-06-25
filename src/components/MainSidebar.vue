<template>
  <aside class="main-sidebar">
    <img v-if="inMobile" src="https://avatars3.githubusercontent.com/u/8335856?v=3&s=240" alt="avatar" class="avatar">
    <p v-if="inMobile" class="be-better">Be better</p>
    <div class="slide-bar" :style="{ height: sidebarLineHeight, transform: 'translateY(' + sliderBarTranslate + ')' }"></div>
    <nav class="main-nav">
      <router-link v-for="(nav, index) in navs" :key="nav.label" :to="nav.route" :exact="nav.exact" :style="{ 'line-height': sidebarLineHeight }" class="nav-item" @click.native="toggleSidebar">
        <i class="fa fa-fw" :class="nav.iconClass"></i>
        {{ nav.label }}
      </router-link>
    </nav>
    <footer v-if="inMobile" class="footer">
      <i class="fa fa-copyright" aria-hidden="true"></i>
      2016 - {{ year }}
    </footer>
  </aside>
</template>

<script>
import { ROUTE_SPLIT_REG } from '@/shared/constants'
import { navRoutes, sidebar } from '@/app/js/config'

export default {
  name: 'main-sidebar',
  data () {
    return {
      inMobile: this.$store.state.inMobile,
      navs: generateNavList(),
      sidebarLineHeight: sidebar.lineHeight + 'em',
      year: (new Date()).getFullYear()
    }
  },
  computed: {
    sliderBarTranslate () {
      return this.navs.findIndex(nav => nav.route === this.$route.path.match(ROUTE_SPLIT_REG)[0]) * sidebar.lineHeight + 'em'
    }
  },
  methods: {
    toggleSidebar () {
      this.$emit('toggleSidebar')
    }
  }
}

function generateNavList () {
  const navList = []
  for (const key in navRoutes) {
    navList.push(navRoutes[key])
  }
  return navList
}
</script>

<style scoped>
.main-sidebar {
  position: fixed;
  width: 10em;
}

.in-mobile .main-sidebar {
  top: 0;
  bottom: 0;
  background-color: #404040;
}

.avatar {
  width: 5em;
  height: 5em;
  border-bottom: 3px solid #5a5a5a;
  margin: 2em 2.5em 0;
  border-radius: 50%;
}

.be-better {
  text-align: center;
  color: #919191;
  background-color: #5a5a5a;
}

.slide-bar {
  position: absolute;
  width: 100%;
  background-color: rgba(255, 255, 255, .8);
  transition: transform .3s;
}

.main-nav {
 position: relative;
}

.nav-item {
  display: block;
  text-decoration: none;
  color: #5a5a5a;
}

.in-mobile .nav-item {
  color: #e9e9e9;
}

.nav-item:hover,
.nav-item.router-link-active {
  color: #108ee9;
}

.nav-item .fa {
  margin-left: 1em;
  margin-right: .5em;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: 12px;
  line-height: 2;
  text-align: center;
  color: #5a5a5a;
}
</style>
