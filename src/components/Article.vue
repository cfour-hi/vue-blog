<template>
  <section class="article-page">
    <router-view @set-loader-state="setLoaderState"></router-view>
  </section>
</template>

<script>
  export default {
    methods: {
      setLoaderState (state) {
        this.$emit('set-loader-state', state)
      }
    }
  }
</script>
