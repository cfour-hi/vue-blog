<template>
  <div class="comp__tool-box">
    <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
      <i v-show="back2TopVisible" class="fa fa-caret-up fa-2x" aria-hidden="true" @click="scroll2Top"></i>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'tool-box',
  computed: {
    back2TopVisible () {
      return this.$store.state.back2TopVisible
    }
  },
  methods: {
    scroll2Top () {
      document.scrollingElement.scrollTop = 0
    }
  }
}
</script>

<style scoped>
.comp__tool-box {
  position: fixed;
  right: 2em;
  bottom: 1em;
  width: 3em;
  font-size: 12px;
}

.fa {
  width: 2em;
  border-radius: 3px;
  text-align: center;
  line-height: 2em;
  color: #fff;
  background-color: #49a9ee;
  cursor: pointer;
  transition: opacity .3s;
}
</style>
