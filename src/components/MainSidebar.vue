<template>
  <aside class="main-sidebar">
    <div class="slide-bar" :style="{ height: sidebarLineHeight, transform: 'translateY(' + sliderBarTranslate + ')' }"></div>
    <nav class="main-nav">
      <router-link v-for="(nav, index) in navs" :key="nav.label" :to="nav.route" :exact="nav.exact" :style="{ 'line-height': sidebarLineHeight }" class="nav-item">
        <i class="fa fa-fw" :class="nav.iconClass"></i>
        {{ nav.label }}
      </router-link>
    </nav>
  </aside>
</template>

<script>
import { ROUTE_SPLIT_REG } from '@/shared/constants'
import { navRoutes, sidebar } from '@/app/js/config'

export default {
  name: 'main-sidebar',
  data () {
    return {
      navs: generateNavList(),
      sidebarLineHeight: sidebar.lineHeight + 'em'
    }
  },
  computed: {
    sliderBarTranslate () {
      return this.navs.findIndex(nav => nav.route === this.$route.path.match(ROUTE_SPLIT_REG)[0]) * sidebar.lineHeight + 'em'
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

.nav-item:hover,
.nav-item.router-link-active {
  color: #108ee9;
}

.nav-item .fa {
  margin-left: 1em;
  margin-right: .5em;
}
</style>
