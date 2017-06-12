<template>
  <header class="main-header">
    <section class="header-container">
      <h1 class="bloger-name">MONINE</h1>
    </section>
  </header>
</template>

<script>
export default {
  name: 'main-header'
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
  margin-left: calc(100vw - 100%);
  background-color: rgba(255, 255, 255, .8);
}

.header-container {
  width: 60em;
  margin: 0 auto;
}

.bloger-name {
  margin: 0;
  line-height: 2.25;
  font-family: 'Agnes-Boldacb25b88f177d1';
}
</style>

