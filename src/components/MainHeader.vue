<template>
  <header class="main-header">
    <i v-if="inMobile" :class="{ active: mainSidebarActive }" class="fa fa-bars" aria-hidden="true" @click="toggleSidebar"></i>
    <section class="header-container">
      <h1 class="bloger-name">MONINE</h1>
    </section>
  </header>
</template>

<script>
export default {
  name: 'main-header',
  props: {
    mainSidebarActive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      inMobile: this.$store.state.inMobile
    }
  },
  methods: {
    toggleSidebar () {
      this.$emit('toggleSidebar')
    }
  }
}
</script>

<style scoped>
.main-header {
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  left: 0;
  height: 4.5em;
  border-bottom: 1px solid #f5f5f5;
  background-color: rgba(255, 255, 255, .8);
}

.fa-bars {
  position: absolute;
  padding: 0 .6em;
  font-size: 1.5em;
  line-height: 3;
  color: #bfbfbf;
  transform: rotate(0);
  transition: transform .3s;
}

.fa-bars.active {
  transform: rotate(90deg)
}

.header-container {
  width: 60em;
  margin: 0 auto;
}

.in-mobile .header-container {
  width: 100%;
  text-align: center;
}

.bloger-name {
  margin: 0;
  line-height: 2.25;
  font-family: 'Agnes-Boldacb25b88f177d1';
}
</style>

