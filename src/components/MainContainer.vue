<template>
  <section class="main-container">
    <transition name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
      <keep-alive :include="keepAliveComps">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import { keepAliveComps } from '@/app/js/config'

export default {
  data () {
    return {
      keepAliveComps: keepAliveComps.join(',')
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

