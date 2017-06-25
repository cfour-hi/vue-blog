<template>
  <section class="main-container">
    <router-view v-if="inMobile"></router-view>
    <transition v-else name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  data () {
    return {
      inMobile: this.$store.state.inMobile
    }
  }
}
</script>

<style scoped>
.main-container {
  padding-left: 11em;
}

.in-mobile .main-container {
  padding-top: 5.5em;
  padding-left: 0;
}
</style>

