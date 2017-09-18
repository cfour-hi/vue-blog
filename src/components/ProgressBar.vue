<template>
  <div v-show="!!width" class="comp__progress-bar">
    <div class="progress-loader" :style="{ width: width + '%', background } "></div>
  </div>
</template>

<script>
const progress = {
  wait: 0,
  loading: 70,
  success: 100,
  error: 100
}

export default {
  name: 'progress-bar',
  props: {
    progress: { required: true, type: String },
    duration: { type: Number, default: 300 },
    defaultBG: { type: String, default: '#108ee9' },
    errorBG: { type: String, default: '#f04134' }
  },
  data () {
    return { width: 0 }
  },
  computed: {
    background () {
      return this.progress === 'error' ? this.errorBG : this.defaultBG
    }
  },
  watch: {
    progress (to, from) {
      if (!progress[to]) return

      this.width += 0.1
      setTimeout(() => {
        this.width = progress[to] - 0.1

        if (this.width === 99.9) {
          setTimeout(() => {
            this.width = progress['wait']
            this.$emit('overProcess')
          }, this.duration)
        }
      }, 16.7)
    }
  }
}
</script>

<style scoped>
.comp__progress-bar {
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
  /*background-color: #00a854;*/
  /*background-image: linear-gradient(to bottom right, #7265e6, #108ee9, #00a854);*/
}
</style>
