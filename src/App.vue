<template>
  <div id="app" :class="{ 'sidebar-active': mainSidebarActive }">
    <main-sidebar v-if="inMobile" @toggleSidebar="toggleSidebar"></main-sidebar>
    <main-header v-else></main-header>
    <main class="main">
      <main-header v-if="inMobile" :mainSidebarActive="mainSidebarActive" @toggleSidebar="toggleSidebar"></main-header>
      <main-sidebar v-else></main-sidebar>
      <router-view></router-view>
      <div v-show="inMobile && mainSidebarActive" class="main-mask" @click="closeSidebar"></div>
    </main>
    <progress-bar :progress="progress" @overProcess="overProcess" defaultBG="linear-gradient(to bottom right, #7265e6, #108ee9, #00a854)"></progress-bar>
    <tool-box v-if="!inMobile"></tool-box>
  </div>
</template>

<script>
import MainHeader from './components/MainHeader'
import MainSidebar from './components/MainSidebar'
import ProgressBar from './components/ProgressBar'
import ToolBox from './components/ToolBox'

export default {
  components: {
    MainHeader,
    MainSidebar,
    ProgressBar,
    ToolBox
  },
  data () {
    return {
      inMobile: this.$store.state.inMobile,
      mainSidebarActive: false
    }
  },
  computed: {
    progress () {
      return this.$store.state.progress
    }
  },
  methods: {
    overProcess () {
      this.$store.commit('setProgress', { step: 'wait' })
    },
    toggleSidebar () {
      this.mainSidebarActive = !this.mainSidebarActive
    },
    closeSidebar () {
      this.mainSidebarActive = false
    }
  }
}
</script>

<style scoped>
.main {
  width: 60em;
  margin: 5.5em auto 1em;
}

.in-mobile .main {
  width: 100%;
  margin: 0;
}

.main-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 10em;
}
</style>

<style>
@import './app/css/base.css';
@import './app/css/app.css';
</style>
