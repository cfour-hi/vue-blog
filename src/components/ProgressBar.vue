<template>
  <div v-show="visible" class="progress-bar">
    <div class="progress-loader" :style="{ width: width + '%' }"></div>
  </div>
</template>

<script>
export default {
  name: 'progress-bar',
  data () {
    return {
      width: 0
    }
  },
  computed: {
    progress () {
      return this.$store.state.progress
    },
    visible () {
      return this.width
    }
  },
  watch: {
    progress (to, from) {
      if (!to) return

      this.width += 0.1

      setTimeout(() => {
        this.width = to - 0.1

        if (this.width === 99.9) {
          setTimeout(() => {
            this.width = 0
            this.$store.commit('modifyProgress', { progress: 0 })
          }, 300)
        }
      })
    }
  }
}
</script>

<style scoped>
.progress-bar {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
}

.progress-loader {
  height: 100%;
  transition: width .3s;
  background-color: #00a854;
  background-image: linear-gradient(to bottom right, #7265e6, #108ee9, #00a854);
}
</style>
