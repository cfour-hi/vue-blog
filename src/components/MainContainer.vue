<template>
  <section class="main-container">
    <transition name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<style scoped>
.main-container {
  padding-left: 11em;
}
</style>

