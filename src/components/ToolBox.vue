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
  right: 1em;
  bottom: 1em;
  font-size: 12px;
}

.fa {
  width: 1.5em;
  border-radius: 3px;
  text-align: center;
  line-height: 1.4em;
  color: #fff;
  background-color: rgba(73, 169, 238, .8);
  cursor: pointer;
  transition: opacity .3s;
}
</style>
